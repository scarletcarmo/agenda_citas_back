import { prisma } from "../../config/prisma";

export class EmployeesRepository {
    async create(data: any) {
        return prisma.employee.create({ data });
    }

    async update(id: number, data: any) {
        return prisma.employee.update({
            where: { id },
            data
        })
    }

    async findAll() {
        return prisma.employee.findMany();
    }

    async findById(id: number) {
        return prisma.employee.findUnique({
            where: { id }
        })
    }

    async delete(id: number) {
        return prisma.employee.delete({
            where: { id }
        })
    }
}