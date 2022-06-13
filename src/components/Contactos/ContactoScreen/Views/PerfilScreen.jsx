import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { FormattedMessage } from 'react-intl';
import Swal from 'sweetalert2';
import { getInfoInvCliente, getMensajesSwal, getMessaje } from '../../../../helpers/selector';
import { startDeleteContact, startEditContact } from '../../../../redux/actions/datosDB';
import { Separador } from '../../../UI/Separador';
import { SelectorEdit } from './Selector';
import { Toast } from '../../../../helpers/Toast';

export const PerfilScreen = ({ contacto, eventos, inversiones, history }) => {

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();
    const [editar, setEditar] = useState(false);

    const comMessaje = getMessaje();
    const infoInversiones = getInfoInvCliente(inversiones);

    const handleEditar = (data) => {

        if (data.name === "" || data.email === "" || data.phone === "") {

            let mje = '';

            (localStorage.getItem('lang') === 'es-MX') ? mje = 'Todos los campos son obligatorios' : mje = 'All fields are required';
            Toast.fire({ icon: 'error', title: mje });

            return;
        }

        let country = localStorage.getItem("countryEdit");

        var contactEdit = {
            _id: contacto._id,
            nombre: data.name,
            correo: data.email,
            nacionalidad: country,
            telefono: data.phone,
            tipoContacto: contacto.tipoContacto,
            fechaAlta: contacto.fechaAlta,
            uidFirebase: contacto.uidFirebase,
        }

        dispatch(startEditContact(contactEdit));

        localStorage.removeItem("countryEdit");
        setEditar(false);
    }

    const handleDelete = () => {

        const mensajesSwal = getMensajesSwal(1, contacto.nombre);

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
                dispatch(startDeleteContact(contacto._id, eventos, inversiones, history));
            }
        });
    }

    const handleChangeTypeContact = () => {

        const mensajesSwal = getMensajesSwal(2);

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

                var contactEdit = {
                    _id: contacto._id,
                    nombre: contacto.nombre,
                    correo: contacto.correo,
                    nacionalidad: contacto.nacionalidad,
                    telefono: contacto.telefono,
                    tipoContacto: 'Inversor',
                    fechaAlta: contacto.fechaAlta,
                    uidFirebase: contacto.uidFirebase,
                }
                
                dispatch(startEditContact(contactEdit));
            }
        });
    }

    return (

        <div className='bg-indigo-600 dark:bg-gray-800 p-3 rounded-2xl mt-md-0 mt-lg-0 mt-3'>

            <div className='row mt-1'>

                <div className='col-12 col-lg-7 col-md-7 border-r-2 border-teal-700 border-dashed'>
                    {
                        (editar)
                            ?
                            (
                                <form onSubmit={handleSubmit(handleEditar)}>
                                    <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.form.1" defaultMessage="Name" /> </h2>
                                        <div className="max-w-sm mx-auto md:w-2/3">
                                            <input
                                                type="text" defaultValue={contacto.nombre} {...register("name")}
                                                className="form-control form-control-lg text-center"
                                            />
                                        </div>
                                    </div>

                                    <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.form.2" defaultMessage="Email" /> </h2>
                                        <div className="max-w-sm mx-auto md:w-2/3">
                                            <input
                                                type="text" defaultValue={contacto.correo} {...register("email")}
                                                className="form-control form-control-lg text-center"
                                            />
                                        </div>
                                    </div>

                                    <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.form.3" defaultMessage="Phone" /> </h2>
                                        <div className="max-w-sm mx-auto md:w-2/3">
                                            <input
                                                type="text" defaultValue={contacto.telefono} {...register("phone")}
                                                className="form-control form-control-lg text-center"
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.form.4" defaultMessage="Nacionality" /> </h2>
                                        <div className="max-w-sm mx-auto md:w-2/3">
                                            <SelectorEdit cty={contacto.nacionalidad} />
                                        </div>
                                    </div>

                                    <div className='row mt-3 me-1 ms-1'>
                                        <div className='col-6'>
                                            <button
                                                className="p-3 rounded-lg bg-indigo-900 text-gray-200 dark:bg-gray-700 dark:text-teal-300 w-100 hover:bg-red-400 hover:text-gray-100 dark:hover:bg-red-400 dark:hover:text-gray-100"
                                                onClick={() => { setEditar(false); localStorage.removeItem("countryEdit"); }} type='button'
                                            >
                                                <p className="font-medium text-lg"><FormattedMessage id="con.screen.form.edit.1" defaultMessage="Cancel" /></p>
                                            </button>
                                        </div>
                                        <div className='col-6'>
                                            <button
                                                className="p-3 rounded-lg bg-indigo-900 text-gray-200 dark:bg-gray-700 dark:text-teal-300 w-100 hover:bg-teal-600 hover:text-gray-100 dark:hover:bg-teal-600 dark:hover:text-gray-100"
                                                type='submit'
                                            >
                                                <p className="font-medium text-lg"><FormattedMessage id="con.screen.form.edit.2" defaultMessage="Confirm" /></p>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )
                            :
                            (
                                <>
                                    <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.form.1" defaultMessage="Name" /> </h2>
                                        <div className="max-w-sm mx-auto md:w-2/3">
                                            <input
                                                type="text" value={contacto.nombre} disabled
                                                className="rounded-lg border-transparent  border border-gray-900 w-full py-2 px-4 bg-gray-400 dark:bg-gray-700 text-gray-900 dark:text-gray-200 text-xl"
                                            />
                                        </div>
                                    </div>

                                    <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.form.2" defaultMessage="Email" /> </h2>
                                        <div className="max-w-sm mx-auto md:w-2/3">
                                            <input
                                                type="text" value={contacto.correo} disabled
                                                className="rounded-lg border-transparent  border border-gray-900 w-full py-2 px-4 bg-gray-400 dark:bg-gray-700 text-gray-900 dark:text-gray-200 text-xl"
                                            />
                                        </div>
                                    </div>

                                    <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.form.3" defaultMessage="Phone" /> </h2>
                                        <div className="max-w-sm mx-auto md:w-2/3">
                                            <input
                                                type="text" value={contacto.telefono} disabled
                                                className="rounded-lg border-transparent  border border-gray-900 w-full py-2 px-4 bg-gray-400 dark:bg-gray-700 text-gray-900 dark:text-gray-200 text-xl"
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.form.4" defaultMessage="Nationality" /> </h2>
                                        <div className="max-w-sm mx-auto md:w-2/3">
                                            <input
                                                type="text" value={contacto.nacionalidad} disabled
                                                className="rounded-lg border-transparent border border-gray-900 w-full py-2 px-4 bg-gray-400 dark:bg-gray-700 text-gray-900 dark:text-gray-200 text-xl"
                                            />
                                        </div>
                                    </div>

                                    <div className='row mt-3 mt-lg-0 mt-md-5 d-flex justify-content-center'>

                                        <div className='col-2 grid place-content-center me-5 me-md-5 me-lg-2 mt-1' onClick={() => { setEditar(!editar) }}>
                                            <div className='p-3 bg-indigo-900 dark:bg-gray-900 text-gray-100 rounded-2xl hover:bg-teal-600 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-teal-600'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className='col-2 grid place-content-center mt-1' onClick={handleDelete}>
                                            <div className='p-3 bg-indigo-900 dark:bg-gray-900 text-gray-100 rounded-2xl hover:bg-red-900 hover:text-gray-100 dark:text-gray-100 dark:hover:bg-red-900'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                        </div>

                                    </div>

                                </>
                            )
                    }
                </div>

                <div className='col-12 col-lg-5 col-md-5'>

                    <div className='ms-3 me-3'>
                        <Separador text={comMessaje} />
                    </div>

                    {/* BOTONES WP - EMAIL */}

                    <div className='row mt-3 mb-3'>
                        <div className='col-6 flex justify-center'>
                            <a
                                href={`https://api.whatsapp.com/send?phone=54${contacto.telefono}`}
                                target="_blank" rel='noreferrer'
                                className="btn bg-indigo-400 text-gray-200 dark:bg-gray-900 dark:text-teal-300 text-lg p-3 hover:bg-emerald-500 hover:text-gray-900 dark:hover:bg-emerald-500 dark:hover:text-gray-900 rounded-2xl"
                            >
                                <i className="fab fa-whatsapp me-3"></i>
                                WhatsApp
                            </a>
                        </div>
                        <div className='col-6 flex justify-center'>
                            <a
                                href={`mailto:${contacto.correo}`}
                                target="_blank" rel='noreferrer'
                                className="btn bg-indigo-400 text-gray-200 dark:bg-gray-900 dark:text-teal-300 text-lg p-3 hover:bg-cyan-300 hover:text-gray-900 dark:hover:bg-cyan-500 dark:hover:text-gray-900 rounded-2xl"
                            >
                                <i className="fas fa-envelope me-3"></i>
                                Email
                            </a>
                        </div>
                    </div >

                    {/* INVERSOR - CAPITAL */}

                    <div className='ms-3 me-3'>

                        <div className='mt-4'>
                            <Separador text={''} />
                        </div>

                        {/* CAPITAL INVERTIDO - BOTON INVERSOR */}

                        <div className='mt-4'>

                            {
                                (contacto.tipoContacto === 'Contacto')
                                    ?
                                    (

                                        <div className='row'>
                                            <div className='col-12 grid place-content-center mt-2'>
                                                <button
                                                    className="p-3 rounded-lg bg-blue-900 text-gray-200 dark:bg-gray-900 dark:text-teal-300 w-100 hover:bg-orange-600 hover:text-gray-900  dark:hover:bg-indigo-800 dark:hover:text-gray-300"
                                                    onClick={handleChangeTypeContact}
                                                >
                                                    <p className="font-medium text-lg"><FormattedMessage id="con.screen.com.button" defaultMessage="Com Inv" /></p>
                                                </button>
                                            </div >

                                            <div className='col-12'>
                                                <div className="shadow-lg rounded-2xl p-2 bg-blue-900 dark:bg-gray-900 w-100 mt-5">
                                                    <p className="text-2xl text-gray-100 ml-3 text-center mt-2"> <FormattedMessage id="con.screen.com.events.tittle" defaultMessage="Event Prog" /> </p>
                                                    <p className="text-cyan-700 text-3xl font-bold my-1 text-center">
                                                        {eventos.length}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                    :
                                    (
                                        <div className='row'>

                                            <div className='col-6'>
                                                <div className="shadow-lg rounded-2xl w-100 p-2 bg-blue-900 dark:bg-gray-900 ">
                                                    <p className="text-2xl text-gray-200 text-center"> <FormattedMessage id="con.screen.com.inv" defaultMessage="Name" /> </p>
                                                    <div className="flex flex-col justify-start">
                                                        <p className="text-2xl text-teal-300 text-center font-bold my-2">
                                                            $ {infoInversiones[0]}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-6'>
                                                <div className="shadow-lg rounded-2xl w-100 p-2 bg-blue-900 dark:bg-gray-900 ">
                                                    <p className="text-2xl text-gray-200 text-center"> <FormattedMessage id="con.screen.com.ben" defaultMessage="Name" /> </p>
                                                    <div className="flex flex-col justify-start">
                                                        <p className="text-2xl text-teal-300 text-center font-bold my-2">
                                                            $ {infoInversiones[1]}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-12 mt-3'>
                                                <div className="shadow-lg rounded-2xl w-100 p-3 bg-blue-900 dark:bg-gray-900 ">
                                                    <p className="text-2xl text-gray-200 text-center"> <FormattedMessage id="con.screen.com.events.tittle" defaultMessage="Event Prog" /> </p>
                                                    <div className="flex flex-col justify-start">
                                                        <p className="text-2xl text-cyan-300 text-center font-bold my-2">
                                                            {eventos.length}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                            }

                        </div >

                    </div>

                </div>

            </div>

        </div>
    )
}