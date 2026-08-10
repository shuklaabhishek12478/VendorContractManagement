import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';

export const expenditureRoutes: Routes = [

 
  {
    path: '',
    canActivate: [permissionGuard],
    data: {
      permission: 'Expenditure.View'
    },
    loadComponent: () =>
      import('./pages/expenditure-list/expenditure-list')
        .then(m => m.ExpenditureListComponent)
  },


  {
    path: 'add',
    canActivate: [permissionGuard],
    data: {
      permission: 'Expenditure.Create'
    },
    loadComponent: () =>
      import('./pages/add-expenditure/add-expenditure')
        .then(m => m.AddExpenditureComponent)
  },

 
  {
    path: 'edit/:id',
    canActivate: [permissionGuard],
    data: {
      permission: 'Expenditure.Edit'
    },
    loadComponent: () =>
      import('./pages/edit-expenditure/edit-expenditure')
        .then(m => m.EditExpenditureComponent)
  },

 
  {
    path: 'dashboard',
    canActivate: [permissionGuard],
    data: {
      permission: 'Expenditure.Dashboard'
    },
    loadComponent: () =>
      import('./pages/expenditure-dashboard/expenditure-dashboard')
        .then(m => m.ExpenditureDashboardComponent)
  },


  {
    path: 'forecast',
    canActivate: [permissionGuard],
    data: {
      permission: 'Expenditure.Forecast'
    },
    loadComponent: () =>
      import('./pages/expenditure-forecast/expenditure-forecast')
        .then(m => m.ExpenditureForecastComponent)
  },

 
  {
    path: ':id',
    canActivate: [permissionGuard],
    data: {
      permission: 'Expenditure.View'
    },
    loadComponent: () =>
      import('./pages/expenditure-details/expenditure-details')
        .then(m => m.ExpenditureDetailsComponent)
  }

];