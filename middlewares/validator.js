const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.requireLogin = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("token:", token)
    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.KEY)
            if (decoded) {
                const userID = decoded.userID;
                req.body.userID = userID;
                next();
            } else {
                res.send("Please login first")
            }
        }
    } catch (error) {
        return res.json({ message: "Please login first" });
    }
}