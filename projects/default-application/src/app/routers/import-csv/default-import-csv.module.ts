import { NgModule } from '@angular/core';
import { ImportCsvModule } from '@lib/modules/import-csv/import-csv.module';
import { DefaultImportCsvRouting } from '@default-application-app/routers/import-csv/default-import-csv.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ImportCsvModule,
    RouterModule.forChild(DefaultImportCsvRouting),
  ]
})

export class DefaultImportCsvModule {
}
