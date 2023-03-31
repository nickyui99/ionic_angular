import {LoginState} from "./LoginState";
import {loginReducer} from "./login.reducers";
import {
    login,
    loginFail,
    loginSuccess,
    recoverPassword,
    recoverPasswordFail,
    recoverPasswordSuccess
} from "./login.actions";
import {AppInitialState} from "../AppInitialState";
import {User} from "../../model/user/User";

describe("Login store", () => {
    it('recover password', function () {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, recoverPassword({email: "test@mail.com"}));
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        });
    });

    it('recover password success', function () {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, recoverPasswordSuccess());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        });
    });

    it('recover password fail', function () {
        const initialState: LoginState = AppInitialState.login;
        const error = {error: "error"};
        const newState = loginReducer(initialState, recoverPasswordFail({error}));

        expect(newState).toEqual({
            ...initialState,
            error: error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        });
    });

    it('login', function () {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, login({email: "test@mail.com", password: "test12345"}));
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true,
        })
    });

    it('loginSuccess', function () {
        const initialState: LoginState = {
            ...AppInitialState.login,
            isLoggingIn: true,
        };
        const user = new User();
        user.id = "anyId";
        const newState = loginReducer(initialState, loginSuccess({user}));
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isLoggedIn: true,
            isLoggingIn: false,
        })
    });

    it('loginFail', function () {
        const initialState: LoginState = {
            ...AppInitialState.login,
            isLoggingIn: true,
        };
        const error = {message: "error"};
        const newState = loginReducer(initialState, loginFail({error}));
        expect(newState).toEqual({
            ...initialState,
            error: error,
            isLoggedIn: false,
            isLoggingIn: false,
        })
    });
})