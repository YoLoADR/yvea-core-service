import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '../dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly dataSource: DataSource,) {

  }

  async findAll(): Promise<Subscription[]> {
    return this.dataSource.manager.find(Subscription);
  }

  async findSubscriptionsByUserId(userId: number): Promise<Subscription[]> {
    return this.dataSource.manager.find(Subscription, {
      where: {
        userId: userId
      }
    });
  }

  async createSubscription(dto: CreateSubscriptionDto): Promise<Subscription> {
    const subscription = new Subscription();
    subscription.userId = dto.userId;
    subscription.pluginId = dto.pluginId;
    subscription.startDate = new Date(); // Utilisez la date actuelle pour le début de l'abonnement
    subscription.trialEndDate = new Date(Date.now() + 48 * 60 * 60 * 1000); // Ajoutez 48 heures pour la fin de la période d'essai
    subscription.status = 'TRIAL'; // Le statut est défini sur 'TRIAL' par défaut

    return this.dataSource.manager.save(subscription);
  }

  async updateSubscription(id: number, dto: UpdateSubscriptionDto): Promise<Subscription> {
    const subscription = await this.dataSource.manager.findOneBy(Subscription, { id });
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    if (dto.endDate) {
      // Convertissez la chaîne de caractères en objet Date avant de l'assigner
      subscription.endDate = new Date(dto.endDate);
    }
    if (dto.status) {
      subscription.status = dto.status;
    }

    return this.dataSource.manager.save(subscription);
  }

  async cancelSubscription(id: number): Promise<void> {
    const subscription = await this.dataSource.manager.findOneBy(Subscription, { id });
    if (!subscription) {
      throw new Error('Subscription not found');
    }
    subscription.status = 'CANCELLED'; // Mettre à jour le statut à CANCELLED
    await this.dataSource.manager.save(subscription);
  }

  // Ajoutez d'autres méthodes selon vos besoins
}