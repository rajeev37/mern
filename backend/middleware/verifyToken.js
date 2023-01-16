import Jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    Jwt.verify(
        token,
        global.ACCESS_TOKEN_SECRET,
        (err, user) => {
            if (err) {
                console.log("****verify token****", err);
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.userInfo = user.userInfo;
            next();
    });
};
