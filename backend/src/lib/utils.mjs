import jwt from "jsonwebtoken";

export const generateToken = (payload, res) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:"7d"
    });

    res.cookie("jwt", token, {
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        secure: process.env.NODE_ENV !== "development",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", // CSRF attacks cross-site request forgery attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    })

    return token;
};