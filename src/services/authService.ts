import bcrypt from "bcrypt";
import { UserModel, TokenModel } from "../models";
import jwt from "jsonwebtoken";

export class AuthService {
  static async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
  }) {
    try {
      const existingUser = await UserModel.findOne({
        where: { email: data.email },
      });
      if (existingUser) {
        throw new Error("Email already in use.");
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await UserModel.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        phoneNumber: data.phoneNumber,
      });

      return user;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }

  static async login(data: { email: string; password: string }) {
    try {
      const user = await UserModel.findOne({ where: { email: data.email } });
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

      const isPasswordValid = await bcrypt.compare(data.password, userPassword);
      console.log("Password comparison result:", isPasswordValid);

      if (!isPasswordValid) {
        throw new Error("Invalid password.");
      }

      if (!userId) {
        throw new Error("User ID is undefined.");
      }

      const token = jwt.sign({ userId: userId }, "your_jwt_secret", {
        expiresIn: "1h",
      });

      await TokenModel.create({ userId: userId, token, state: "active" });

      return token;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
}
