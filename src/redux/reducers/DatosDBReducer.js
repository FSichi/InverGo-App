import { types } from "../types/types";

const initialState = {
    fichaUser: {},
    eventos: [],
    inversiones: [],
    contactos: [],
    state: false
}

export const DatosDBReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.loadDB:
            return {
                fichaUser: action.payload.fichaUser,
                eventos: action.payload.eventos,
                inversiones: action.payload.inversiones,
                contactos: action.payload.contactos,
                state: action.payload.state
            }

        case types.clearDB:
            return {}

        /* -------------------- CONTACTOS -------------------- */

        case types.addContact:

            return {
                ...state,
                contactos: [action.payload, ...state.contactos]
            }

        case types.updateContact:

            return {
                ...state,
                contactos: state.contactos.map(
                    con => con._id === action.payload._id
                        ? action.payload.contacto
                        : con
                )
            }

        case types.deleteContact:

            return {
                ...state,
                contactos: state.contactos.filter(con => con._id !== action.payload)
            }

        /* -------------------- EVENTOS -------------------- */

        case types.addEvent:

            return {
                ...state,
                eventos: [action.payload, ...state.eventos]
            }

        case types.updateEvent:

            return {
                ...state,
                eventos: state.eventos.map(
                    evt => evt._id === action.payload._id
                        ? action.payload.evento
                        : evt
                )
            }

        case types.deleteEvent:

            return {
                ...state,
                eventos: state.eventos.filter(evt => evt._id !== action.payload)
            }

        /* -------------------- INVERSIONES -------------------- */

        case types.addInvestment:

            return {
                ...state,
                inversiones: [action.payload, ...state.inversiones]
            }

        case types.updateInvestment:

            return {
                ...state,
                inversiones: state.inversiones.map(
                    inv => inv._id === action.payload._id
                        ? action.payload.inversion
                        : inv
                )
            }

        case types.deleteInvestment:

            return {
                ...state,
                inversiones: state.inversiones.filter(inv => inv._id !== action.payload)
            }

        default:
            return state;
    }

}