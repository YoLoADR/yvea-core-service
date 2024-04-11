import { ApiProperty } from '@nestjs/swagger';
import { Subscription } from '../entities';

export class SubscriptionDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @ApiProperty()
    trialEndDate: Date;

    @ApiProperty()
    status: string;

    @ApiProperty()
    pluginId: number;

    constructor(subscription: Subscription) {
        this.id = subscription.id;
        this.startDate = subscription.startDate;
        this.endDate = subscription.endDate;
        this.trialEndDate = subscription.trialEndDate;
        this.status = subscription.status;
        this.pluginId = subscription.pluginId;
    }
}