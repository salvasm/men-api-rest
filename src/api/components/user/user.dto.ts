export interface createUserDto {
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

export interface putUserDto {
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    gender: string,
    birthday: Date,
}
