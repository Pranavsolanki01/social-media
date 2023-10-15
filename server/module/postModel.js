import mongoose, { Schema, Types } from "mongoose";

// schema

const postSchema = new mongoose.Schema(
    {
        userId: {types: Schema.Types.ObjectId, ref: "Users"},
        description: { type: String, required: true},
        image: { type: String},
        likes: [{ type: String}],
        comments: [{ type: Schema.Types.ObjectId, ref: "Comments"}]
    },
    { timestamps: true}
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;

