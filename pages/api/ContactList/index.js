import dbConnect from "../../../utils/mongo"
import User from '../../../models/User'

export default async function handler(req, res) {
    const { method } = req;
    dbConnect();
    console.log(req.query)
    const addContact = async()=>{
        try{
            const {name,username,workType,phoneNumber} = req.body;
            let user = await User.findOne({username: name});
            user.contactList.push({username:username,workType:workType,phoneNumber:phoneNumber})
            console.log(user)
            await user.save();
            res.status(201).json({message:"Contact added successfully"})
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    const deleteContact = async()=>{
        try{
            const {username,deleteUser} = req.body;
            let user = await User.findOne({username: username});
            console.log(username)
            user.contactList.filter((val)=>{
                if(val !== deleteUser){
                    return val;
                }
            })
            console.log(user);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    const editContact = async()=>{
        try{
            const {username,password} = req.body;
        }
        catch(err){
            res.status(500).json(err);
        }
    }

    if(method === 'POST') {
        addContact()
        // console.log(req.body)
    }
    if(method === 'DELETE') {
        deleteContact()
        // console.log(req.body)
    }
}