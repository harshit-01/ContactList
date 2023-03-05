import dbConnect from "../../../utils/mongo"
import User from '../../../models/User'

export default async function handler(req, res) {
    const { method } = req;
    dbConnect();
    console.log(req.query.username)
    const fetchContact = async()=>{
        try{
            const user = await User.findOne({ username: req.query.username});
            console.log(user);
            if(!user){
                res.status(404).json('User does not exist')
            }
            res.status(200).json({message:"success",userList: user?.contactList})
        }
        catch(err){
            res.status(500).json(err);
        }
    }

    if(method === 'GET') {
        fetchContact();
        // console.log(req.body)
    }
}