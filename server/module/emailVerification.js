import mongoose, { Schema } from "mongoose";

const emailVerificationSchema = Schema({
    userId: String,
    token: String,
    created_At: Date,
    expiresAt: Date,

});
const verification = mongoose.model("Verification", emailVerificationSchema);

export default verification;