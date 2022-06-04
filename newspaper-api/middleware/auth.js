import jwt from "jsonwebtoken";
import User from "./../models/user.js";
import Type from "./../models/type.js";

export const AdminAccessCheck = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        let decodeData;
        decodeData = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodeData?.id);
        const type = await Type.findById(user?.typeId);

        if (type.type !== "Admin")
            res.status(401).json({
                message: "User does not have the required permissions to proceed!!",
            });
        else next();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const EditorAccessCheck = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        let decodeData;
        decodeData = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodeData?.id);
        const type = await Type.findById(user?.typeId);

        if (type.type === "Editor" && user?.isActive === true) next();
        else
            res.status(401).json({
                message:
                    "User account is not active and does not have the required permissions to proceed!!",
            });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
