export interface User {
    id : number,
    name: string,
    lastname: string,
    email: string,
    role: string,
    registration_date: string
}

export interface UserPost {
    name: string,
    lastname: string,
    email: string,
    registration_date: string,
    password: string,
}