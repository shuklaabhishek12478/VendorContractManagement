import { Component, inject, Input } from '@angular/core';
import { StatsCardComponent } from '../../components/stats-card/stats-card';
import { DashboardHeaderComponent } from '../../components/dashboard-header/dashboard-header';
import { CommonModule } from '@angular/common';
import { ContractOverviewChartComponent } from '../../components/charts/contract-overview-chart/contract-overview-chart';
import { VendorDistributionChartComponent } from '../../components/charts/vendor-distribution-chart/vendor-distribution-chart';
import { RecentActivityService } from '../../../../core/services/recent-activity.service';
import { RecentActivity } from '../../../../core/models/recent-activity.model';
import { RecentActivityComponent }
from '../../components/recent-activity/recent-activity';

import { PendingApprovalsComponent } from '../../components/pending-approvals/pending-approvals';

import { ExpiringContractsComponent } from '../../components/expiring-contracts/expiring-contracts';
import { ExpenditureSummaryComponent } from '../../components/expenditure-summary/expenditure-summary';
import { ExpenditureTrendChartComponent } from '../../components/expenditure-trend-chart/expenditure-trend-chart';
import { VendorSpendChartComponent } from '../../components/vendor-spend-chart/vendor-spend-chart';
import { DepartmentSpendChartComponent } from '../../components/department-spend-chart/department-spend-chart';
import { BudgetHealthCardComponent } from '../../components/budget-health-card/budget-health-card';
import { DashboardNotification, NotificationsComponent } from '../../components/notifications/notifications';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions';
import { SystemHealthComponent } from '../../components/system-health/system-health';
import { ContractStatusChartComponent } from '../../components/contract-status-chart/contract-status-chart';
import { BudgetForecastCardComponent } from '../../components/budget-forecast-card/budget-forecast-card';
import { AIInsight, AiInsightsComponent } from '../../components/ai-insights/ai-insights';
import { UpcomingEvent, UpcomingEventsComponent } from '../../components/upcoming-events/upcoming-events';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [
    CommonModule,
    StatsCardComponent,
    DashboardHeaderComponent,
    ContractOverviewChartComponent,
    VendorDistributionChartComponent,
    RecentActivityComponent,
   NotificationsComponent,
    PendingApprovalsComponent,
    ExpiringContractsComponent,
    ExpenditureSummaryComponent,
    ExpenditureTrendChartComponent,
    VendorSpendChartComponent,
    DepartmentSpendChartComponent,
    BudgetHealthCardComponent,
    QuickActionsComponent,
    SystemHealthComponent,
    ContractStatusChartComponent,
    BudgetForecastCardComponent,
    AiInsightsComponent,
    UpcomingEventsComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
   private recentActivityService = inject(RecentActivityService);
 @Input()
labels:string[]=[]
   activities: RecentActivity[] = [];
   currentSpend=8200000;

forecastSpend=10500000;
budget = 5000000;



spent=16800000;

   cards = [

{
title:'Total Vendors',
value:'125',
icon:'business',
color:'#2563eb',
trend:'+12%'
},

{
title:'Active Contracts',
value:'42',
icon:'description',
color:'#16a34a',
trend:'+5%'
},

{
title:'Pending Approval',
value:'8',
icon:'pending_actions',
color:'#f59e0b',
trend:'Needs Attention'
},

{
title:'Expired',
value:'3',
icon:'warning',
color:'#ef4444',
trend:'-1'
}

];
  router: any;

ngOnInit(): void {

  this.loadActivities();

}
private loadActivities(): void {

  this.recentActivityService

      .getRecentActivities()

      .subscribe({

          next: data => {

              this.activities = data;

          }

      });

}

notifications: DashboardNotification[] = [

{

id:1,

title:'',

message:'',

type:'success',

time:'',

unread:true

}

];

pendingApprovals=[

{

id:1,

contractNumber:'CNT-2026-0014',

vendorName:'ABC Technologies',

submittedOn:'Today',

contractValue:450000

},

{

id:2,

contractNumber:'CNT-2026-0015',

vendorName:'XYZ Pvt Ltd',

submittedOn:'Yesterday',

contractValue:980000

}

];

approve(id:number){

console.log(id);

}

reject(id:number){

console.log(id);

}

expiringContracts=[

{

id:1,

contractNumber:'CNT-2026-0007',

vendorName:'ABC Technologies',

endDate:'15 Jul 2026',

daysLeft:3,

contractValue:800000

},

{

id:2,

contractNumber:'CNT-2026-0008',

vendorName:'Infosoft',

endDate:'29 Jul 2026',

daysLeft:18,

contractValue:1250000

}

];

renewContract(id:number){

console.log(id);

}

openContract(id:number){

console.log(id);

}

actual=[

8,

10,

12,

9,

13,

15,

18,

17,

19,

22,

23,

25

].map(x=>x*100000);

forecast=[

8,

10,

12,

13,

15,

17,

20,

22,

24,

26,

28,

30

].map(x=>x*100000);


vendorNames=[

'ABC Technologies',

'Infosys',

'TCS',

'Microsoft',

'Oracle',

'IBM',

'Adobe'

];

vendorSpend=[

1500000,

1200000,

980000,

860000,

720000,

650000,

540000

];

departmentLabels=[

'IT',

'Operations',

'Finance',

'HR',

'Marketing',

'Legal'

];

departmentSpend=[

4200000,

2700000,

1800000,

1200000,

950000,

700000

];


handleQuickAction(action: string): void {

  switch (action) {

    case 'vendor':
      this.router.navigate(['/vendors/add']);
      break;

    case 'contract':
      this.router.navigate(['/contracts/add']);
      break;

    case 'document':
      this.router.navigate(['/documents']);
      break;

    case 'reports':
      this.router.navigate(['/reports']);
      break;

    case 'users':
      this.router.navigate(['/users']);
      break;

    case 'settings':
      this.router.navigate(['/settings']);
      break;

  }

}

statusLabels = [
  'Draft',
  'Pending',
  'Approved',
  'Active',
  'Expired',
  'Renewed'
];

statusValues = [
  6,
  4,
  12,
  18,
  5,
  3
];


insights: AIInsight[] = [

{

icon:'📄',

title:'Contracts Expiring',

message:'5 contracts will expire within the next 15 days.',

severity:'warning'

},

{

icon:'💰',

title:'Budget Forecast',

message:'Forecast shows 84% budget utilization this month.',

severity:'info'

},

{

icon:'⚠️',

title:'Pending Approvals',

message:'3 contracts are waiting for approval for more than 7 days.',

severity:'danger'

},

{

icon:'📈',

title:'Vendor Growth',

message:'Vendor onboarding increased by 18% compared to last month.',

severity:'success'

}

];


events:UpcomingEvent[]=[

{

id:1,

title:'ABC Contract Expiry',

date:'15 Jul 2026',

type:'Contract Expiry'

},

{

id:2,

title:'XYZ Renewal Meeting',

date:'18 Jul 2026',

type:'Renewal'

},

{

id:3,

title:'Finance Budget Review',

date:'22 Jul 2026',

type:'Budget Review'

},

{

id:4,

title:'Vendor Audit',

date:'25 Jul 2026',

type:'Compliance'

}

];
}
