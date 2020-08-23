import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

const material = [
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatToolbarModule,
  MatListModule,
  MatDividerModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatDialogModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
