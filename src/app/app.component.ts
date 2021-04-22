import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppOptionsService } from '@services/appOptions.service';
import { optionsValuesNames } from '@app/core/constants/optionsPrefixes';
import { AuthService } from '@services/auth/auth.service';
import { Store } from '@ngrx/store';
import * as FromLogout from '@app/reducers/app.reducer';
import * as LogoutActions from '@app/actions/logout.actions';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';
import { ConfigService } from '@app/config.service';
import { TranslateService } from '@ngx-translate/core';
import { VERSION } from '@environments/version'; // import the automatically generated file

@Component({
  selector: 'app-root',
  template: `
    <div #spinner class="spinner">
      <ngx-spinner
        bdColor="rgba(255,255,255,0.8)"
        size="large"
        [color]="mainColor"
        type="ball-clip-rotate"
      ></ngx-spinner>
    </div>
    <simple-notifications></simple-notifications>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('spinner', { static: false }) spinner: ElementRef;

  private faviconId = 'appFavicon';

  public mainColor: string;

  constructor(
    private titleService: Title,
    private appOptionService: AppOptionsService,
    private auth: AuthService,
    private store: Store<FromLogout.LogoutState>,
    private configService: ConfigService,
    private readonly translate: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {
    this.translate.setDefaultLang('en');
    console.log(`Application version is: git-hash=${VERSION.hash}`);
  }

  ngOnInit() {
    // document.documentElement.setAttribute('theme', 'velmie');
    if (this.auth.isAuthenticated()) {
      this.store.dispatch(new LogoutActions.LogIn());
    }
    this.appOptionService.getOptionsValuePipe(optionsValuesNames.DEFAULT_TIMEZONE)
      .subscribe((timeZone: string) => {
        if (timeZone) {
          moment.tz.setDefault(timeZone);
        }
      });
  }

  ngAfterViewInit(): void {
    this.setMainColorForSpinner();
    this.cdr.detectChanges();
  }

  private setMainColorForSpinner() {
    this.mainColor = getComputedStyle(this.spinner.nativeElement).getPropertyValue('color');
  }
}
