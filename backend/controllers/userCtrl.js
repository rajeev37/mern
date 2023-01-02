import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    const { name, email, roles, password } =  req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (error) {
        console.log(error);
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
        console.log({message: error});
    }
    
};

export const signIn = async (req, res) => {
    const { email, password } =  req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (error) {
        console.log(error);
    }
    if(!existingUser) {
        return res.status(400).json({message: "User not found."});
    }
    const isPwdCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPwdCorrect) {
        return res.status(400).json({message: "Invalid Email or Password."});
    }

    const roles = Object.values(existingUser.roles).filter(Boolean);
    const token = Jwt.sign(
        {
            "userInfo": {
                "id": existingUser._id,
                "roles": roles
            }
        },
        global.ACCESS_TOKEN_SECRET,
        { expiresIn: "40s" }
    );

    if(req.cookies["jwt"]) {
        req.cookies["jwt"] = "";
    }
    res.cookie(String("jwt"), token, {
        path: "/",
        expire: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSide: "lax"
    })
    return res.status(200).json({ message: "Successfuly Logged In.", user: existingUser, token: token });
};


export const getUser = async (req, res) => {
    const userInfo = req.userInfo;
    let user;
    try {
        user = await User.findById(userInfo.id, "-password");
    } catch (error) {
        return new Error(error);
    }
    if(!user) {
        return res.status(404).json({message: "User Not Found!"});
    }
    return res.status(200).json({user});
};
export const refreshToken = async (req, res, next) => {
    const cookie = req.headers.cookie;

    const prevToken = cookie.split("jwt=")[1];
    if(!prevToken) {
        return res.status(404).json({ message: "No token found!" }); 
    }
    Jwt.verify(String(prevToken), global.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json({ message: "Authentication Failed." }); 
        }
        res.clearCookie("jwt");
        req.cookies["jwt"] = "";
        const roles = Object.values(user.userInfo.roles).filter(Boolean);
        const token = Jwt.sign(
            {
                "userInfo": {
                    "id": user.userInfo.id,
                    "roles": roles
                }
            },
            global.ACCESS_TOKEN_SECRET,
            { expiresIn: "40s" }
        );
        res.cookie(String("jwt"), token, {
            path: "/",
            expire: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSide: "lax"
        });
        req.userInfo = user.userInfo;
        next();
    });
}
export const logout = (req, res, next) => {
    const cookie = req.headers.cookie;
    const prevToken = cookie.split("jwt=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    Jwt.verify(String(prevToken), global.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie("jwt");
      req.cookies["jwt"] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    });
  };
export const getAllUser = async (req, res) => {
    let user;
    try {
        user = await User.find();
    } catch (error) {
        return new Error(error);
    }
    if(!user) {
        return res.status(404).json({message: "User Not Found!"});
    }
    return res.status(200).json({user});
};