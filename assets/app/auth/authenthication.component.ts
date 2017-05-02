import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
    selector:'app-authenthication',
    templateUrl:"./authenthication.component.html"
})

export class AuthenthicationComponent {
    constructor(private authService: AuthService){}

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }
}