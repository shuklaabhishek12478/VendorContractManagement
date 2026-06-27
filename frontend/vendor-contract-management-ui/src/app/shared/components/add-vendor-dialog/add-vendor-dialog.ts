import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-vendor-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './add-vendor-dialog.html',
  styleUrl: './add-vendor-dialog.scss'
})
export class AddVendorDialog {
 
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddVendorDialog>);

  data = inject(MAT_DIALOG_DATA, {
  optional: true
});


  vendorForm = this.fb.group({
    vendorName: ['', Validators.required],
    companyName: ['', Validators.required],
    gstNumber: ['', Validators.required],
    panNumber: ['', Validators.required],
    contactPerson: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required]
  });


  close(): void {
  this.dialogRef.close();
}

save(): void {

  if (this.vendorForm.invalid) {
    this.vendorForm.markAllAsTouched();
    return;
  }

  this.dialogRef.close(
    this.vendorForm.value
  );
}

ngOnInit(): void {

  if (!this.data) {
    return;
  }

  this.vendorForm.patchValue({
    vendorName: this.data.vendorName,
    companyName: this.data.companyName,
    gstNumber: this.data.gstNumber,
    panNumber: this.data.panNumber,
    contactPerson: this.data.contactPerson,
    email: this.data.email,
    phone: this.data.phone,
    address: this.data.address
  });
}
}