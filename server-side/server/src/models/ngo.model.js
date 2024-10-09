import mongoose,{Schema} from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

const ngoSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        index : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        index : true
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    address : {
        type : String,
        required : true,
        trim : true,   
    },
    category : {
        type : String,
        required : true,
        
    },
    raise : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Ticket'
        }
    ],
    contactNo : {
        type : String,
        required : true,
        
    },
    logo:{
        type : String,
        required : false,
    },
    idProof : {
        type : String,
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    donors: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ]
})

export const Ngo = mongoose.model("Ngo",ngoSchema);