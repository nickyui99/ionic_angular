export class User{
    id: string | undefined;
    email: string;
    password: string;

    constructor() {
        this.id = "";
        this.email = "";
        this.password = "";
    }

}