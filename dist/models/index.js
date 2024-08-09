"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.TokenModel = exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("./user"));
const token_1 = __importDefault(require("./token"));
const sequelize = new sequelize_1.Sequelize("myapp", "postgres", "0000", {
    host: "localhost",
    dialect: "postgres",
});
exports.sequelize = sequelize;
const UserModel = (0, user_1.default)(sequelize);
exports.UserModel = UserModel;
const TokenModel = (0, token_1.default)(sequelize);
exports.TokenModel = TokenModel;
// Set up associations
UserModel.associate?.({ Token: TokenModel });
TokenModel.associate?.({ User: UserModel });
sequelize.sync();
