import Jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
    const cookie = req.headers.cookie;

    const token = cookie?.split("jwt=")[1];
    if(!token) {
        return res.status(404).json({ message: "No token found!" }); 
    }
    Jwt.verify(String(token), global.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(400).json({ message: "Invalid Token" }); 
        }
        req.userInfo = user.userInfo;
        next();
    });
};
