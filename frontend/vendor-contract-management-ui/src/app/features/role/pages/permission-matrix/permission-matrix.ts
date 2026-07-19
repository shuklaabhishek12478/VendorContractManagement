import { ChangeDetectorRef, Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RoleService }
from '../../../../core/services/role.service';
import { PermissionAnalyticsResult, PermissionChangeResult, PermissionGroup } from '../../../../core/models/permission-matrix.model';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../../../core/models/role.model';
import { PermissionToolbarComponent } from './components/permission-toolbar/permission-toolbar';
import { PermissionSidebarComponent } from './components/permission-sidebar/permission-sidebar';
import { PermissionModuleComponent } from './components/permission-module/permission-module';
import { PermissionStatisticsComponent } from './components/permission-statistics/permission-statistics';
import { PermissionSummaryComponent } from './components/permission-summary/permission-summary';
import { PermissionChangePreviewComponent } from './components/permission-change-preview/permission-change-preview';
import { PermissionStickySaveComponent } from './components/permission-sticky-save/permission-sticky-save';
import { PermissionRoleCompareComponent } from './components/permission-role-compare/permission-role-compare';
import { PermissionTemplateComponent } from './components/permission-template/permission-template';
import { PermissionFooterComponent } from './components/permission-footer/permission-footer';
import { PermissionAnalyticsComponent } from './components/permission-analytics/permission-analytics';
import { PermissionInsightsComponent } from './components/permission-insights/permission-insights';
import { PermissionAuditTimelineComponent } from './components/permission-audit-timeline/permission-audit-timeline';
import { PermissionRiskScoreComponent } from './components/permission-risk-score/permission-risk-score';
import { PermissionDependencyGraphComponent } from './components/permission-dependency-graph/permission-dependency-graph';
import { PermissionSecurityRecommendationsComponent } from './components/permission-security-recommendations/permission-security-recommendations';

