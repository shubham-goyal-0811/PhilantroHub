import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import jwt from 'jsonwebtoken' ;
import {User} from '../models/user.model.js';

export const verifyJWT = asyncHandler(async (req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        console.log(token);
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(401,"Invalid Access token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        console.error('JWT verification error:', error);
        throw new ApiError(401,error?.message || "Invalid access token");
    }
})

// Role-Based Access Control: allow only the listed roles through.
// Must run after verifyJWT so that req.user is populated.
export const authorizeRoles = (...allowedRoles) => {
    return asyncHandler(async (req, _, next) => {
        if (!req.user) {
            throw new ApiError(401, "Unauthorized request");
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw new ApiError(
                403,
                `Access denied: this action requires one of the following roles: ${allowedRoles.join(", ")}`
            );
        }
        next();
    });
};