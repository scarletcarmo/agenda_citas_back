export interface EmployeesRequestDto{
    business_id: number;
    name: string;
    email?: string;
    phone?: string;
}