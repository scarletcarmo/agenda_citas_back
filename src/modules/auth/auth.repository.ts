import { prisma } from "../../config/prisma";

export class AuthRepository {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    async findById(id: number) {
        return prisma.user.findById({
            where: {
                id
            }
        });
    }

    async create(data: any) {
        return prisma.user.create({
            data
        });
    }

    async delete(id: number) {
        return prisma.user.delete({
            where: {
                id
            }
        });
    }

    async findAll() {
        return prisma.user.findMany();
    }

    async update(id: number, data: any) {
        return prisma.user.update({
            where: { id },
            data
        });
    }
}