import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_KEY;

export default function jwtVerify(tok){
    return jwt.verify(tok, KEY, (err, userDetails) => {
        if(err){
            return false;
        } 
        else{
            return userDetails;
        }
    })
}