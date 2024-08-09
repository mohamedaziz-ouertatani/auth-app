"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const sequelize_1 = require("sequelize");
class Token extends sequelize_1.Model {
    id;
    userId;
    token;
    state;
    // Define static associate method
    static associate(models) {
        Token.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });
    }
}
exports.Token = Token;
const createTokenModel = (sequelize) => {
    Token.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Token",
    });
    return Token;
};
exports.default = createTokenModel;
