import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuickAction {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  action: string;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-actions.html',
  styleUrls: ['./quick-actions.scss']
})
export class QuickActionsComponent {

  @Output() action = new EventEmitter<string>();

  actions: QuickAction[] = [

    {
      title: 'Add Vendor',
      subtitle: 'Register new vendor',
      icon: '🏢',
      color: 'blue',
      action: 'vendor'
    },

    {
      title: 'New Contract',
      subtitle: 'Create contract',
      icon: '📄',
      color: 'green',
      action: 'contract'
    },

    {
      title: 'Upload Document',
      subtitle: 'Attach files',
      icon: '📁',
      color: 'orange',
      action: 'document'
    },

    {
      title: 'Reports',
      subtitle: 'Analytics',
      icon: '📊',
      color: 'purple',
      action: 'reports'
    },

    {
      title: 'Users',
      subtitle: 'Manage users',
      icon: '👥',
      color: 'red',
      action: 'users'
    },

    {
      title: 'Settings',
      subtitle: 'Application settings',
      icon: '⚙️',
      color: 'gray',
      action: 'settings'
    }

  ];

  execute(action: string) {
    this.action.emit(action);
  }

}