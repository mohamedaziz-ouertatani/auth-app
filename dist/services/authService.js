"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static async register(data) {
        try {
            const existingUser = await models_1.UserModel.findOne({
                where: { email: data.email },
            });
            if (existingUser) {
                throw new Error("Email already in use.");
            }
            const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
            const user = await models_1.UserModel.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                phoneNumber: data.phoneNumber,
            });
            return user;
        }
        catch (error) {
            console.error("Error during registration:", error);
            throw error;
        }
    }
    static async login(data) {
        try {
            const user = await models_1.UserModel.findOne({ where: { email: data.email } });
            if (!user) {
                throw new Error("User not found.");
            }
            // Access the properties from dataValues
            const userPassword = user.dataValues.password;
            const userId = user.dataValues.id; // Ensure you access the ID here
            if (!data.password) {
                throw new Error("Password not provided.");
            }
            if (!userPassword) {
                throw new Error("User password not found.");
            }
            const isPasswordValid = await bcrypt_1.default.compare(data.password, userPassword);
            console.log("Password comparison result:", isPasswordValid);
            if (!isPasswordValid) {
                throw new Error("Invalid password.");
            }
            if (!userId) {
                throw new Error("User ID is undefined.");
            }
            const token = jsonwebtoken_1.default.sign({ userId: userId }, "your_jwt_secret", {
                expiresIn: "1h",
            });
            await models_1.TokenModel.create({ userId: userId, token, state: "active" });
            return token;
        }
        catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }
}
exports.AuthService = AuthService;
