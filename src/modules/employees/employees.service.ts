import { Employee } from "@prisma/client";
import { EmployeesRequestDto } from "../../dto/employee.request.dto";
import { ResponseDto } from "../../dto/Response.dto";
import { EmployeesRepository } from "./employees.repository";

const repo = new EmployeesRepository();

export class EmployeesService {

    async create(data: EmployeesRequestDto): Promise <ResponseDto<Employee>>{
        try {
            const { business_id, name, email, phone } = data;

            const result = await repo.create({ business_id, name, email, phone });

            return {
                success: true,
                message: "Empleado creado correctamente",
                data: result,
            }
        } catch (error: any) {
            return {
                success: false,
                message: "Error al crear el empleado",
                errors: error?.message
            }
        }
    }
}