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
    // subscription.status = 'TRIAL'; // Le statut est défini sur 'TRIAL' par défaut
    subscription.status = dto.status;
    if(dto.status === 'TRIAL'){
      subscription.trialEndDate = new Date(Date.now() + 48 * 60 * 60 * 1000); // Ajoutez 48 heures pour la fin de la période d'essai
      // mettre un nombre de token pour la période d'essai
      // trial_token_limit
    }
    if(dto.status === 'ACTIVE'){
      subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Ajoutez 30 jours pour la fin de l'abonnement
      // Ou un an après la date de début de l'abonnement
      // subscription.endDate = new Date(subscription.startDate.getTime() + 365 * 24 * 60 * 60 * 1000);
      // mettre un nombre de token pour l'abonnement
      // monthly_token_limit
    }


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