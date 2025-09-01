import {MediaFileDto} from './media-file-dto';

export interface SubscriptionDto {
  subscriptionTypeId: number;
  mediaFile: MediaFileDto;
}
