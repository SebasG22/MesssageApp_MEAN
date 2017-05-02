import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";


import { AppComponent } from "./app.component";
import { AuthenthicationComponent } from "./auth/authenthication.component";
import { HeaderComponent } from "./header/header.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "../errors/errors.component";
import { ErrorService } from "../errors/errors.service";
import { MessageModule } from "./messages/message.module";

@NgModule({
    declarations: [
        AppComponent,
        AuthenthicationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [BrowserModule,
     routing, 
     HttpModule,
     MessageModule],
    bootstrap: [AppComponent],
    providers:[AuthService, ErrorService]
})
export class AppModule {

}