import { Injectable } from '@angular/core';
import { PermissionGroup } from '../../models/permission-matrix.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionHeatmapService {

  calculate(
    groups: PermissionGroup[]
  ): Map<string, string> {

    const heatmap = new Map<string, string>();
        groups.forEach(group => {

      const total = group.permissions.length;

      const assigned =
        group.permissions.filter(
          x => x.assigned
        ).length;

      const percent =
        total === 0
          ? 0
          : (assigned / total) * 100;

      let color = '#22C55E';

      if (percent >= 90) {

        color = '#DC2626';

      }

      else if (percent >= 70) {

        color = '#F97316';

      }

      else if (percent >= 40) {

        color = '#FACC15';

      }

      else if (percent >= 20) {

        color = '#84CC16';

      }

      heatmap.set(
        group.module,
        color
      );

    });
        return heatmap;

  }

  getHeatColor(
    heatmap: Map<string, string>,
    module: string
  ): string {

    return heatmap.get(module) ?? '#22C55E';

  }

}