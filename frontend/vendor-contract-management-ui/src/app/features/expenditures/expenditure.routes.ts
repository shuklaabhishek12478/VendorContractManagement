import { Routes } from '@angular/router';

export const expenditureRoutes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./pages/expenditure-list/expenditure-list')
        .then(m => m.ExpenditureListComponent)
  },

  {
    path: 'add',
    loadComponent: () =>
      import('./pages/add-expenditure/add-expenditure')
        .then(m => m.AddExpenditureComponent)
  },

  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/edit-expenditure/edit-expenditure')
        .then(m => m.EditExpenditureComponent)
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/expenditure-dashboard/expenditure-dashboard')
        .then(m => m.ExpenditureDashboardComponent)
  },

  {
    path: 'forecast',
    loadComponent: () =>
      import('./pages/expenditure-forecast/expenditure-forecast')
        .then(m => m.ExpenditureForecastComponent)
  },

  
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/expenditure-details/expenditure-details')
        .then(m => m.ExpenditureDetailsComponent)
  }

];