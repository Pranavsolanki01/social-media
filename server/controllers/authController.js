import Users from "../module/userModel.js";
import { createJWT, hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    // validate fileds

    if(!(firstName || lastName || email || password)){
        next("Provide Required Fields!");
        return;
    }

    try{
        const userExist = await Users.findOne({ email });
            if (userExist){
                next("Email address already exists");
                return;
            }
            const hashedPassword = await hashString(password);

            const user = await Users.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });

            
            // send email verification to user
            
            sendVerificationEmail(user, res);

    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message});
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;


    try{
        if(!email || !password){
            next("Please provide user Credentials");
            return;
        }
        // find user by email
        const user = await Users.findOne({email}).select("+password").populate({
            path: "friends",
            select: "firstName lastName location profileUrl -password",
        });

        if(!user) {
            next("Invalid email or password");
            return;
        }

        if(!user?.verified){
            next("User email is not Verified. Check you email account and verify your email");
            return;
        }

        // Compare Password

        const isMatch = await compareString(password, user?.password);

        if(!isMatch){
            next("Invalid email or password");
            return;
        }

            user.password = undefined;
            const token = createJWT(user?._id);

            res.status(201).json({
                success: true,
                message: "Login Successfully",
                user,
                token,
            });

    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
