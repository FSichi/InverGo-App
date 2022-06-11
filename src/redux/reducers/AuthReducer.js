import { types } from "../types/types";

const initialState = {
    uid: '',
    name: '',
    email: ''
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                email: action.payload.email
            }
        case types.logout:
            return {}

        default:
            return state;
    }

}