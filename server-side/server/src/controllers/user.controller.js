import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';


const generateAccessandRfreshToken = async (userId)=>{  
    try{
        const user = await User.findById(userId)
        const acessToken = user.generateAccessToken() 
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false})

        return {acessToken,refreshToken};
    }
    catch (error){
        throw new ApiError(500, "Something Went Wrong while generating acces and refresh token");
    }
}



const registerUser = asyncHandler(async (req,res) =>{
    const {fullName,email,username,password,mobileNo} = req.body;
    if(
        [fullName,email,username,password].some((field)=>{
             field?.trim() === ""
        })
        // we can use map too
    )
    {
        throw new ApiError(400,"All Fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    const pattern = /^[7-9]\d{9}$/;
    if(!pattern.test(mobileNo)){
        throw new ApiError(400,"Please enter a valid mobile number");
    }

    const existUser = await User.findOne({
        $or:[{username} , {email}, {mobileNo}]
    });
    if(existUser){
        throw new ApiError(409,"User with this email or Username or Mobile Number already exists");
    }

    const idProofLocalPath = req.files?.idProof[0].path;
    let avatarLocalPath;
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
        avatarLocalPath = req.files.avatar[0].path;
    }

    if(!idProofLocalPath){
        throw new ApiError(400,"ID Proof document is required");
    }

    console.log(idProofLocalPath);
    const idProof = await uploadOnCloudinary(idProofLocalPath);
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if(!idProof){
        throw new ApiError(500,"Something went wrong while Uploading the idProof");
    }

    const user = await User.create({
        fullName,
        idProof : idProof.url,
        avatar : avatar?.url || "",
        email,
        password,
        username : username.toLowerCase(),
        mobileNo
    })

    const userCreated = await User.findById(user._id).select(
        "-password -refreshtoken"
    )

    if(!userCreated){
        throw new ApiError(500,"Something went wrong while registring the user");
    }

    return res.status(201).json(
        new ApiResponse(201,userCreated,"user Created succesfully")
    )

})

export {
    registerUser
}