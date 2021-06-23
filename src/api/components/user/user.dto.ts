import config from '@config/global';
import bcrypt from 'bcrypt';
import { IUser } from './user.model';

class User implements IUser {
    username!: string;
    email!: string;
    firstname!: string;
    lastname!: string;
    password!: string;
    gender?: string | undefined;
    birthday?: Date | undefined;
    createdAt?: Date | undefined;
    modifiedAt?: Date | undefined;

    constructor(data: IUser) {
        this.username = data.username;
        this.email = data.email;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.password = bcrypt.hashSync(data.password, config.bcrypt.saltRounds);
        this.gender = data.gender;
        this.birthday = data.birthday;
        this.createdAt = data.createdAt;
        this.modifiedAt = data.modifiedAt;
    }

    public getUsername() {
        return this.username;
    }

    public setUsername(value: string) {
        this.username = value;
    }

    public getEmail() {
        return this.email;
    }

    public setEmail(value: string) {
        this.email = value;
    }

    public getFirstname() {
        return this.firstname;
    }

    public setFirstname(value: string) {
        this.firstname = value;
    }

    public getLastname() {
        return this.lastname;
    }

    public setLastname(value: string) {
        this.lastname = value;
    }

    public getPassword() {
        return this.password;
    }

    public setPassword(value: string) {
        this.password = value;
    }

    public getGender() {
        return this.gender;
    }

    public setGender(value: string) {
        this.gender = value;
    }

    public getBirthday() {
        return this.birthday;
    }

    public setBirthday(value: Date) {
        this.birthday = value;
    }

    public getCreatedAt() {
        return this.createdAt;
    }

    public setCreatedAt(value: Date) {
        this.createdAt = value;
    }

    public getModifiedAt() {
        return this.modifiedAt;
    }

    public setModifiedAt(value: Date) {
        this.modifiedAt = value;
    }
}

export default User;
