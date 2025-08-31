import {Component, OnInit} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { DecimalPipe } from '@angular/common';
import {SubscriptionTypeService} from '../../../core/services/subscription-type.service';
import {SubscriptionTypeDto} from '../../../models/subscription-type-dto';
import {AcademySubscriptionModalComponent} from './academy-subscription-modal/academy-subscription-modal.component';
import {MatDialog} from '@angular/material/dialog';

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number,
  annualPrice: number,
  features: string[],
}

@Component({
  selector: 'app-academy-subscription',
  imports: [
    MatButton,
    DecimalPipe],
  templateUrl: './academy-subscription.component.html',
  styleUrl: './academy-subscription.component.scss'
})
export class AcademySubscriptionComponent implements OnInit {
  subscriptions: SubscriptionTypeDto[] | undefined = [];

  constructor(private subscriptionService : SubscriptionTypeService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptionTypes().subscribe({
      next: (data) => {
        this.subscriptions = data.data;
      },
      error: (err) => {
        console.error('Error al obtener suscripciones', err);
      }
    });
  }

  openDialog(data: SubscriptionTypeDto): void {
    this.dialog.open(AcademySubscriptionModalComponent, {
      width: '600px',
      data: { data },
    });
  }
}
