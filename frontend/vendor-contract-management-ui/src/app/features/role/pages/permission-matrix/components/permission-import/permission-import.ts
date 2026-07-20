import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RoleService } from '../../../../../../core/services/role.service';

@Component({
  selector: 'app-permission-import',
  imports: [
    CommonModule,
RouterModule,
MatCardModule,
MatButtonModule,
MatIconModule
  ],
  templateUrl: './permission-import.html',
  styleUrl: './permission-import.scss',
})
export class PermissionImportComponent {

  selectedFile?: File;

roleId = 0;
  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
     private cdr: ChangeDetectorRef

){}

ngOnInit(): void {

    this.roleId = Number(

        this.route.snapshot.paramMap.get('id')
         
    );
this.cdr.detectChanges();
}

onFileSelected(event:any){

    if(event.target.files.length){

        this.selectedFile = event.target.files[0];

    }

}

upload(){

    if(!this.selectedFile){

        return;

    }

    this.roleService

        .importPermissions(

            this.roleId,

            this.selectedFile

        )

        .subscribe({

            next:()=>{

              this.selectedFile = undefined;

                this.snackBar.open(

                    'Permission Matrix imported successfully.',

                    'Close',

                    {

                        duration:3000

                    }

                );
                 this.router.navigate([
        '/roles',
        this.roleId,
        'permission-matrix'
    ]);
                this.cdr.detectChanges();
            },

            error:()=>{

                this.snackBar.open(

                    'Import failed.',

                    'Close',

                    {

                        duration:3000

                    }

                );

            }

        });

}
}
