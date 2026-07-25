import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-expenditure-actions-renderer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './expenditure-actions-renderer.html',
  styleUrl: './expenditure-actions-renderer.scss'
})
export class ExpenditureActionsRenderer
  implements ICellRendererAngularComp {

  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  view(): void {
    this.params.context.componentParent
      .openDetails(this.params.data.id);
  }

  edit(): void {
    this.params.context.componentParent
      .openEditPage(this.params.data.id);
  }

  delete(): void {
    this.params.context.componentParent
      .deleteExpenditure(this.params.data.id);
  }

  markAsPaid(): void {
    this.params.context.componentParent
      .markAsPaid(this.params.data.id);
  }

}