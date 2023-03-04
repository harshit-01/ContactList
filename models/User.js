import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    // id:String,
    username:{
        type:String,
        maxLength:50,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},
    { timestamps:true }
);

export default mongoose.models.User || mongoose.model("User",UserSchema);
// only create model in our db if not present there