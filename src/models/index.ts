import { Sequelize } from "sequelize";
import createUserModel from "./user";
import createTokenModel from "./token";

const sequelize = new Sequelize("myapp", "postgres", "0000", {
  host: "localhost",
  dialect: "postgres",
});

const UserModel = createUserModel(sequelize);
const TokenModel = createTokenModel(sequelize);

// Set up associations
UserModel.associate?.({ Token: TokenModel });
TokenModel.associate?.({ User: UserModel });

sequelize.sync();

export { UserModel, TokenModel, sequelize }; // Ensure `sequelize` is exported here
