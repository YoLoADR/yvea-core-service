import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { Public } from '@libs/decorators';
import { TodoService } from '../services';
import { CreateTodoDto, UpdateTodoDto } from '../dto';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Todo | undefined> {
        return this.todoService.findOne(+id);
    }

    // Défi : Fournissez une méthode pour obtenir toutes les tâches existantes.
    // Explication simplifiée : `findAll` utilise @Get pour récupérer et retourner toutes les tâches depuis le service.
    @Public()
    @Get()
    findAll(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    // Défi : Mettez en place une route qui permet de créer une nouvelle tâche à partir d'un titre.
    // Explication simplifiée : `create` prend un titre du corps de la requête et crée une nouvelle tâche grâce au service.
    @Post()
    create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todoService.create(createTodoDto);
    }

    // Défi : Ajoutez une fonctionnalité pour mettre à jour une tâche existante par son ID.
    // Explication simplifiée : `update` permet de modifier une tâche spécifiée par l'ID dans l'URL. Les nouvelles valeurs sont prises du corps de la requête.
    @Put(':id')
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
        return this.todoService.update(+id, updateTodoDto);
    }

    // Défi : Implémentez une route pour supprimer une tâche en utilisant son ID.
    // Explication simplifiée : `delete` supprime la tâche correspondant à l'ID fourni et retourne un résultat basé sur le succès de l'opération.
    @Delete(':id')
    delete(@Param('id') id: string): Promise<boolean> {
        return this.todoService.delete(+id);
    }
}
