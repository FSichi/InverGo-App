import axios from 'axios';
import { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { calcularFechaFinExtensionAnual } from '../../helpers/selector';
import { Separador } from '../UI/Separador'

export const Prices = () => {

    localStorage.setItem("ruta", `/prices`);

    const { fichaUser } = useSelector(state => state.infoDB);

    const [planSelected, setPlanSelected] = useState(false);
    const [typePlan, setTypePlan] = useState('');

    const [fechaFinLicencia, setFechaFinLicencia] = useState('');

    const handleChangePlan = () => {
        setFechaFinLicencia(calcularFechaFinExtensionAnual(fichaUser.fechas.finalizacion, fichaUser.licencia.tipo));
    }

    const handleEnviarPeticion = () => {

        let title = '';
        let text = '';
        let confirmButtonText = '';
        let cancelButtonText = '';

        if (fichaUser.tipoLicencia === 'PV') {

            if (localStorage.getItem('lang') === 'es-MX') {
                title = 'No puedes enviar la Solicitud';
                text = "Tu licencia de usuario es Vitalicia, no puedes enviar la solicitud de renovación.";
                confirmButtonText = 'Aceptar';
            } else {
                title = 'You can not send the request';
                text = "Your user license is For Life, you can not send the renewal request.";
                confirmButtonText = 'Accept';
            }

            Swal.fire({ title: title, text: text, icon: 'error', confirmButtonText: confirmButtonText });

            return;
        }

        if (localStorage.getItem('lang') === 'es-MX') {
            title = '¿Estas Seguro?';
            text = "Enviaremos la Peticion al Panel de Gestion de InverGo.";
            confirmButtonText = 'Continuar';
            cancelButtonText = 'Cancelar';
        } else {
            title = 'Are you sure?';
            text = "We will send the request to the InverGo Management Panel.";
            confirmButtonText = 'Continue';
            cancelButtonText = 'Cancel';
        }

        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {

                var data = {
                    nombre: fichaUser.nombre,
                    correo: fichaUser.correo,
                    tipoLicencia: typePlan,
                    fechas: {
                        newFechaFin: fechaFinLicencia,
                        accion: '-'
                    },
                    estado: false,
                }

                axios.post('http://localhost:4000/peticiones', data).then(res => {

                    var title = '';
                    var text = '';
                    var confirmButtonText = '';

                    if (localStorage.getItem('lang') === 'es-MX') {
                        title = 'Peticion Enviada con Exito';
                        text = "En breve Recibiras un correo con las instrucciones para continuar con el proceso.";
                        confirmButtonText = 'Aceptar';
                    } else {
                        title = 'Request Sent Successfully';
                        text = "You will receive an email with instructions to continue with the process.";
                        confirmButtonText = 'Accept';
                    }

                    Swal.fire({ title: title, text: text, icon: 'success', confirmButtonText: confirmButtonText });
                })

            }
        });
    }

    return (
        <div className='container list text-gray-100'>

            <Link className="fw-bold text-lg ms-2 text-indigo-600 hover:text-teal-600 dark:text-indigo-400 dark:hover:text-teal-300" to='/perfil' >
                <FormattedMessage id="prices.back" defaultMessage="Login Ref Button" />
            </Link>

            <div className='p-4 rounded-2xl bg-indigo-900 dark:bg-gray-800 mt-2'>

                <div className='row flex justify-center'>

                    <div className='col-4'>
                        <div className="shadow-lg rounded-2xl w-100 bg-blue-600 dark:bg-gray-900 p-4">

                            <p className="text-white text-xl">
                                <FormattedMessage id="prices.licence" defaultMessage="Licence :" />
                            </p>
                            <ul className="text-md text-white w-full mt-4 mb-6">
                                <li className="mb-3 flex items-center ">
                                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="6" height="6" stroke="currentColor" fill="white" viewBox="0 0 1792 1792">
                                        <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z">
                                        </path>
                                    </svg>
                                    <FormattedMessage id="prices.licence.1" defaultMessage="Licence 1" />
                                </li>
                                <li className="mb-3 flex items-center ">
                                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="6" height="6" stroke="currentColor" fill="white" viewBox="0 0 1792 1792">
                                        <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z">
                                        </path>
                                    </svg>
                                    <FormattedMessage id="prices.licence.2" defaultMessage="Licence 2" />
                                </li>
                                <li className="mb-3 flex items-center ">
                                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="6" height="6" stroke="currentColor" fill="white" viewBox="0 0 1792 1792">
                                        <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z">
                                        </path>
                                    </svg>
                                    <FormattedMessage id="prices.licence.3" defaultMessage="Licence 3" />
                                </li>
                                <li className="mb-3 flex items-center ">
                                    <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="6" height="6" stroke="currentColor" fill="white" viewBox="0 0 1792 1792">
                                        <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z">
                                        </path>
                                    </svg>
                                    <FormattedMessage id="prices.licence.4" defaultMessage="Licence 4" />
                                </li>

                            </ul>

                        </div>
                    </div>

                    <div className='col-3 ms-5 me-5'>
                        <div className="shadow-lg rounded-2xl w-100 bg-blue-600 dark:bg-gray-900 p-4">

                            <button
                                type="button"
                                className="w-full px-3 py-3 text-sm shadow rounded-lg text-gray-900 bg-blue-400 hover:text-gray-300 hover:bg-blue-900 dark:text-indigo-300 dark:bg-gray-700 dark:hover:text-gray-300 dark:hover:bg-indigo-600"
                                onClick={() => { setTypePlan('PA'); handleChangePlan(); setPlanSelected(true) }}
                            >
                                <FormattedMessage id="prices.1.button" defaultMessage="Licence Button 1" />
                            </button>

                            <button
                                type="button"
                                className="w-full mt-5 px-3 py-3 text-sm shadow rounded-lg text-gray-900 bg-blue-400 hover:text-gray-300 hover:bg-teal-600 dark:text-indigo-300 dark:bg-gray-700 dark:hover:text-teal-300 dark:hover:bg-indigo-600"
                                onClick={() => { setTypePlan('PV'); setPlanSelected(true) }}
                            >
                                <FormattedMessage id="prices.2.button" defaultMessage="Licence Btn 2" />
                            </button>

                        </div>
                    </div>

                    {
                        (planSelected)
                        &&
                        (
                            <>
                                {
                                    (typePlan === 'PA')
                                        ?
                                        (
                                            <div className='col-4'>

                                                <div className="shadow-lg rounded-2xl w-100 bg-blue-600 dark:bg-gray-900 p-4 text-gray-100">

                                                    <p className='text-2xl text-center'>
                                                        <FormattedMessage id="prices.selection.title.1" defaultMessage="Plan Tittle" />
                                                    </p>

                                                    <div className='mt-3 mb-3'>
                                                        <Separador />
                                                    </div>

                                                    <div className='text-xl'>
                                                        <p className='mt-4 text-md'>
                                                            # <FormattedMessage id="prices.selection.info.date" defaultMessage="Licence Date" />
                                                            <span className='text-teal-300 ms-2'>
                                                                {
                                                                    (fechaFinLicencia === '')
                                                                        ?
                                                                        (
                                                                            <>---</>
                                                                        )
                                                                        :
                                                                        (
                                                                            fechaFinLicencia[8] + fechaFinLicencia[9] + '-' +
                                                                            fechaFinLicencia[5] + fechaFinLicencia[6] + '-' +
                                                                            fechaFinLicencia[0] + fechaFinLicencia[1] + fechaFinLicencia[2] + fechaFinLicencia[3]
                                                                        )
                                                                }
                                                            </span>
                                                        </p>
                                                        <p className='mt-4 text-md'>
                                                            # <FormattedMessage id="prices.selection.info.price" defaultMessage="Licence Price" />
                                                            <span className='text-teal-300 ms-2'>$ 150 </span>
                                                        </p>
                                                    </div>

                                                    <div className='mt-3 mb-3'>
                                                        <Separador />
                                                    </div>

                                                    <div className='d-flex justify-center mt-4'>
                                                        <button
                                                            type="button"
                                                            className="px-4 py-3 text-md shadow rounded-lg text-gray-900 bg-blue-400 hover:text-gray-300 hover:bg-blue-900 dark:text-gray-100 dark:bg-gray-700 dark:hover:text-gray-200 dark:hover:bg-violet-500"
                                                            onClick={handleEnviarPeticion}
                                                        >
                                                            <FormattedMessage id="prices.selection.info.button" defaultMessage="Licence Instructions" />
                                                        </button>
                                                    </div>

                                                </div>

                                            </div>
                                        )
                                        :
                                        (
                                            <div className='col-4'>

                                                <div className="shadow-lg rounded-2xl w-100 bg-blue-600 dark:bg-gray-900 p-4 text-gray-100">

                                                    <p className='text-2xl text-center'>
                                                        <FormattedMessage id="prices.selection.title.2" defaultMessage="Plan Tittle" />
                                                    </p>

                                                    <div className='mt-3 mb-3'>
                                                        <Separador />
                                                    </div>

                                                    <div className='text-xl'>
                                                        <p className='mt-4 text-md'>
                                                            # <FormattedMessage id="prices.selection.info.date" defaultMessage="Licence Date" />
                                                            <span className='text-teal-300 ms-2'>
                                                                <FormattedMessage id="prices.selection.info.date.frv" defaultMessage="Licence Date" />
                                                            </span>
                                                        </p>
                                                        <p className='mt-4 text-md'>
                                                            # <FormattedMessage id="prices.selection.info.price" defaultMessage="Licence Price" />
                                                            <span className='text-teal-300 ms-2'>$ 450 </span>
                                                        </p>
                                                    </div>

                                                    <div className='mt-3 mb-3'>
                                                        <Separador />
                                                    </div>

                                                    <div className='d-flex justify-center mt-4'>
                                                        <button
                                                            type="button"
                                                            className="px-4 py-3 text-md shadow rounded-lg text-gray-900 bg-blue-400 hover:text-gray-300 hover:bg-blue-900 dark:text-gray-100 dark:bg-gray-700 dark:hover:text-gray-100 dark:hover:bg-gray-900"
                                                            onClick={handleEnviarPeticion}
                                                        >
                                                            <FormattedMessage id="prices.selection.info.button" defaultMessage="Licence Instructions" />
                                                        </button>
                                                    </div>

                                                </div>

                                            </div>
                                        )
                                }
                            </>
                        )
                    }

                </div>

            </div>

        </div>
    )
}