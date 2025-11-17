import { prisma } from "../../config/prisma";

export class AuthRepository {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email
            },
            include: {
                business: true  // Cargar negocios del usuario
            }
        });
    }

    async findById(id: number) {
        return prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async create(data: any, tx: any = prisma) {
        return tx.user.create({
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