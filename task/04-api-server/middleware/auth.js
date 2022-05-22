import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        let decodeData;
        decodeData = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodeData?.id;

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
