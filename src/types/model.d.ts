import { Model, ModelStatic } from "sequelize";

export type ModelWithAssociations<T extends Model> = ModelStatic<T> & {
  associate?: (models: any) => void;
};
