import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { TodolistModule } from './todolist/todolist.module';
import { TaskController } from './task/task.controller';


@Module({
  imports: [PrismaModule, TodolistModule],
  controllers: [TaskController],
  providers: [],
})
export class AppModule { }
