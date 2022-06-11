import axios from 'axios';
import { deleteEvent, deleteInvestment, refreshInversion } from '../redux/actions/datosDB';

export const chargeDataset = async (uid) => {

    var dataset = {};

    try {

        await axios.get(`https://backend-invergo-production.up.railway.app/general/getDataset/${uid}`).then((resp) => {
            dataset = resp.data;
        });

        return dataset;

    } catch (e) { throw e; }
}

export const verificarEstadoInversiones = (dataset, dispatch) => {

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido).getTime();

    var fechaInicioInversion = '';
    var diasTranscurridos = '';

    if (dataset.inversiones.length > 0) {

        dataset.inversiones.forEach(inv => {

            fechaInicioInversion = new Date(inv.fechas.inicio).getTime();
            diasTranscurridos = (hoy - fechaInicioInversion) / (1000 * 60 * 60 * 24);

            if (diasTranscurridos >= 487) {
                updateInversion(inv, dispatch);
            }

        });
    }

    return
}

const updateInversion = async (inversion, dispatch) => {

    var inversionEdit = {
        _id: inversion._id,
        tipo: inversion.tipo,
        estado: true,
        capitales: {
            capital: inversion.capitales.capital,
            capitalFinal: inversion.capitales.capitalFinal,
        },
        fechas: {
            inicio: inversion.fechas.inicio,
            fin: inversion.fechas.fin,
            fechaAlta: inversion.fechas.fechaAlta,
        },
        uid: {
            firebase: inversion.uid.firebase,
            enlace: inversion.uid.enlace
        }
    }

    axios.put(`https://backend-invergo-production.up.railway.app/inversiones/${inversion._id}`, inversionEdit).then(() => {
        dispatch(refreshInversion(inversion._id, inversionEdit));
    })

}

export const eliminarDatosContacto = async (eventos, inversiones, dispatch) => {

    try {

        eventos.forEach(evt => {
            axios.delete(`https://backend-invergo-production.up.railway.app/eventos/${evt._id}`).then(() => {
                dispatch(deleteEvent(evt._id));
            });
        });

        inversiones.forEach(inv => {
            axios.delete(`https://backend-invergo-production.up.railway.app/inversiones/${inv._id}`).then(() => {
                dispatch(deleteInvestment(inv._id));
            });
        });

        return;

    } catch (e) { throw e; }
}