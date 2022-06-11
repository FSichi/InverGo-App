export const getClientesByName = (name, clientes) => {

    if (name === '') {
        return [];
    }

    name = name.toLowerCase();
    return clientes.filter(cli => cli.nombre.toLowerCase().includes(name));

}

export const getContactosByTipo = (tipo, contacto) => {

    if (tipo === '') {
        return [];
    }

    return contacto.filter(con => con.tipoContacto === tipo);
}

export const getContactoByID = (id, contactos) => {

    return contactos.find(con => con._id === id);
}

export const getInversionByID = (_id, inversiones) => {

    return inversiones.find(inv => inv._id === _id);
}

export const getEventoByID = (_id, eventos) => {

    return eventos.find(ev => ev._id === _id);
}

export const getTipoEvento = (_id, eventos) => {

    var evento = eventos.find(ev => ev._id === _id);
    var type = false;

    (evento.tipo === 'Reunion') ? (type = true) : (type = false)

    return type
}

export const getHorarioEvento = (_id, eventos) => {

    var evento = eventos.find(ev => ev._id === _id);
    var type = false;

    (evento.hora !== '-') ? (type = true) : (type = false)

    return type
}

export const getEstructuraByOption = (option, estructuras) => {
    return estructuras.find(est => est.id === option);
}

export const getCountriesByLang = (Esp, Eng) => {

    if (localStorage.getItem("country") === null) {
        localStorage.setItem("country", "Argentina");
    }

    return (localStorage.getItem("lang") === 'es-MX') ? (Esp) : (Eng);

}

export const getCountriesByLang2 = (Esp, Eng, country) => {

    if (localStorage.getItem("countryEdit") === null) {
        localStorage.setItem("countryEdit", country);
    }

    return (localStorage.getItem("lang") === 'es-MX') ? (Esp) : (Eng);

}

export const getCountriesByName = (countries, name) => {


    if (localStorage.getItem("lang") === 'es-MX') {
        return countries.find(cou => cou.name === name);
    } else {

        if (name === "Italia") {
            return countries.find(cou => cou.name === "Italy");
        }
        if (name === "Estados Unidos") {
            return countries.find(cou => cou.name === "United States");
        }
        if (name === "España") {
            return countries.find(cou => cou.name === "Spain");
        } else {
            return countries.find(cou => cou.name === name);
        }
    }

}

export const getMessaje = (Esp, Eng) => {

    var com = '';

    (localStorage.getItem("lang") === 'es-MX') ? (com = 'Comunicacion') : (com = 'Comunication');

    return com;

}

export const getInfoContactosDB = (contactosDB) => {

    if (contactosDB === undefined) {
        return [];
    }

    var infoContactos = {
        contactos: [],
        inversores: [],
        cantContactos: 0,
        cantInversores: 0
    }

    if (contactosDB.length === 0) {
        return infoContactos;
    }

    let contactos = [];
    let inversores = [];

    contactos = contactosDB.filter(con => con.tipoContacto === 'Contacto');
    inversores = contactosDB.filter(con => con.tipoContacto === 'Inversor');

    infoContactos = {
        contactos: contactos,
        inversores: inversores,
        cantContactos: contactos.length,
        cantInversores: inversores.length
    }

    return infoContactos;
}

export const getInfoInversionesDB = (inversionesDB) => {

    if (inversionesDB === undefined) {
        return [];
    }

    var infoInversiones = {
        cantInv: 0,
        cantInvFin: 0,
    }

    if (inversionesDB.length === 0) {
        return infoInversiones;
    }

    infoInversiones = {
        cantInv: inversionesDB.length,
        cantInvFin: inversionesDB.filter(inv => inv.estado === true).length,
    }

    return infoInversiones;
}

