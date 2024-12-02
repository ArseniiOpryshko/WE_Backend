import { Module } from '@nestjs/common';
import { WorkersModule } from './workers/workers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Worker } from './typeorm/entities/Worker';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: process.env.DATABASE,
      entities: [Worker],
      synchronize: true,
    }),
    WorkersModule,
    AuthModule,
  ],
})
export class AppModule {}
