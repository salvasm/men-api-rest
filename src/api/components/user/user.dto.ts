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
    length: number;

    constructor(data: IUser) {
        if (data.username) this.username = data.username;
        if (data.email) this.email = data.email;
        if (data.firstname) this.firstname = data.firstname;
        if (data.lastname) this.lastname = data.lastname;
        if (data.password) this.password = bcrypt.hashSync(data.password, config.bcrypt.saltRounds);
        if (data.gender) this.gender = data.gender;
        if (data.birthday) this.birthday = data.birthday;
        this.length = Object.keys(data).length;
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
        this.password = bcrypt.hashSync(value, config.bcrypt.saltRounds);;
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
}

export default User;