export const ordenarEventosByFecha = (eventosDB) => {

    const eventosNoOcurridos = eventosDB.filter(ev => new Date(ev.fecha) >= new Date());
    var eventosOrder = eventosNoOcurridos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    var eventosReturn = [];

    if (eventosNoOcurridos.length === 1) {
        eventosReturn = [eventosOrder[0]]
    }

    if (eventosNoOcurridos.length === 2) {
        eventosReturn = [eventosOrder[0], eventosOrder[1]]
    }

    if (eventosNoOcurridos.length > 2) {
        eventosReturn = [eventosOrder[0], eventosOrder[1], eventosOrder[2]]
    }

    return eventosReturn;
}

export const ordenarInversionesByCapital = (inversionesDB) => {

    var inversionesOrder = inversionesDB.sort((a, b) => b.capital - a.capital);
    var inversionesReturn = [];

    if (inversionesDB.length === 1) {
        inversionesReturn = [inversionesOrder[0]]
    }

    if (inversionesDB.length === 2) {
        inversionesReturn = [inversionesOrder[0], inversionesOrder[1]]
    }

    if (inversionesDB.length > 2) {
        inversionesReturn = [inversionesOrder[0], inversionesOrder[1], inversionesOrder[2]]
    }

    return inversionesReturn;
}

export const ordenarInversionesByFechaFin = (inversionesDB) => {

    var inversionesActivas = inversionesDB.filter(inv => inv.estado === false);
    var inversionesOrder = inversionesActivas.sort((a, b) => new Date(a.fechas.fin) - new Date(b.fechas.fin));

    var inversionesReturn = [];

    if (inversionesDB.length === 1) {
        inversionesReturn = [inversionesOrder[0]]
    }

    if (inversionesDB.length === 2) {
        inversionesReturn = [inversionesOrder[0], inversionesOrder[1]]
    }

    if (inversionesDB.length > 2) {
        inversionesReturn = [inversionesOrder[0], inversionesOrder[1], inversionesOrder[2]]
    }

    return inversionesReturn;
}

export const unirInversionesByUID = (inversiones, contactosDB, name, email) => {

    var inversionesReturn = [];

    var inversionObject = {
        inversion: {},
        owner: '',
        email: ''
    }

    inversiones.forEach(inv => {

        inversionObject = {};

        inversionObject.inversion = inv;

        var contacto = contactosDB.find(con => con._id === inv.uid.enlace);

        if (contacto) {
            inversionObject.owner = contacto.nombre;
            inversionObject.email = contacto.correo;
        } else {
            inversionObject.owner = name;
            inversionObject.email = email;
        }

        inversionesReturn.push(inversionObject);
    });

    return inversionesReturn;
}

export const getEventosContacto = (uid, eventos) => {
    return eventos.filter(ev => ev.uid.enlace === uid);
}

export const getInversionesContacto = (uid, inversiones) => {
    return inversiones.filter(inv => inv.uid.enlace === uid);
}

export const getInfoInvCliente = (inversiones) => {

    var invertido = 0;
    var beneficio = 0;

    if (inversiones.length === 0) {
        invertido = 0;
        beneficio = 0;
    } else {
        inversiones.forEach(inv => {
            invertido = invertido + parseInt(inv.capitales.capital);
            beneficio = beneficio + (parseInt(inv.capitales.capitalFinal) - parseInt(inv.capitales.capital));
        });
    }

    return [invertido, beneficio];
}

export const getInfoInvUsuario = (inversiones) => {

    var invertido = 0;
    var beneficio = 0;
    var totalCap = 0;

    if (inversiones.length === 0) {
        invertido = 0;
        beneficio = 0;
    } else {
        inversiones.forEach(inv => {
            invertido = invertido + parseInt(inv.capitales.capital);
            beneficio = beneficio + (parseInt(inv.capitales.capitalFinal) - parseInt(inv.capitales.capital));
        });
    }

    totalCap = invertido + beneficio;

    let invReturn = '$ ' + new Intl.NumberFormat("de-DE").format(invertido);
    let benReturn = '$ ' + new Intl.NumberFormat("de-DE").format(beneficio);
    let totReturn = '$ ' + new Intl.NumberFormat("de-DE").format(totalCap);

    return [invReturn, benReturn, totReturn, inversiones.length];
}

