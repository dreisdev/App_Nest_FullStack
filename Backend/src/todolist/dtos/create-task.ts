import { IsNotEmpty } from "class-validator";

export default class CreateTaskDto {
    @IsNotEmpty({ message: "Por favor digite um título para a tarefa." })
    title: string;

    @IsNotEmpty({ message: "A tarefa precisa ter uma descrição." })
    description: string;
}