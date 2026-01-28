export interface User {
    _id: string;
    fullName: string;
    email: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData {
    fullName: string;
    email: string;
    password: string;
}
