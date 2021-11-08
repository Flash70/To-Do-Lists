import {createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "./store";
import {getAuthMeServer} from "./auth-reducer";


interface initialState {
    initialized: boolean
}

let initialState: initialState = {
    initialized: false
};

const initialSlice = createSlice({
    name: "initializedReducer",
    initialState,
    reducers: {
        initializedSuccess(state) {
            state.initialized = true
        }
    }
})

export const {initializedSuccess} = initialSlice.actions

export const initializeApp = () => async (dispatch: AppDispatch) => {
    try {
        let promise = dispatch(getAuthMeServer());

        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess());
            });
    } catch (error) {
        alert("Шибка при иницилизации");
        console.error(error);
    }
}




export default initialSlice.reducer;