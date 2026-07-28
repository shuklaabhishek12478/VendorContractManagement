import {
  Injectable,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private readonly STORAGE_KEY = 'sidebar-collapsed';

  readonly collapsed = signal(false);

  readonly mobileSidebar = signal(false);

  readonly mobile = signal(false);

  constructor() {

    this.restoreState();

    this.updateScreen();

    window.addEventListener(
      'resize',
      () => this.updateScreen()
    );

     const saved =
    localStorage.getItem('sidebar-collapsed');

  if (saved !== null) {

    this.collapsed.set(saved === 'true');

  }

  this.updateScreen();

  window.addEventListener(
    'resize',
    () => this.updateScreen()
  );


  }

  toggleSidebar(): void {

  if (this.mobile()) {

    this.mobileSidebar.update(v => !v);

    return;

  }

  const value = !this.collapsed();

  this.collapsed.set(value);

  localStorage.setItem(
    'sidebar-collapsed',
    value.toString()
  );

}

  collapse(): void {

    this.collapsed.set(true);

    this.saveState();

  }

  expand(): void {

    this.collapsed.set(false);

    this.saveState();

  }

  toggleCollapse(): void {

    this.collapsed.update(v => !v);

    this.saveState();

  }

  openSidebar(): void {

    this.mobileSidebar.set(true);

  }

  closeSidebar(): void {

    this.mobileSidebar.set(false);

  }

  private updateScreen(): void {

    const mobile = window.innerWidth < 1024;

    this.mobile.set(mobile);

    if (!mobile) {

      this.mobileSidebar.set(false);

    }

  }

  private saveState(): void {

    localStorage.setItem(
      this.STORAGE_KEY,
      this.collapsed().toString()
    );

  }

  private restoreState(): void {

    const value = localStorage.getItem(
      this.STORAGE_KEY
    );

    if (value !== null) {

      this.collapsed.set(
        value === 'true'
      );

    }

  }

}