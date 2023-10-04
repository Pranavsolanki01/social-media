import { createSlice } from '@reduxjs/toolkit';
import { user } from '../assets/data';


const initialState = { 
    user: JSON.parse(window?.localStorage.getItem("user")) ?? user,
    edit: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action){
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout(state, action){
            state.user = {};
            localStorage.removeItem("user");
        },
    },
});

export default userSlice.reducer;   

export function userLogin(user){
    return (dispatch, getState) => {
        dispatch(userSlice.actions.login(user));
    };
}

export function Logout(){
    return (dispatch, getState) => {
        dispatch(userSlice.actions.logout());
    };
}

export function UpdateProfile(val){
    return (dispatch, getState) => {
        dispatch(userSlice.actions.updateProfile(val));
    };
}