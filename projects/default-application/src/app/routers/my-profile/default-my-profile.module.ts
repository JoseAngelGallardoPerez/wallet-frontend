import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultMyProfileRouting } from '@default-routers/my-profile/default-my-profile.routing';
import { MyProfileModule } from '@lib/modules/my-profile/my-profile.module';
import { ProfilesModule } from '@lib/modules/profiles/profiles.module';

@NgModule({
  imports: [
    MyProfileModule,
    ProfilesModule,
    RouterModule.forChild(DefaultMyProfileRouting)
  ]
})
export class DefaultMyProfileModule {
}
