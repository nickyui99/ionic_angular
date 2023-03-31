import {createAction, props} from "@ngrx/store";
import {User} from "../../model/user/User";

export const recoverPassword = createAction("[Recover password]", props<{ email: string }>());
export const recoverPasswordSuccess = createAction("[Recover password] success");
export const recoverPasswordFail = createAction("[Recover password] fail", props<{error: any}>());

export const login = createAction("[Login]", props<{email: string, password: string}>());
export const loginSuccess = createAction("[Login] Success", props<{ user: User }>());
export const loginFail = createAction("[Login] Fail", props<{error: any}>());