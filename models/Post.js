import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default model('Post', postSchema);