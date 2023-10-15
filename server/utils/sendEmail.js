import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { hashString } from "./index.js";
import Verification from "../module/emailVerification.js";

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env

let transporter = nodemailer.createTestAccount({
    host: "smtp-mail.outlook.com",

    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
    },
});

export const sendVerificationEmail = async (user, res) => {
    const { _id, email, lastName } = user;
    
    const token = _id + uuidv4();
    
    const link = APP_URL+ "users/verify/" + _id + "/" +token;

    // mail option

    const mailOption ={
        from: AUTH_EMAIL,
        to: email,
        subject: "EMAIL Verification by SnapIt",
        html: `<div style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #000'>
        <h1 style="color: rgb(8,56,188)">Please verify your email address</h1>
        <hr>
        <h4>Hi ${firstName} ${lastName}, </h4>
        <p>
            Plese verify your email address so we can know that it's really you 
            <br>
            <p>This Link <b>Expires in 1 hours </b></p>
            <br>
            <a href=${link} 
                style="color:#fff; padding: 14px; text-decoration: none; background-color:#000;"> Email Address
            </a>
            </p>
            <div style="margin-top: 25px;">
                <h5>Best Regards</h5>
                <h4>SnapIt Team</h4>
            </div>
        </div>`,
    };
    
    try{
        const hashedToken = await hashString(token);

        const newVerificationEmail = await Verification.create({
            userId: _id,
            token: hashedToken,
            createAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        if (newVerificationEmail) {
            transporter.sendMail(mailOption).then(() => {
                res.status(201).send({
                    success: "PENDING",
                    message: "Verification email has been sent to your account. Check your email for further instruction"
                });
            })
            .catch((err)=> {
                console.log(err);
                res.status(404).json({message: "Something went wrong"});
            });
        }

    }catch (error) {
        console.log(error);
        res.status(404).json({message: "Something went wrong"});
    }
};