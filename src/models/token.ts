import { Model, DataTypes, Sequelize } from "sequelize";
import { ModelWithAssociations } from "../types/model";
import { User } from "./user"; // Import User type

export interface TokenAttributes {
  id?: number;
  userId: number;
  token: string;
  state: string;
}

export class Token extends Model<TokenAttributes> implements TokenAttributes {
  public id?: number;
  public userId!: number;
  public token!: string;
  public state!: string;

  // Define static associate method
  public static associate(models: { User: ModelWithAssociations<User> }) {
    Token.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

const createTokenModel = (
  sequelize: Sequelize
): ModelWithAssociations<Token> => {
  Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Token",
    }
  );

  return Token as ModelWithAssociations<Token>;
};

export default createTokenModel;
