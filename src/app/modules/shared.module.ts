import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

const sharedModules = [FlexLayoutModule, MaterialModule];

@NgModule({
  imports: [...sharedModules],
  exports: [...sharedModules],
})
export class SharedModule {}
