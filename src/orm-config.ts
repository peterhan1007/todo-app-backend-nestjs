import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { User } from './user/entities/user.entity';

export const ORM_CONFIG: TypeOrmModuleOptions = {
  keepConnectionAlive: true,
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'nest',
  entities: [User],
  synchronize: true,
  logging: false,
};
