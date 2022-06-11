import { types } from "../types/types";
import { chargeDataset, eliminarDatosContacto, verificarEstadoInversiones } from '../../helpers/metodosMongoDB';
import axios from "axios";
import { Toast } from "../../helpers/Toast";

/* ---------- INICIAR CARGA DE DATOS CUANDO SE INICIA SESION ---------- */

export const cargarInfoDB = (uid) => {

    return async (dispatch, getState) => {

        chargeDataset(uid).then((dataset) => {
            
            dispatch(loadInfo(dataset, true));
            verificarEstadoInversiones(dataset, dispatch);
            
        }).catch(err => console.log(err));

/*         chargeDataset(uid)
            .then(dataset => dispatch(loadInfo(dataset, true)))
            .catch(err => console.log(err)); */
    }
}

const loadInfo = (dataset, state) => ({
    type: types.loadDB,
    payload: {
        fichaUser: dataset.fichaUser,
        eventos: dataset.eventos,
        inversiones: dataset.inversiones,
        contactos: dataset.contactos,
        state: state
    }
});

/* ---------- MANEJO DE LA DB MONGO --> CONTACTOS ---------- */

export const startNewContact = (contacto, history) => {

    return async (dispatch, getState) => {

        axios.post("https://backend-invergo-production.up.railway.app/contactos", contacto).then(res => {
            dispatch(addNewContact(res.data));
        });

        let mje = '';

        (localStorage.getItem('lang') === 'es-MX') ? mje = 'Contacto agregado' : mje = 'Contact added';

        Toast.fire({ icon: 'success', title: mje });

        history.push("/con/list")
    }
}

export const addNewContact = (contacto) => ({
    type: types.addContact,
    payload: {
        ...contacto
    }
});

export const startEditContact = (contacto) => {

    return async (dispatch, getState) => {

        axios.put(`https://backend-invergo-production.up.railway.app/contactos/${contacto._id}`, contacto).then(() => {

            dispatch(refreshContact(contacto._id, contacto));

            let mje = '';

            (localStorage.getItem('lang') === 'es-MX') ? mje = 'Contacto Actualizado Correctamente' : mje = 'Contact Updated Correctly';
            Toast.fire({ icon: 'success', title: mje });
        });
    }
}

export const refreshContact = (_id, contacto) => ({
    type: types.updateContact,
    payload: {
        _id,
        contacto
    }
});

export const startDeleteContact = (_id, eventos, inversiones, history) => {

    return async (dispatch, getState) => {

        axios.delete(`https://backend-invergo-production.up.railway.app/contactos/${_id}`).then(() => {

            dispatch(deleteContact(_id));

            eliminarDatosContacto(eventos, inversiones, dispatch);

            let mje = '';
            (localStorage.getItem('lang') === 'es-MX') ? mje = 'Contacto Eliminado Correctamente' : mje = 'Contact Deleted Correctly';

            Toast.fire({ icon: 'success', title: mje });

            history.push("/con/list");

        });
    }
}

export const deleteContact = (_id) => ({
    type: types.deleteContact,
    payload: _id
});

/* ---------- MANEJO DE LA DB MONGO --> EVENTOS ---------- */

export const startNewEvento = (evento) => {

    return async (dispatch, getState) => {

        axios.post("https://backend-invergo-production.up.railway.app/eventos", evento).then(res => {
            dispatch(addNewEvent(res.data));
        });

        let mje = '';

        (localStorage.getItem('lang') === 'es-MX') ? mje = 'Evento Creado Correctamente' : mje = 'Event Created Correctly';
        Toast.fire({ icon: 'success', title: mje });
    }
}

export const addNewEvent = (evento) => ({
    type: types.addEvent,
    payload: {
        ...evento
    }
})

export const startEditEvent = (evento) => {

    return async (dispatch, getState) => {

        axios.put(`https://backend-invergo-production.up.railway.app/eventos/${evento._id}`, evento).then(() => {

            dispatch(refreshEvent(evento._id, evento));

            let mje = '';

            (localStorage.getItem('lang') === 'es-MX') ? mje = 'Evento Editado Correctamente' : mje = 'Event Edited Correctly';
            Toast.fire({ icon: 'success', title: mje });
        });

    }
}

export const refreshEvent = (_id, evento) => ({
    type: types.updateEvent,
    payload: {
        _id,
        evento
    }
});

export const startDeleteEvent = (_id) => {

    return async (dispatch, getState) => {

        axios.delete(`https://backend-invergo-production.up.railway.app/eventos/${_id}`).then(() => {

            dispatch(deleteEvent(_id));

            let mje = '';

            (localStorage.getItem('lang') === 'es-MX') ? mje = 'Evento Eliminado Correctamente' : mje = 'Event Deleted Correctly';
            Toast.fire({ icon: 'success', title: mje });

            // localStorage.setItem("ruta", '/con/list');
            // window.location.reload();

        });
    }
}

export const deleteEvent = (_id) => ({
    type: types.deleteEvent,
    payload: _id
});

/* ---------- MANEJO DE LA DB MONGO --> INVERSIONES ---------- */

export const startNewInversion = (inversion) => {

    return async (dispatch, getState) => {

        axios.post("https://backend-invergo-production.up.railway.app/inversiones", inversion).then((resp) => {

            dispatch(addNewInversion(resp.data));

            let mje = '';

            (localStorage.getItem('lang') === 'es-MX') ? mje = 'Inversion Creada Correctamente' : mje = 'Investment Created Correctly';
            Toast.fire({ icon: 'success', title: mje });

        });

    }
}

export const addNewInversion = (inversion) => ({
    type: types.addInvestment,
    payload: {
        ...inversion
    }
});

export const startDeleteInversion = (_id) => {

    return async (dispatch, getState) => {

        axios.delete(`https://backend-invergo-production.up.railway.app/inversiones/${_id}`).then(() => {

            dispatch(deleteInvestment(_id));

            let mje = '';

            (localStorage.getItem('lang') === 'es-MX') ? mje = 'Inversion Eliminada Correctamente' : mje = 'Investment Deleted Correctly';
            Toast.fire({ icon: 'success', title: mje });

        });
    }
}

export const deleteInvestment = (_id) => ({
    type: types.deleteInvestment,
    payload: _id
});

export const refreshInversion = (_id, inversion) => ({
    type: types.updateInvestment,
    payload: {
        _id,
        inversion
    }
});

/* ---------- SALIR DE LA APP O CERRAR SESION ---------- */

export const infoDBCleaning = () => ({
    type: types.clearDB
});