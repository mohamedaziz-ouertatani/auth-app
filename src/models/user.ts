import { Model, DataTypes, Sequelize } from "sequelize";
import { ModelWithAssociations } from "../types/model";
import { Token } from "./token"; // Import Token type

export interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id?: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public phoneNumber?: string;

  // Define static associate method
  public static associate(models: { Token: ModelWithAssociations<Token> }) {
    User.hasMany(models.Token, {
      foreignKey: "userId",
      as: "tokens",
    });
  }
}

const createUserModel = (sequelize: Sequelize): ModelWithAssociations<User> => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User as ModelWithAssociations<User>;
};

export default createUserModel;