export const getRegistroMensual = (inversiones, contactos) => {

    var fechaActual = new Date();
    var fechaInicial = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1).toISOString();
    var fechaFinal = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0).toISOString();

    fechaInicial = fechaInicial[0] + fechaInicial[1] + fechaInicial[2] + fechaInicial[3] + '-' + fechaInicial[5] + fechaInicial[6] + '-' + fechaInicial[8] + fechaInicial[9]
    fechaFinal = fechaFinal[0] + fechaFinal[1] + fechaFinal[2] + fechaFinal[3] + '-' + fechaFinal[5] + fechaFinal[6] + '-' + fechaFinal[8] + fechaFinal[9]

    var inversionesMensuales = inversiones.filter(inv => new Date(inv.fechas.fechaAlta) >= new Date(fechaInicial) && new Date(inv.fechas.fechaAlta) <= new Date(fechaFinal));
    var contactosMensuales = contactos.filter(con => new Date(con.fechaAlta) >= new Date(fechaInicial) && new Date(con.fechaAlta) <= new Date(fechaFinal));

    var registroMensual = [inversionesMensuales.length, contactosMensuales.length];

    return registroMensual;
}

export const getPorcentajeBarraInversion = (inversion) => {

    /* 

        VOY A DIVIDIR LA BARRA EN 12 PORCIONES

        Son 487 Dias en Total de la Inversion, entonces divido esos dias en 12 para sacar los rangos de cada seccion de la barra.

        487 / 12 = 40.58

        1 PORCION --> Dia 1 - 43
        2 PORCION --> Dia 44 - 87
        3 PORCION --> Dia 88 - 131
        4 PORCION --> Dia 132 - 175
        5 PORCION --> Dia 176 - 219
        6 PORCION --> Dia 220 - 263
        7 PORCION --> Dia 264 - 307
        8 PORCION --> Dia 308 - 351
        9 PORCION --> Dia 352 - 395
        10 PORCION --> Dia 396 - 439
        11 PORCION --> Dia 440 - 486
        12 PORCION --> Dia 487

    */

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido).getTime();

    var fechaInicioInversion = new Date(inversion.fechas.inicio).getTime();
    var diasTranscurridos = (hoy - fechaInicioInversion) / (1000 * 60 * 60 * 24);

    var styleBar = '';

    if (diasTranscurridos <= 43) {
        styleBar = `w-1/12`
    }
    if (diasTranscurridos >= 44 && diasTranscurridos <= 87) {
        styleBar = `w-2/12`
    }
    if (diasTranscurridos >= 88 && diasTranscurridos <= 131) {
        styleBar = `w-3/12`
    }
    if (diasTranscurridos >= 132 && diasTranscurridos <= 175) {
        styleBar = `w-4/12`
    }
    if (diasTranscurridos >= 176 && diasTranscurridos <= 219) {
        styleBar = `w-5/12`
    }
    if (diasTranscurridos >= 220 && diasTranscurridos <= 263) {
        styleBar = `w-6/12`
    }
    if (diasTranscurridos >= 264 && diasTranscurridos <= 307) {
        styleBar = `w-7/12`
    }
    if (diasTranscurridos >= 308 && diasTranscurridos <= 351) {
        styleBar = `w-8/12`
    }
    if (diasTranscurridos >= 352 && diasTranscurridos <= 395) {
        styleBar = `w-9/12`
    }
    if (diasTranscurridos >= 396 && diasTranscurridos <= 439) {
        styleBar = `w-10/12`
    }
    if (diasTranscurridos >= 440 && diasTranscurridos <= 486) {
        styleBar = `w-11/12`
    }
    if (diasTranscurridos > 486) {
        styleBar = `w-100`
    }

    return styleBar;
}

