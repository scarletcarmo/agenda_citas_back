import { prisma } from "../../config/prisma";

export class ServiceRepository {
    async create(data: any) {
        return prisma.service.create({ data });
    }

    async update(id: number, data: any) {
        return prisma.service.update({
            where: { id },
            data
        })
    }

    async findAll() {
        return prisma.service.findMany();
    }

    async findById(id: number) {
        return prisma.service.findUnique({
            where: { id }
        })
    }

}