import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
// import { FileSizePipe } from './file-size.pipe';
// import { FilterPipe } from './filter.pipe';
import { PaddingLeftPipe } from './padding-left.pipe';
// import { StringTimePipe } from './string-time.pipe';
// import { SumPipe } from './sum.pipe';

@NgModule({
  declarations: [
    // FileSizePipe,
    // FilterPipe,
    // StringTimePipe,
    // SumPipe,
    PaddingLeftPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // FileSizePipe,
    // FilterPipe,
    // StringTimePipe,
    // SumPipe,
    PaddingLeftPipe

  ]
})
export class CustomPipesModule { }
