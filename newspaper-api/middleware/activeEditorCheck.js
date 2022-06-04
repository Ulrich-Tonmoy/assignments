import User from "./../models/user.js";
import Type from "./../models/type.js";

const activeEditorCheck = async (req, res, next) => {
    const { isActive } = req.body;
    try {
        const type = await Type.find({ type: "Editor" });
        const activeEditor = await User.find({ $and: [{ typeId: type.type }, { isActive: true }] });

        if (isActive) {
            if (activeEditor.length >= 1)
                res.status(401).json({
                    message:
                        "There's already one active Editor if you want to add a new Editor either deactivate the editor or Delete the Editor",
                });
            else next();
        } else next();
    } catch (error) {
        console.log(error);
    }
};

export default activeEditorCheck;
