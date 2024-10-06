import mongoose,{Schema} from "mongoose";

const raiseSchema = new Schema ({
    ngo : {
        type : Schema.Types.ObjectId,
        ref : "Ngo",
        required : true
    },
    amount : {
        type : String,
        required : true,
    },
    cause : {
        type : String,
        required : true,
    },
    donor: [
        {
            type : Schema.Types.ObjectId,
            ref : "User",
        }
    ]
}) 

export const Ticket =  mongoose.model('ticket',raiseSchema);