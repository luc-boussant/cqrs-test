import { ConnectionOptions } from 'typeorm';

export default {
  type: 'mongodb',
  host: 'localhost',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: ['src/model/*.ts'],
  useUnifiedTopology: true
} as ConnectionOptions;
