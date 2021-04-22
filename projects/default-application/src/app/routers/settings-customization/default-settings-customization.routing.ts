import { CustomizationComponent } from '@app/modules/customization/components/customization.component';
import { SchemeListComponent } from '@app/modules/customization/components/scheme-list/scheme-list.component';
import { EditColorSchemeComponent } from '@app/modules/customization/components/edit-color-scheme/edit-color-scheme.component';
import { LogoComponent } from '@app/modules/customization/components/logo/logo.component';
import { SiteTextComponent } from '@app/modules/customization/components/site-text/site-text.component';
import { ColorSchemesResolver } from '@app/modules/customization/resolvers/colorSchemes.resolver';
import { ColorSchemeResolver } from '@app/modules/customization/resolvers/colorScheme.resolver';
import { SiteTextsResolver } from '@app/modules/customization/resolvers/siteTexts.resolver';
import { LogoSettingsResolver } from '@app/modules/customization/resolvers/logoSettings.resolver';
import { GdprComponent } from '@app/modules/customization/components/gdpr/gdpr.component';

export const DefaultSettingsCustomizationRouting = [

  {
    path: '',
    component: CustomizationComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'color-schemes',
      },
      {
        path: 'color-schemes',
        component: SchemeListComponent,
        data: {
          showTabs: true,
          showTopTabs: true
        },
        resolve: {
          schemes: ColorSchemesResolver
        }
      },
      {
        path: 'color-schemes/new',
        component: EditColorSchemeComponent,
      },
      {
        path: 'color-schemes/:id',
        component: EditColorSchemeComponent,
        resolve: {
          scheme: ColorSchemeResolver
        }
      },
      {
        path: 'logo',
        component: LogoComponent,
        data: {
          showTabs: true,
          showTopTabs: true
        },
        resolve: {
          settings: LogoSettingsResolver
        }
      },
      {
        path: 'site-text',
        component: SiteTextComponent,
        data: {
          showTabs: true,
          showTopTabs: true
        },
        resolve: {
          texts: SiteTextsResolver
        }
      },
      {
        path: 'gdpr-text',
        component: GdprComponent,
        data: {
          showTabs: true,
          showTopTabs: true
        },
        resolve: {
          gdprText: SiteTextsResolver
        }
      }
    ]
  },
];
