import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { UberTwoSharedModule } from 'app/shared/shared.module';
import { UberTwoCoreModule } from 'app/core/core.module';
import { UberTwoAppRoutingModule } from './app-routing.module';
import { UberTwoHomeModule } from './home/home.module';
import { UberTwoEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    UberTwoSharedModule,
    UberTwoCoreModule,
    UberTwoHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    UberTwoEntityModule,
    UberTwoAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class UberTwoAppModule {}
