import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PermissionService } from '../services/permission';

@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective
  implements OnInit, OnDestroy {

  private readonly templateRef =
    inject(TemplateRef<unknown>);

  private readonly viewContainer =
    inject(ViewContainerRef);

  private readonly permissionService =
    inject(PermissionService);

  private readonly destroy$ =
    new Subject<void>();

  private hasView = false;

  @Input()
  appHasPermission!: string;


  ngOnInit(): void {

    this.updateView();

    this.permissionService.permissions$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {

        this.updateView();

      });
  }


  private updateView(): void {

    const hasPermission =
      this.permissionService.hasPermission(
        this.appHasPermission
      );


    if (hasPermission && !this.hasView) {

      this.viewContainer.createEmbeddedView(
        this.templateRef
      );

      this.hasView = true;

    }
    else if (!hasPermission && this.hasView) {

      this.viewContainer.clear();

      this.hasView = false;

    }
  }


  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();

  }
}