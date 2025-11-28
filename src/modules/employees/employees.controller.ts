import { Employee } from "@prisma/client";
import { Request, Response } from "express";
import { ResponseDto } from "../../dto/Response.dto";
import { EmployeesService } from "./employees.service";
import { EmployeesRequestDto } from "../../dto/employee.request.dto";

const service = new EmployeesService();

export const create = async (req: Request, res: Response) => {
    try {
        const data = req.body as EmployeesRequestDto;
        const result: ResponseDto<Employee> = await service.create(data);

        return res.status(201).json(result);

    } catch (error: any) {
        const response: ResponseDto<null> = {
            success: false,
            message: "Error interno del servidor",
            errors: error?.message || "Error desconocido",
        };

        return res.status(500).json(response);
    }
}
