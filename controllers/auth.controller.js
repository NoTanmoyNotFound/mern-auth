import User from "../api/models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    try {
        await newUser.save()
        res.status(201).json({message : "User created successfully"});
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
    
    
};