export interface Product {
    _id?: string;
    id: number;
    name: string;
    description: string;
    price?: number | string;
    imageUrl: string;
    availableQuantity: number;
    quantity: number;
}

export interface AuthUser {
    email: string;
    firstName?: string;
    firstname?: string;
    lastName?: string;
    lastname?: string;
    role: string;
    iat?: number;
    exp?: number;
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface OrderRecord {
    itemNumber?: string;
    email?: string;
    orderId?: string;
    orderStatus?: string;
    quantity?: number;
    productname?: string;
    productprice?: number;
    imageUrl: string;
    firstName?: string;
    address?: string;
    pincode?: string;
    phone?: string;
    paymentId?: string;
    signature?: string;
}

export interface ReviewRecord {
    review: {
        comment: string;
    };
    id: string;
    comment?: string;
    nameofreviewer?: string;
    userType?: string;
}

export interface QuantityProps {
    quantity: number;
    handleIncreaseQuantity: () => void;
    handleDecreaseQuantity: () => void;
}

export interface HeaderUserData {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    iat?: number;
    exp?: number;
}

export interface UserDataType {
    firstName?: string;
    firstname?: string;
    email: string;
    lastname?: string;
    lastName?: string;
    role: string;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export { };