export const calcularFechaFinInversion = (fechaInicio) => {

    var fechaReturn = '';

    var inicio = new Date(fechaInicio);
    var fechaFin = new Date(inicio.getTime() + (487 * 24 * 60 * 60 * 1000));

    var day = fechaFin.getDate();
    var month = fechaFin.getMonth() + 1;
    var year = fechaFin.getFullYear();

    if (month < 10) {
        month = '0' + month
    }

    if (day < 10) {
        day = '0' + day
    }

    fechaReturn = year + '-' + month + '-' + day

    return fechaReturn;
}

export const calcularFechaFinExtensionAnual = (fechaFinActual, typeLicencia) => {

    var fechaReturn = '';

    if (typeLicencia === 'PV') {
        return fechaReturn;
    }

    var fechaFin = new Date(fechaFinActual);
    var newFechaFin = new Date(fechaFin.getTime() + (365 * 24 * 60 * 60 * 1000));

    var day = newFechaFin.getDate();
    var month = newFechaFin.getMonth() + 1;
    var year = newFechaFin.getFullYear();

    if (month < 10) {
        month = '0' + month
    }

    if (day < 10) {
        day = '0' + day
    }

    fechaReturn = year + '-' + month + '-' + day

    return fechaReturn;
}

export const getFechaActual = () => {

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido).toISOString();
    const fechaReturn = hoy[0] + hoy[1] + hoy[2] + hoy[3] + '-' + hoy[5] + hoy[6] + '-' + hoy[8] + hoy[9]

    return fechaReturn;
}

export const getMensajesSwal = (id, nombre) => {

    var title = '';
    var text = '';
    var confirmButtonText = '';
    var cancelButtonText = '';

    if (id === 1) {

        if (localStorage.getItem('lang') === 'es-MX') {
            title = `¿Estas Seguro de Eliminar a ${nombre}?`;
            text = "Esto Lo Eliminara Permanentemente junto con todas sus Inversiones y Eventos asociados."
            confirmButtonText = 'Continuar';
            cancelButtonText = 'Cancelar';
        } else {
            title = `Are you sure to delete ${nombre}?`;
            text = "This will delete permanently all his investments and events associated."
            confirmButtonText = 'Continue';
            cancelButtonText = 'Cancel';
        }

    }

    if (id === 2) {

        if (localStorage.getItem('lang') === 'es-MX') {
            title = '¿Estas Seguro?';
            text = "Esto Convertira a este contacto en un Inversor."
            confirmButtonText = 'Continuar';
            cancelButtonText = 'Cancelar';
        } else {
            title = 'Are you sure?';
            text = "This will convert this contact to an investor."
            confirmButtonText = 'Continue';
            cancelButtonText = 'Cancel';
        }

    }

    if (id === 3) {

        if (localStorage.getItem('lang') === 'es-MX') {
            title = '¿Estas Seguro?';
            text = "Esto Eliminara Permanentemente el Evento."
            confirmButtonText = 'Continuar';
            cancelButtonText = 'Cancelar';
        } else {
            title = 'Are you sure?';
            text = "This will permanently delete the Event."
            confirmButtonText = 'Continue';
            cancelButtonText = 'Cancel';
        }

    }

    if (id === 4) {
        if (localStorage.getItem('lang') === 'es-MX') {
            title = '¿Estas Seguro?';
            text = "Esto Eliminara Permanentemente la Inversion."
            confirmButtonText = 'Continuar';
            cancelButtonText = 'Cancelar';
        } else {
            title = 'Are you sure?';
            text = "This will permanently delete the Investment."
            confirmButtonText = 'Continue';
            cancelButtonText = 'Cancel';
        }
    }

    const resp = [title, text, confirmButtonText, cancelButtonText];
    return resp;
}