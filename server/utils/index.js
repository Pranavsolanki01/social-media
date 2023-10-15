import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export const hashString = async (usevalue) => {
    const salt = await bcrypt.getSalt(10);

    const hashedPassword = await bcrypt.hash(usevalue, salt);
    return hashedPassword
};

export const compareString = async (userPassword, password) => {
    const isMatch = await bcrypt.compare(userPassword, password);
    return isMatch;
};

// JSON WEB TOKEN

export function createJWT(id){
    return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEy,{ 
        expiresIn: "1d",
    });
};