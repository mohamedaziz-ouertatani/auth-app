import { Model, ModelCtor } from "sequelize";
import { TokenAttributes } from "./token";
import { UserAttributes } from "./user";

// Extend the existing Sequelize Model interface
declare module "sequelize" {
  interface Model {
    Token: ModelCtor<Model<TokenAttributes>>;
    User: ModelCtor<Model<UserAttributes>>;
  }
}
