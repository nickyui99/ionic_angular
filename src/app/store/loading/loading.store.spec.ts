import {loadingReducer} from "./loading.reducers";
import {LoadingState} from "./LoadingState";
import {hide, show} from "./loading.actions";
import {createAction} from "@ngrx/store";

describe('Loading store', () => {

    it('should show', () => {
        const initialState: LoadingState = {show: false};
        const newState = loadingReducer(initialState, show());

        expect(newState).toEqual({show: true});
    });

    it('should hide', () => {
        const initialState: LoadingState = {show: true};
        const newState = loadingReducer(initialState, hide());

        expect(newState).toEqual({show: false});
    });

    it('should keep state if action is unknown', () => {
        const initialState: LoadingState = {show: true};
        const action = createAction("UNNKNOWN")
        const newState = loadingReducer(initialState, action);

        expect(newState).toEqual({show: true});
    });

})