import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatNativeDateModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatDialogModule,  MatFormFieldModule, MatStepperModule, MatInputModule, MatIconModule, MatDividerModule, MatTooltipModule, MatTabsModule, MatCardModule, MatMenuModule, MatSidenavModule, MatSnackBarModule, MatListModule, MatBadgeModule, MatChipsModule, MatExpansionModule, MatTreeModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatTableModule, MatBottomSheetModule, MatProgressSpinnerModule, MatRadioModule, MatSlideToggleModule, MatPaginatorModule, MatSortModule ],
  
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatDialogModule,  MatFormFieldModule, MatStepperModule, MatInputModule, MatIconModule, MatDividerModule, MatTooltipModule, MatTabsModule, MatCardModule, MatMenuModule, MatSidenavModule, MatSnackBarModule, MatListModule, MatBadgeModule, MatChipsModule, MatExpansionModule, MatTreeModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatTableModule, MatBottomSheetModule, MatProgressSpinnerModule, MatRadioModule, MatSlideToggleModule, MatPaginatorModule, MatSortModule ],
  providers: [ MatDatepickerModule ]
})
export class MaterialModule { }