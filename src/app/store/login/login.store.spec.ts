import {LoginState} from "./LoginState";
import {loginReducer} from "./login.reducers";
import {recoverPassword, recoverPasswordFail, recoverPasswordSuccess} from "./login.actions";
import {AppInitialState} from "../AppInitialState";

describe("Login store", () => {
    it('recover password', function () {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, recoverPassword());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        });
    });

    it('recover password success', function () {
        const initialState: LoginState = {
            error: null,
            isLoggedIn: false,
            isLoggingIn: false,
            isRecoveredPassword: false,
            isRecoveringPassword: true,
        }
        const newState = loginReducer(initialState, recoverPasswordSuccess());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: true
        });
    });

    it('recover password success', function () {
        const initialState: LoginState = {
            error: null,
            isLoggedIn: false,
            isLoggingIn: false,
            isRecoveredPassword: false,
            isRecoveringPassword: true,
        }
        const error = {error: "error"};
        const newState = loginReducer(initialState, recoverPasswordFail({error}));

        expect(newState).toEqual({
            ...initialState,
            error: "error",
            isRecoveredPassword: false,
            isRecoveringPassword: false
        });
    });
})