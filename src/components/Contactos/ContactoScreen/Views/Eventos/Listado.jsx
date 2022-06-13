import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getEventoByID, getHorarioEvento, getMensajesSwal, getTipoEvento } from '../../../../../helpers/selector';
import { startDeleteEvent } from '../../../../../redux/actions/datosDB';
import { EditEvento } from './EditEvento';

export const Listado = ({ contacto, eventos }) => {

    const dispatch = useDispatch();

    const [visualizar, setVisualizar] = useState(false);
    const [evento, setEvento] = useState({});
    const [changeTipo, setChangeTipo] = useState();
    const [changeHorario, setChangeHorario] = useState();

    const handleVisualizar = (_id) => {
        setEvento(getEventoByID(_id, eventos));
        setChangeTipo(getTipoEvento(_id, eventos));
        setChangeHorario(getHorarioEvento(_id, eventos));
        setVisualizar(true);
    }

    const handleDelete = (_id) => {

        const mensajesSwal = getMensajesSwal(3);

        Swal.fire({
            title: mensajesSwal[0],
            text: mensajesSwal[1],
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: mensajesSwal[2],
            cancelButtonText: mensajesSwal[3],
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteEvent(_id));
            }
        });
    }

    return (
        <>
            {
                (visualizar)
                    ?
                    (
                        <div className='row'>

                            <div className='col-12'>
                                <div className="p-3 shadow-xl rounded-lg flex justify-between bg-blue-900 dark:bg-black">
                                    <button
                                        className='text-xl flex text-gray-200 hover:text-orange-500 dark:text-teal-300 dark:hover:text-indigo-600'
                                        onClick={() => { setVisualizar(false); setEvento({}) }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                                        </svg>
                                        <span className='mt-1 ml-3 text-xl'><FormattedMessage id="con.screen.actions.Ev.screen.1" defaultMessage="Back to List" /></span>
                                    </button>
                                    <p className='text-2xl me-5'><FormattedMessage id="con.screen.actions.Ev.screen.2" defaultMessage="Edit Event" /></p>
                                </div>
                            </div>

                            <EditEvento contacto={contacto} evento={evento} horario={changeHorario} type={changeTipo} />

                        </div>
                    )
                    :
                    (
                        <>

                            {
                                (eventos.length === 0)
                                    ?
                                    (
                                        <h2 className='text-center text-gray-100 text-2xl p-4 rounded-lg'>
                                            <FormattedMessage id="con.screen.actions.Ev.0" defaultMessage="Info No Client" values={{ name: contacto.nombre }} />
                                        </h2>
                                    )
                                    :
                                    (
                                        <>
                                            {
                                                eventos.map((item) => (

                                                    <div className='row flex justify-center mt-2' key={item._id}>

                                                        {/* TARJETA */}

                                                        <div className='col-8 col-lg-8 col-md-10'>

                                                            <div className='row mt-2 mb-2 p-3 ms-2 me-2 bg-blue-400 dark:bg-gray-900 rounded-2xl'>

                                                                {/* TIPO DE EVENTO */}

                                                                <div className='col-4 grid place-content-center'>
                                                                    {
                                                                        (item.tipo === 'Reunion')
                                                                            ? <p className="font-bold text-gray-100 text-xl bg-indigo-900 dark:bg-indigo-600 p-3 rounded-2xl"> <FormattedMessage id="con.screen.actions.Ev.type.1" defaultMessage="Reunion" /></p>
                                                                            : <p className="font-bold text-gray-100 text-xl bg-cyan-700 dark:bg-cyan-600 p-3 rounded-2xl"> <FormattedMessage id="con.screen.actions.Ev.type.2" defaultMessage="Conference" /></p>
                                                                    }
                                                                </div>

                                                                {/* CUERPO DEL EVENTO */}

                                                                <div className='col-7 ms-4 border-l-2'>

                                                                    <div className='row ms-2'>
                                                                        <div className='col-1 me-4'>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                            </svg>
                                                                        </div>
                                                                        <div className='col-8'>
                                                                            <p className="font-bold dark:font-medium text-gray-900 dark:text-gray-100 text-xl">
                                                                                {
                                                                                    item.fecha[8] + item.fecha[9] + '-' +
                                                                                    item.fecha[5] + item.fecha[6] + '-' +
                                                                                    item.fecha[0] + item.fecha[1] + item.fecha[2] + item.fecha[3]
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    {
                                                                        (item.hora !== '-')
                                                                        &&
                                                                        (
                                                                            <div className='row ms-2 mt-2'>
                                                                                <div className='col-1 me-4'>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                    </svg>
                                                                                </div>
                                                                                <div className='col-8'>
                                                                                    <p className="font-bold dark:font-medium text-gray-900 dark:text-gray-100 text-xl">{item.hora}</p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }

                                                                    <div className='row mt-2 ms-2'>
                                                                        <div className='col-1 me-4'>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                            </svg>
                                                                        </div>
                                                                        <div className='col-9'>
                                                                            <p className="font-bold dark:font-medium text-gray-900 dark:text-gray-100 text-xl">{item.lugar}</p>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>

                                                        {/* BOTONES */}

                                                        <div className='col-2 col-lg-2 col-md-2 flex'>

                                                            <div className='col-6 col-lg-6 col-md-2 ms-lg-2 ms-md-0 me-2 grid place-content-center' onClick={() => { handleVisualizar(item._id) }}>

                                                                <div className='p-3 bg-blue-900 dark:bg-gray-900 rounded-2xl hover:bg-teal-400 dark:hover:bg-teal-600'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                    </svg>
                                                                </div>

                                                            </div>
                                                            <div className='col-6 col-lg-6 col-md-2 md:ml-10 lg:ml-5 grid place-content-center' onClick={() => { handleDelete(item._id) }}>

                                                                <div className='p-3 bg-blue-900 dark:bg-gray-900 rounded-2xl hover:bg-red-500 dark:hover:bg-red-600'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>
                                                ))
                                            }
                                        </>
                                    )
                            }

                        </>
                    )
            }
        </>
    )
}