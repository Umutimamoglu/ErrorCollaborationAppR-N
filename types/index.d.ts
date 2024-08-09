

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

export interface CreateError {
    name: string;
    isFixed: boolean;
    language: string;
    image?: string;
    color?: IColor;
    type: string; // 'type' artık zorunlu
    howDidIFix: string;
}

export interface ICreateErrorRequest {


    name: string;
    isFixed: boolean;
    language: string;
    image?: string | null;
    color?: IColor;
    type: string;
    howDidIFix?: string;
}

export interface IBug {
    _id: string
    name: string;
    isFixed: boolean;
    language: string;
    image?: string;
    color: IColor;
    type: string;
    howDidIFix?: string;
}

export interface IAllBugs {
    createdAt: string | number | Date
    _id: string
    user: IUser;
    name: string;
    isFixed: boolean;
    language: string;
    image?: string;
    color: IColor;
    type: string;
    howDidIFix?: string;
    Date: Date;
    Time: Time;
}