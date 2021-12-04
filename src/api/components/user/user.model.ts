import mongoose, { Schema } from 'mongoose';

export interface IUser {
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    gender?: string,
    birthday?: Date,
    createdAt?: Date,
    modifiedAt?: Date,
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
    createdAt: {
        type: Date,
        default: Date.now()
    },
    modifiedAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model<IUser>('User', userSchema);
