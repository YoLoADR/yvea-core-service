import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entities';
import { CreateTodoDto, UpdateTodoDto } from '../dto';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<Todo>,
    ) { }

    // Défi : Initialisez et gérez une liste de todos en utilisant une propriété de classe.
    // Explication simplifiée : Utilisez `private readonly` pour sécuriser la liste de todos, permettant seulement sa modification à travers les méthodes de cette classe.
    private readonly todos: Todo[] = [
        { id: 1, title: 'Acheter du lait', completed: false },
        { id: 2, title: 'Répondre aux emails', completed: true }];


    async findOne(id: number): Promise<Todo | undefined> {
        return this.todoRepository.findOneBy({ id });
    }

    // Défi : Créez une méthode qui retourne tous les todos existants.
    // Explication simplifiée : `findAll` doit retourner chaque todo stocké, permettant à l'utilisateur de voir toutes ses tâches.
    async findAll(): Promise<Todo[]> {
        return this.todoRepository.find();
    }

    // Défi : Développez une méthode pour ajouter un nouveau todo basé sur un titre donné.
    // Explication simplifiée : `create` crée un nouveau todo avec un identifiant unique, le titre reçu en paramètre et un état non complété, puis l'ajoute à la liste.
    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const newTodo = this.todoRepository.create(createTodoDto);
        return this.todoRepository.save(newTodo);
    }

    // Défi : Mettez en place une méthode pour mettre à jour un todo existant avec un nouvel état et/ou titre.
    // Explication simplifiée : `update` cherche un todo par son ID et, si trouvé, le met à jour avec les nouvelles informations fournies avant de le retourner.
    async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
        const result = await this.todoRepository.update(id, updateTodoDto);

        if (result.affected > 0) {
            // Si l'opération de mise à jour a affecté au moins une ligne, on retourne le todo mis à jour.
            // Note : `preload` charge l'entité avec son id et applique les valeurs mises à jour.
            // Cela équivaut à récupérer l'entité mise à jour sans faire une requête `find` séparée.
            return this.todoRepository.findOneBy({ id });
        }

        // Si aucun todo n'a été mis à jour (par exemple, si aucun todo avec cet id n'existe), on retourne null.
        return null;
    }

    // Défi : Implementez une fonction pour supprimer un todo à partir de son identifiant.
    // Explication simplifiée : `delete` trouve le todo correspondant à l'ID donné et le retire de la liste, retournant vrai si l'opération est réussie, faux sinon.
    async delete(id: number): Promise<boolean> {
        const result = await this.todoRepository.delete(id);
        return result.affected > 0;
    }
}
