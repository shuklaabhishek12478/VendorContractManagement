import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { RoleService } from '../../../../../../core/services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-permission-export',

    standalone: true,

    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule
    ],

    templateUrl: './permission-export.html',

    styleUrl: './permission-export.scss'
})
export class PermissionExportComponent {


  roleId = 0;

exporting = false;

  constructor(

    private roleService: RoleService,
private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef

) {

}

ngOnInit(): void {

    this.roleId = Number(

        this.route.snapshot.paramMap.get('id')

    );

}

exportExcel(): void {

    this.exporting = true;

    this.roleService
        .exportPermissions(this.roleId)
        .subscribe({

            next: (blob) => {

                try {

                    const downloadURL = window.URL.createObjectURL(blob);

                    const link = document.createElement('a');

                    link.href = downloadURL;

                    link.download = `Role_${this.roleId}_Permissions.xlsx`;

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);

                    window.URL.revokeObjectURL(downloadURL);

                    this.snackBar.open(
                        'Permission Matrix exported successfully.',
                        'Close',
                        {
                            duration: 3000
                        });

                }
                finally {

                    this.exporting = false;
this.cdr.detectChanges();

                }
                console.log("Download completed");



    console.log(this.exporting);

            },

            error: () => {

                this.exporting = false;

                this.snackBar.open(
                    'Export failed.',
                    'Close',
                    {
                        duration: 3000
                    });

            }

        });

}

exportCsv() {

    this.download(

        this.roleService.exportPermissionsCsv(this.roleId),

        `Role_${this.roleId}_Permissions.csv`

    );

}

exportJson() {

    this.download(

        this.roleService.exportPermissionsJson(this.roleId),

        `Role_${this.roleId}_Permissions.json`

    );

}

private download(

    request:any,

    fileName:string

){

    this.exporting=true;

    request.subscribe({

        next:(blob:any)=>{

            const url=

                window.URL.createObjectURL(blob);

            const a=

                document.createElement('a');

            a.href=url;

            a.download=fileName;

            a.click();

            window.URL.revokeObjectURL(url);
             this.snackBar.open(
                        'Permission Matrix exported successfully.',
                        'Close',
                        {
                            duration: 3000
                        });
            this.exporting=false;
                            
this.cdr.detectChanges();

        },

        error:()=>{

            this.exporting=false;
             this.snackBar.open(
                    'Export failed.',
                    'Close',
                    {
                        duration: 3000
                    });
this.cdr.detectChanges();
        }

    });

}
}