import User from "../api/models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../api/utils/error.js";
import Ok from "../api/models/ok.model.js";
import  Jwt  from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({username, email, password: hashedPassword });
    try {
        await newUser.save()
        res.status(201).json({message : "User created successfully"});
        
    } catch (error) {
        console.log(error);
        next(error);
        // next(errorHandler(300,"Something went wrong")); if you want to show custom error but i dont need it 
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({email});
        if (!validUser) return next(errorHandler(404, "User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid credentials"));
        const token = Jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: hashedPassword, ...rest} = validUser._doc;

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1); // Set the expiry date to 1 day from now

        res.cookie('access_token', token, {httpOnly: true, expires: expiryDate})
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};