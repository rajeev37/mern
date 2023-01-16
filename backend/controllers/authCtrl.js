import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    const { name, email, roles, password } =  req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (error) {
        return res.status(400).json({message: error});
    }
    if(existingUser) {
        return res.status(400).json({message: "User already exists."});
    }
    const hashedPwd = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        roles,
        password: hashedPwd
    });
    try {
        const users = await user.save();
        res.status(201).json(users);
    } catch (error) {
        res.status(400).json({message: error});
    }
    
};

export const signIn = async (req, res) => {
    const { email, password } =  req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (error) {
        return res.status(400).json({message: error});
    }
    if(!existingUser) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const isPwdCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPwdCorrect) {
        return res.status(400).json({message: "Invalid Email or Password."});
    }

    const roles = Object.values(existingUser.roles).filter(Boolean);
    const accessToken = Jwt.sign(
        {
            "userInfo": {
                "id": existingUser._id,
                "roles": roles
            }
        },
        global.ACCESS_TOKEN_SECRET,
        { expiresIn: "40s" }
    );
    const refreshToken = Jwt.sign(
        { "id": existingUser._id },
        global.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )
    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })
    res.json({ accessToken })
};

export const refreshToken = async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });
    const refreshToken = cookies.jwt;

    Jwt.verify(
        refreshToken,
        global.REFRESH_TOKEN_SECRET, 
        async (err, user) => {
            if (err) return res.status(403).json({ message: 'Authentication Failed.' });

            const foundUser = await User.findOne({ _id: user.id }).exec();
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

            const roles = Object.values(foundUser.roles).filter(Boolean);
            const accessToken = Jwt.sign(
                {
                    "userInfo": {
                        "id": foundUser._id,
                        "roles": roles
                    }
                },
                global.ACCESS_TOKEN_SECRET,
                { expiresIn: "40s" }
            );
            res.json({ accessToken })
        }
    );
}
export const logout = (req, res, next) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
};