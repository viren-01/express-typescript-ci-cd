import jwt from 'jsonwebtoken';
require('dotenv').config();


const generateToken = (data: any) => {
    const ACCESS_TOKEN: any = process.env.ACCESS_TOKEN;
    const EXPIRE_TIME: any = process.env.EXPIRE_TIME;
    const token = jwt.sign({
        data: data
    }, ACCESS_TOKEN, { expiresIn: '10m' })
    return token;
}

const verifyToken = (token: string) => {
    try {
        const ACCESS_TOKEN: any = process.env.ACCESS_TOKEN;
        const data = jwt.verify(token, ACCESS_TOKEN);
        return data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export{
    generateToken,
    verifyToken
}