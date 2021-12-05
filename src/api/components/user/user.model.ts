import mongoose, { Schema } from 'mongoose';

export interface IUser {
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    gender?: string,
    birthday?: Date
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    gender: {
        type: String
    },
    birthday: {
        type: Date
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user', 'guest'],
        immutable: true
    }
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
