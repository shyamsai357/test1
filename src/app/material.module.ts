import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
   imports: [
      MatToolbarModule,
      MatCardModule,
      MatFormFieldModule,
      MatIconModule,
      MatTooltipModule,
      MatSelectModule,
      MatInputModule,
      MatButtonModule,
      MatRadioModule
   ],
   exports: [
      MatToolbarModule,
      MatCardModule,
      MatFormFieldModule,
      MatIconModule,
      MatTooltipModule,
      MatSelectModule,
      MatInputModule,
      MatButtonModule,
      MatRadioModule
   ],
   providers: []
})

export class AngularMaterialModule { }