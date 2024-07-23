

interface IAuthenticatedUser {
    email: string
    name: string
}

export interface IColor {
    name: string
    id: string
    code: string
}

export interface IIcon {
    name: string
    id: string
    symbol: string
}

export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface ILogin {
    email: string;
    password: string;
}