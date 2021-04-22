import { Directive, ElementRef, Input, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { AppOptionsService } from '@services/appOptions.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SiteTextKeys } from '@app/core/constants/siteTextKeys';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[siteTextForKey]'
})
export class SiteTextForKeyDirective implements OnInit, OnDestroy {

  @Input() siteTextForKey: SiteTextKeys;
  private subscription: Subscription;

  constructor(
    private optionsService: AppOptionsService,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.subscription = this.optionsService.getSiteTextForKey(this.siteTextForKey)
      .subscribe((text: string): void => {
        this.elementRef.nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, text);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
