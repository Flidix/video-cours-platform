import { DatabaseRepository } from '../repositories/database.repository';

export type DatabaseEntitiesType = {
  // list here all database entity names and types
};

export type DatabaseRepositories = {
  [table in keyof DatabaseEntitiesType]: DatabaseRepository<DatabaseEntitiesType[table]>;
};
