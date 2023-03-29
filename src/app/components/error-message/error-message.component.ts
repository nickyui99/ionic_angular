import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {

    @Input() message: string;
    // @ts-ignore
    @Input() field: FormGroup;
    @Input() error: string;

    constructor() {
        this.message = "";
        this.error = "";
    }

    ngOnInit() {

    }

    shouldShowComponent() {
        return (this.field.touched && this.field.get('email')?.errors?.[this.error]);
    }
}
