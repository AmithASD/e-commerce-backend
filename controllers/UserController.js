import bcrypt from 'bcrypt'
import User from '../models/User.js';
import jwt from "jsonwebtoken"

export const registerUser = async (req, res, next) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPass = await bcrypt.hash(req.body.password, salt);

    const { email } = req.body;
    const { password } = req.body;
    // const {id} = req.body;

    if (!email) {
        return res.status(400).json({ error: "password is required" });
    }

    if (!password) {
        return res.status(400).json({ erroe: " password is required" });
    }

    try {
        //generate initial access token 
        // const token = jwt.sign(
        //     { id : id, email: email},
        //     process.env.JWT_KEY,
        //     {expiresIn: '24h'}
        // );

        const userData = new User({ email, password });
        await userData.save();

        return res.status(200).json({ user: userData })
    } catch (error) {
        console.error("register failed")
        return res.status(400).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: "password is required" });
    }

    if (!password) {
        return res.status(400).json({ erroe: " password is required" });
    }
    try {
        const user = await User.findOne({ email: email });
        console.log("user ===========>>>", user);
        if (user) {
            const result = req.body.password === user.password;
            console.log("result ===========>>>", result);
            
            if (result) {
                //generate initial access token 
                const token = jwt.sign(
                    { id: user.id, email: email },
                    process.env.JWT_KEY,
                    { expiresIn: '24h' }
                );

                res.status(200).json({token})
            } else {
                res.status(400).json({ error: "Email Or password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }

    } catch (error) {
        console.error("Login failed")
        return res.status(400).json({ message: error.message });
    }

}