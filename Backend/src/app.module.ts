import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { TodolistModule } from './todolist/todolist.module';


@Module({
  imports: [PrismaModule, TodolistModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