import { PermissionTemplateService } from '../../../../core/services/permission-matrix/permission-template.service';
import { PermissionChangeTrackerService } from '../../../../core/services/permission-matrix/permission-change-tracker.service';
import { PermissionFilterService } from '../../../../core/services/permission-matrix/permission-filter.service';
import { PermissionScrollService } from '../../../../core/services/permission-matrix/permission-scroll.service';
import { PermissionCompareService } from '../../../../core/services/permission-matrix/permission-compare.service';
import { PermissionAnalyticsService } from '../../../../core/services/permission-matrix/permission-analytics.service';
import { PermissionInsightsService } from '../../../../core/services/permission-matrix/permission-insights.service';
import { PermissionRecommendationService } from '../../../../core/services/permission-matrix/permission-recommendation.service';
import { PermissionRiskService } from '../../../../core/services/permission-matrix/permission-risk.service';
import { PermissionHeatmapService } from '../../../../core/services/permission-matrix/permission-heatmap.service';
import { PermissionHeaderComponent } from './components/permission-header/permission-header';
@Component({
selector:'app-permission-matrix',
standalone:true,
imports:[
  CommonModule,
  FormsModule,
  RouterModule,
  MatSelectModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSnackBarModule,
  PermissionToolbarComponent,
  PermissionSidebarComponent,
  PermissionModuleComponent,
  PermissionStatisticsComponent,
  PermissionSummaryComponent,
  PermissionChangePreviewComponent,
  PermissionStickySaveComponent,
  PermissionRoleCompareComponent,
  PermissionTemplateComponent,
  PermissionFooterComponent,
  PermissionAnalyticsComponent,
  PermissionInsightsComponent,
  PermissionAuditTimelineComponent,
  PermissionRiskScoreComponent,
  PermissionDependencyGraphComponent,
  PermissionSecurityRecommendationsComponent,
  PermissionHeaderComponent,
  PermissionToolbarComponent,
  PermissionSidebarComponent,
],
templateUrl:'./permission-matrix.html',
styleUrl:'./permission-matrix.scss'
})
export class PermissionMatrixComponent implements OnInit, OnDestroy {

loading=true;
search = '';
selectedModule = '';
compareRoleId = 0;
compareLoading = false;
comparePermissions: string[] = [];
roles: Role[] = [];
expanded = true;
activeModule = '';
private scrollHandler = () => this.onScroll();
moduleCompletion = new Map<string, number>();
moduleHeatmap = new Map<string, string>();
roleId=0;
saving = false;
hasChanges = false;
addedPermissions = 0;
removedPermissions = 0;
addedPermissionNames: string[] = [];
removedPermissionNames: string[] = [];
private originalPermissionIds:number[]=[];
assignedPermissions = 0;
totalPermissions = 0;
moduleIds: string[] = [];
groups:PermissionGroup[]=[];
filteredGroups:PermissionGroup[]=[];
assignmentRate = 0;
viewPermissions = 0;
createPermissions = 0;
editPermissions = 0;
deletePermissions = 0;
approvePermissions = 0;
highRiskPermissions = 0;
riskScore = 0;
riskLevel = '';
riskColor = '#16A34A';
highestModule = '';
highestModulePercent = 0;
lowestModule = '';
lowestModulePercent = 100;
riskyModule = '';
riskyModuleCount = 0;
recommendations: string[] = [];
auditTimeline = [
    {
        icon: 'add_circle',
        color: 'primary',
        title: 'Vendor.Create assigned',
        time: 'Just now'
    },
    {
        icon: 'remove_circle',
        color: 'warn',
        title: 'Contract.Delete removed',
        time: '5 minutes ago'
    },
    {
        icon: 'verified',
        color: 'accent',
        title: 'Approval permission granted',
        time: 'Yesterday'
    },
    {
        icon: 'history',
        color: 'primary',
        title: 'Permission matrix loaded',
        time: 'Today'
    }
];
deletePermissionCount=0;
approvePermissionCount = 0;
permissionGraph = [
  {
    from: 'View',
    to: 'Create'
  },
  {
    from: 'View',
    to: 'Edit'
  },
  {
    from: 'Edit',
    to: 'Delete'
  },
  {
    from: 'View',
    to: 'Approve'
  },
  {
    from: 'View',
    to: 'Export'
  },
  {
    from: 'View',
    to: 'Import'
  }
];

analytics!: PermissionAnalyticsResult;

changeResult!: PermissionChangeResult;


constructor(

private route: ActivatedRoute,

private router: Router,

private roleService: RoleService,

private snackBar: MatSnackBar,

private cdr: ChangeDetectorRef,

private analyticsService: PermissionAnalyticsService,

private templateService: PermissionTemplateService,

private changeTracker: PermissionChangeTrackerService,

private filterService: PermissionFilterService,

private scrollService: PermissionScrollService,

private compareService: PermissionCompareService,

  private insightsService: PermissionInsightsService,

  private recommendationService: PermissionRecommendationService,

  private riskService: PermissionRiskService,

  private heatmapService: PermissionHeatmapService,

  private changeTrackerService: PermissionChangeTrackerService

){}

ngOnInit():void{

  console.log('loadRoles called');
this.roleId=Number(
this.route.snapshot.paramMap.get('id')
);

this.load();
this.loadRoles();
window.removeEventListener(
    'scroll',
    this.scrollHandler
);

window.addEventListener(
    'scroll',
    this.scrollHandler
);
this.roleId = Number(
    this.route.snapshot.paramMap.get('id')
);
 this.cdr.detectChanges();
console.log('Permission Matrix Loaded');
}

load():void{

this.loading=true;

this.roleService
.getPermissionMatrix(this.roleId)
.subscribe({

next:data=>{

this.groups = data;
this.moduleIds = this.groups.map(x => x.module);
this.filteredGroups = [...data];

this.totalPermissions =
    this.groups.reduce(
        (sum, group) =>
            sum + group.permissions.length,
        0
    );

this.originalPermissionIds =
    this.groups
        .flatMap(g => g.permissions)
        .filter(p => p.assigned)
        .map(p => p.permissionId);

this.assignedPermissions =
    this.originalPermissionIds.length;

this.calculateChanges();
this.changeResult =
    this.changeTracker.calculateChanges(

        this.groups,

        this.originalPermissionIds

    );

this.updateModuleCompletion();
this.updateAnalytics();
this.updateInsights();
this.updateRecommendations();
this.updateRiskScore();
this.updateHeatmap();
this.analytics =
    this.analyticsService.calculate(

        this.groups,

        this.assignedPermissions,

        this.totalPermissions

    );

this.updateAnalytics();
this.hasChanges = false;

this.loading = false;

this.cdr.detectChanges();


},

error:()=>{

this.loading=false;

this.snackBar.open(
'Unable to load permissions.',
'Close',
{
duration:3000
});

this.router.navigate(['/roles']);

}

});

}

loadRoles(): void {

    this.roleService.getAll().subscribe({

        next: roles => {
           console.log('API Roles Response:', roles);
            this.roles = roles.filter(
                x => x.id !== this.roleId
            );
        console.log('Filtered Roles:', this.roles);
        },

        error: () => {

            this.snackBar.open(
                'Unable to load roles.',
                'Close',
                {
                    duration: 3000
                });

        }

    });

}

searchPermission(): void {

  this.filteredGroups =
    this.filterService.searchPermissions(

      this.groups,

      this.search

    );

}

toggleAll(value: boolean): void {

  this.templateService.toggleAll(

    this.groups,

    value

  );

  this.markChanged();

}

save():void{

const ids:number[]=[];

this.groups.forEach(group=>{

group.permissions.forEach(permission=>{

if(permission.assigned){

ids.push(permission.permissionId);

}

});

});

this.saving=true;

this.roleService
.savePermissionMatrix(
this.roleId,
ids
)
.subscribe({

next: () => {

    this.saving = false;

    // Current permissions ko new baseline bana do
    this.originalPermissionIds =
        this.groups
            .flatMap(g => g.permissions)
            .filter(p => p.assigned)
            .map(p => p.permissionId);

    // Counters refresh
    this.assignedPermissions =
        this.originalPermissionIds.length;

    this.calculateChanges();

    this.updateModuleCompletion();

    // Page clean state me aa jaye
    this.hasChanges = false;

    this.snackBar.open(
        'Permission matrix updated successfully.',
        'Close',
        {
            duration: 2500
        });

    // Save ke baad Role List par wapas
    this.router.navigate(['/roles']);

},

error:()=>{

this.saving=false;

this.snackBar.open(
'Unable to update permission matrix.',
'Close',
{
duration:3000
});

}

});

}

/*get totalPermissions():number{

return this.groups.reduce(

(sum,g)=>

sum+g.permissions.length,

0

);

}

get assignedPermissions():number{

let total=0;

this.groups.forEach(g=>{

total+=g.permissions
.filter(x=>x.assigned)
.length;

});

return total;

}*/

expandAll():void{

this.expanded=true;

}

collapseAll():void{

this.expanded=false;

}

markChanged(): void {

    this.hasChanges = true;

    this.validateDependencies();

    this.permissionChanged();

}

applyViewerTemplate(): void {

  this.templateService.applyViewerTemplate(

    this.groups

  );

  this.markChanged();

}

applyEditorTemplate(): void {

  this.templateService.applyEditorTemplate(

    this.groups

  );

  this.markChanged();

}

applyManagerTemplate(): void {

  this.templateService.applyManagerTemplate(

    this.groups

  );

  this.markChanged();

}

applyAdministratorTemplate(): void {

  this.templateService.applyAdministratorTemplate(

    this.groups

  );

  this.markChanged();

}
applyPermissionType(permissionType: string): void {

  this.templateService.applyPermissionType(

    this.groups,

    permissionType

  );

  this.markChanged();

}

validateDependencies(): void {

  this.templateService.validateDependencies(

    this.groups

  );

}



permissionChanged(): void {

    this.hasChanges = true;

    this.assignedPermissions =
        this.groups
            .flatMap(g => g.permissions)
            .filter(p => p.assigned)
            .length;
    this.updateModuleCompletion();
    this.updateAnalytics();
    this.calculateChanges();
    this.updateInsights();
    this.updateRiskScore();

this.calculateChanges();
    this.updateRecommendations();
    this.updateHeatmap();

this.updateAnalytics();
}

filterModule(): void {

    this.filteredGroups =
      this.filterService.filterByModule(

        this.groups,

        this.selectedModule

      );

}

scrollToModule(module: string): void {

    this.scrollService.scrollToModule(module);

}

onScroll(): void {

    if (this.loading) {

        return;

    }

    this.activeModule =

        this.scrollService.getActiveModule(

            this.filteredGroups

        );

    this.cdr.markForCheck();

}

updateModuleCompletion(): void {

    this.moduleCompletion =
        this.scrollService.updateModuleCompletion(
            this.groups
        );

}

getModuleProgress(module: string): number {

    return this.scrollService.getModuleProgress(

        this.moduleCompletion,

        module

    );

}

calculateChanges(): void {

  const result =
    this.changeTrackerService.calculateChanges(

      this.groups,

      this.originalPermissionIds

    );

  this.addedPermissions = result.addedPermissions;

  this.removedPermissions = result.removedPermissions;

  this.addedPermissionNames =
    result.addedPermissionNames;

  this.removedPermissionNames =
    result.removedPermissionNames;

}

ngOnDestroy(): void {

    window.removeEventListener(
        'scroll',
        this.scrollHandler
    );

}

@HostListener('document:keydown', ['$event'])
handleKeyboardShortcut(event: KeyboardEvent): void {

    if (event.ctrlKey && event.key.toLowerCase() === 's') {

        event.preventDefault();

        if (this.hasChanges && !this.saving) {

            this.save();

        }

    }

}
compareRole(roleId?: number): void {

  if (roleId !== undefined) {

    this.compareRoleId = roleId;

  }

  if (!this.compareRoleId) {

    this.comparePermissions = [];

    return;

  }

  this.compareLoading = true;

  this.compareService
    .compareRole(this.compareRoleId)
    .subscribe({

      next: permissions => {

        this.comparePermissions = permissions;

        this.compareLoading = false;

      },

      error: () => {

        this.compareLoading = false;

        this.snackBar.open(
          'Unable to compare role.',
          'Close',
          {
            duration: 3000
          }
        );

      }

    });

}

discardChanges(): void {

    this.loading = true;

this.load();

    this.search = '';

    this.selectedModule = '';

    this.addedPermissions = 0;

    this.removedPermissions = 0;

    this.addedPermissionNames = [];

    this.removedPermissionNames = [];

    this.comparePermissions = [];

    this.hasChanges = false;

    this.snackBar.open(
        'Changes discarded.',
        'Close',
        {
            duration: 2000
        }
    );

}

updateAnalytics(): void {

  const result =
    this.analyticsService.calculate(

      this.groups,

      this.totalPermissions,

      this.assignedPermissions

    );

  this.assignmentRate = result.assignmentRate;

  this.viewPermissions = result.viewPermissions;

  this.createPermissions = result.createPermissions;

  this.editPermissions = result.editPermissions;

  this.deletePermissions = result.deletePermissions;

  this.approvePermissions = result.approvePermissions;

  this.highRiskPermissions = result.highRiskPermissions;

}

getModuleHeatClass(module: string): string {

    return this.scrollService.getModuleHeatClass(

        this.getModuleProgress(module)

    );

}
updateInsights(): void {

  const result =
    this.insightsService.calculate(

      this.groups

    );

  this.highestModule = result.highestModule;

  this.highestModulePercent =
    result.highestModulePercent;

  this.lowestModule =
    result.lowestModule;

  this.lowestModulePercent =
    result.lowestModulePercent;

  this.riskyModule =
    result.riskyModule;

  this.riskyModuleCount =
    result.riskyModuleCount;

}

updateRecommendations(): void {

  this.recommendations =
    this.recommendationService.calculate(

      this.groups,

      this.assignedPermissions,

      this.assignmentRate,

      this.highRiskPermissions

    );

}
updateRiskScore(): void {

  const result =
    this.riskService.calculate(

      this.highRiskPermissions,

      this.deletePermissionCount,

      this.approvePermissionCount,

      this.assignmentRate

    );

  this.riskScore = result.riskScore;

  this.riskLevel = result.riskLevel;

  this.riskColor = result.riskColor;

}
updateHeatmap(): void {

  this.moduleHeatmap =
    this.heatmapService.calculate(

      this.groups

    );

}

getHeatColor(module: string): string {

  return this.heatmapService.getHeatColor(

    this.moduleHeatmap,

    module

  );

}
}