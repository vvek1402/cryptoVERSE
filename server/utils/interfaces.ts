export interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
    token?: string;
    userId? : string;
    createdAt?: {
        type: Date,
        default: Date,
    };
}