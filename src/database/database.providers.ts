import { Sequelize } from 'sequelize-typescript';
import { Post } from 'src/modules/posts/post.entity';
import { User } from '../modules/users/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(
        process.env.DB_DATABASE,
        process.env.DB_USER,
        process.env.DB_PASS,
        {host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: 'postgres',
        });
      sequelize.addModels([User,Post]);
      await sequelize.sync();
      return sequelize;
    },
  },
];