import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Public } from '@libs/decorators';
import { SubscriptionsService } from '../services';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '../dto';
import { Subscription } from '../entities/subscription.entity';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) { }
  // TODO : @UseGuards(AdminGuard)
  @Public()
  @Get()
  async findAll(): Promise<Subscription[]> {
    return this.subscriptionsService.findAll();
  }

  @Public()
  @Get('user/:userId')
  async findSubscriptionsByUserId(@Param('userId') userId: number): Promise<Subscription[]> {
    return this.subscriptionsService.findSubscriptionsByUserId(userId);
  }

  @Public()
  @Post()
  async create(@Body() dto: CreateSubscriptionDto) {
    return this.subscriptionsService.createSubscription(dto);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateSubscriptionDto) {
    return this.subscriptionsService.updateSubscription(id, dto);
  }

  @Public()
  @Delete(':id')
  async cancel(@Param('id') id: number) {
    return this.subscriptionsService.cancelSubscription(id);
  }

  // Ajoutez d'autres points de terminaison selon vos besoins
}