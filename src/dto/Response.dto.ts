export interface ResponseDto<T>{
    success: boolean;
    message: String;
    data?: T;
    errors?: any
}