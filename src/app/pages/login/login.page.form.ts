import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";

export class LoginPageForm {

    constructor(private formbuilder: FormBuilder) {
    }

    createForm(): FormGroup{
        return this.formbuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }
}