import { NgModule } from '@angular/core';
import { LogoutComponent } from "./logout.component";
import { SigninComponent } from "./signin.component";
import { SignupComponent } from "./signup.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms/";
import { authRouting } from "./auth.routing";


@NgModule({
    imports: [CommonModule
    ,ReactiveFormsModule,
    authRouting],
    exports: [],
    declarations: [LogoutComponent,
        SigninComponent,
        SignupComponent,],
    providers: [],
})
export class AuthModule { }
