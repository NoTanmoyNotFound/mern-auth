import User from "../api/models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../api/utils/error.js";

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    try {
        await newUser.save()
        res.status(201).json({message : "User created successfully"});
        
    } catch (error) {
        next(error);
        // next(errorHandler(300,"Something went wrong")); if you want to show custom error but i dont need it 
    }
};