import { Injectable } from '@angular/core';
import { PermissionGroup } from '../../models/permission-matrix.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionScrollService {

  updateModuleCompletion(
    groups: PermissionGroup[]
  ): Map<string, number> {

    const completion = new Map<string, number>();

    groups.forEach(group => {

      const total = group.permissions.length;

      const assigned =
        group.permissions.filter(x => x.assigned).length;

      const percent =
        total === 0
          ? 0
          : Math.round((assigned / total) * 100);

      completion.set(group.module, percent);

    });

    return completion;

  }

  getModuleProgress(
    moduleCompletion: Map<string, number>,
    module: string
  ): number {

    return moduleCompletion.get(module) ?? 0;

  }

  getModuleHeatClass(progress: number): string {

    if (progress >= 80) {

      return 'heat-high';

    }

    if (progress >= 40) {

      return 'heat-medium';

    }

    return 'heat-low';

  }

  scrollToModule(module: string): void {

    if (!module) {

      return;

    }

    const element = document.getElementById(
      'module-' + module
    );

    if (!element) {

      return;

    }

    element.scrollIntoView({

      behavior: 'smooth',

      block: 'start'

    });

  }

  getActiveModule(
    groups: PermissionGroup[]
  ): string {

    for (const group of groups) {

      const element = document.getElementById(
        'module-' + group.module
      );

      if (!element) {

        continue;

      }

      const rect = element.getBoundingClientRect();

      if (rect.top < 180 && rect.bottom > 180) {

        return group.module;

      }

    }

    return '';

  }

}