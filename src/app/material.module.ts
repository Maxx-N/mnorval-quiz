import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';

const materialModules = [ MatRadioModule];

@NgModule({
  declarations: [],
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MaterialModule {}
