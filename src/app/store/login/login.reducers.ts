import {LoginState} from "./LoginState";
import {createReducer, on} from "@ngrx/store";
import {
    login,
    loginFail,
    loginSuccess,
    recoverPassword,
    recoverPasswordFail,
    recoverPasswordSuccess
} from "./login.actions";
import {AppInitialState} from "../AppInitialState";


const reducer = createReducer(AppInitialState.login,
    on(recoverPassword, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        };
    }),
    on(recoverPasswordSuccess, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        };
    }),
    on(recoverPasswordFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        };
    }),
    on(login, (currentState: LoginState) => {

        return {
            ...currentState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true,
        }
    }),
    on(loginSuccess, (currentState: LoginState) => {

        return {
            ...currentState,
            error: null,
            isLoggedIn: true,
            isLoggingIn: false,
        }
    }),
    on(loginFail, (currentState: LoginState) => {

        return {
            ...currentState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: false,
        }
    }),
)

export function loginReducer(state: LoginState, action: any){
    return reducer(state, action)
}