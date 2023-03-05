import dbConnect from "../../../utils/mongo"
import User from '../../../models/User'

export default async function handler(req, res) {
    const { method } = req;
    dbConnect();
    // console.log(req.query.params)
    const deleteContact = async()=>{
        try{
            let user = await User.findOne({username: req.query.params[0]});
            // console.log(user);
            user.contactList  = user.contactList.filter((val)=>{
                if(val.username !== req.query.params[1]){
                    return val;
                }
            })
            await User.findByIdAndUpdate(user._id,{$set: {contactList: user.contactList}})
            res.status(200).json({message: 'Contact deleted successfully',userList:user.contactList})
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    const editContact = async()=>{
        console.log(req.query)
        try{
            const {phoneNumber} = req.body;
            let user = await User.findOne({username: req.query.params[0]});
            // console.log(user);
            user.contactList  = user.contactList.map((val)=>{
                if(val.username === req.query.params[1]){
                    val.phoneNumber = phoneNumber;
                }
                return val;
            })
            await User.findByIdAndUpdate(user._id,{$set: {contactList: user.contactList}})
            res.status(200).json({message: 'Contact updated successfully',userList:user.contactList})
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    if(method === 'DELETE') {
        deleteContact()
        // console.log(req.body)
    }
    if(method === 'PUT') {
        editContact()
        // console.log(req.body)
    }
}