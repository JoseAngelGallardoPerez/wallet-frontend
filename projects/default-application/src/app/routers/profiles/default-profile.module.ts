import { NgModule } from '@angular/core';
import { ProfilesModule } from '@lib/modules/profiles/profiles.module';
import { DefaultProfileRouting } from '@default-application-app/routers/profiles/default-profile.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ProfilesModule,
    RouterModule.forChild(DefaultProfileRouting),
  ]
})
export class DefaultProfileModule {
}
