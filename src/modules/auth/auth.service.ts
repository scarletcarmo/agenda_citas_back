import { prisma } from "../../config/prisma";
import { generateToken } from "../../utils/jwt";
import { BusinessRepository } from "../business/business.repository";
import { BusinessService } from "../business/business.service";
import { AuthRepository } from "./auth.repository";
import bcrypt from "bcrypt";

const repo = new AuthRepository();
const repoBusiness = new BusinessRepository();

export class AuthService {
    async register(data: any) {
        const { user, business } = data;

        console.log("data__", data);

        const { name, email, password, role } = user;
        const { name: businessName, phone, address, city, country } = business;

        // Validar email
        const exists = await repo.findByEmail(email);
        if (exists) throw new Error("El email ya está registrado");

        // Hashear contraseña
        const hashed = await bcrypt.hash(password, 10);

        // Slug del negocio
        const slug = businessName.toLowerCase().replace(/\s+/g, "-");

        // Crear negocio
        const result = await prisma.$transaction(async (tx) => {
            // Crear usuario (repo con tx)
            const newUser = await repo.create({
                name,
                email,
                password_hash: hashed,
                role
            }, tx);

            // Crear negocio (repo con tx)
            const newBusiness = await repoBusiness.create({
                owner_id: newUser.id,
                name: businessName,
                slug,
                phone,
                address,
                city,
                country
            }, tx);

            return { newUser, newBusiness };
        });
        // Token
        const token = generateToken({
            id: result.newUser.id,
            role: result.newUser.role,
            business_id: result.newBusiness.id
        });


        return {
            user: result.newUser,
            business: result.newBusiness,
            token
        };
    }

    async login(data: any) {
        const { email, password } = data;

        const user = await repo.findByEmail(email);
        if (!user) throw new Error("Usuario no encontrado");

        const credentials = await bcrypt.compare(password, user.password_hash);
        if (!credentials) throw new Error("Credenciales incorrectas");

        const business = user.business[0];

        const token = generateToken({
            id: user.id,
            role: user.role,
            business_id: business.id,
        });

        return { user, business, token };

    }

    async changePassword(userId: number, data: any) {

        console.log("id ", userId);

        const { old_password, new_password } = data;

        if (!old_password || !new_password) {
            throw new Error("Debe enviar la contraseña actual y la nueva contraseña");
        }

        const user = await repo.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        const validatePass = await bcrypt.compare(old_password, user.password_hash)
        if (!validatePass) {
            throw new Error("La contraseña actual es incorrecta");
        }

        //pass nueva
        const hashed = await bcrypt.hash(new_password, 10);

        //actualizar
        const updated = repo.update(userId, hashed);

        return {
            message: "Contraseña actualizada correctamente"
        };
    }

    async findAll() {
        return repo.findAll();
    }

    async findOne(id: number) {
        const user = await repo.findById(id);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        return user;
    }

    async update(id: number, data: any) {
        const exists = await repo.findById(id);

        if (!exists) {
            throw new Error("Usuario no encontrado");
        }

        return repo.update(id, data);
    }

    async delete(id: number) {
        const exists = await repo.findById(id);
        if (!exists) {
            throw new Error("Usuario no encontrado");
        }

        return repo.delete(id);
    }
}