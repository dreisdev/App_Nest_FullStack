import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateTaskDto from './dtos/create-task';

@Injectable()
export class TodolistService {
    constructor(private readonly prisma: PrismaService) { }


    async findAllTasks() {
        return await this.prisma.task.findMany();
    }

    async findTaskById(taskId: string) {
        return await this.prisma.task.findFirst({
            where: {
                id: taskId
            },
            select: {
                title: true,
                description: true
            }


        });
    }

    async createTask(createTaskDto: CreateTaskDto) {
        return await this.prisma.task.create({
            data: createTaskDto
        });
    }

    async updateTask(taskId: string, updateTask) {
        return await this.prisma.task.update({
            where: {
                id: taskId
            },
            data: updateTask
        });
    }

    async deleteTask(id: string) {
        return await this.prisma.task.delete({
            where: {
                id
            }
        });

    }

}
