import { Injectable, EventEmitter } from '@angular/core';
import { Error } from "./errors.model";
@Injectable()
export class ErrorService {
    
    errorOcurred = new EventEmitter<Error>();

    handledError(error:any){
        const errorData = new Error(error.title,error.error.message);
        this.errorOcurred.emit(errorData);
    }
    constructor() { }
}