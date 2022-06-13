import { useState } from 'react'
import { useForm } from "react-hook-form";
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getFechaActual } from '../../../helpers/selector';
import { Toast } from '../../../helpers/Toast';
import { startNewContact } from '../../../redux/actions/datosDB';
import { Info } from './Info';
import { Selector } from './Selector';

export const AddScreen = ({ history }) => {

    localStorage.setItem("ruta", `/con/add`);

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);

    const [changeContact, setChangeContact] = useState(true);
    const { register, handleSubmit } = useForm();

    const handleRegister = (data) => {

        if (data.name === "" || data.email === "" || data.phone === "") {

            let mje = '';

            (localStorage.getItem('lang') === 'es-MX') ? mje = 'Todos los campos son obligatorios' : mje = 'All fields are required';
            Toast.fire({ icon: 'error', title: mje });

            return;
        }

        let type = '';
        let country = localStorage.getItem("country");

        (changeContact) ? type = 'Contacto' : type = 'Inversor';

        const fechaAlta = getFechaActual();

        var contacto = {
            nombre: data.name,
            correo: data.email,
            nacionalidad: country,
            telefono: data.phone,
            tipoContacto: type,
            fechaAlta: fechaAlta,
            uidFirebase: uid
        }

        dispatch(startNewContact(contacto, history));
        localStorage.removeItem("country");
    }

    return (
        <div className='container text-gray-100 cont'>

            <div className='row justify-center'>

                <form className='col-12 col-lg-10 col-md-12' onSubmit={handleSubmit(handleRegister)}>

                    <div className='row bg-indigo-600 dark:bg-gray-800 p-4 rounded-2xl'>

                        {/* INPUTS */}

                        <div className='col-12 col-lg-5 col-md-12 me-lg-4'>

                            <div className='col-12'>
                                <div className="form-outline form-white mb-3">
                                    <span className="fs-5 text-gray-300"> <FormattedMessage id="con.name" defaultMessage="Name" /> </span>
                                    <input
                                        type="text" placeholder="Name.." {...register("name")}
                                        className="form-control form-control-lg rounded-lg text-center placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <div className='col-12'>
                                <div className="form-outline form-white mb-3">
                                    <span className="fs-5 text-gray-300"> <FormattedMessage id="con.nac" defaultMessage="Nationality / Residence" /> </span>
                                    <Selector bg={'2'} />
                                </div>
                            </div>

                            <div className='col-12'>
                                <div className="form-outline form-white mb-3">
                                    <span className="fs-5 text-gray-300"> <FormattedMessage id="con.email" defaultMessage="Email" /> </span>
                                    <input
                                        type="email" placeholder="example@gmail.com" {...register("email")}
                                        className="form-control form-control-lg rounded-lg text-center placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <div className='col-12'>
                                <div className="form-outline form-white">
                                    <span className="fs-5 text-gray-300"> <FormattedMessage id="con.phone" defaultMessage="Phone" /> </span>
                                    <input
                                        type="text" placeholder="381..." {...register("phone")}
                                        className="form-control form-control-lg rounded-lg text-center placeholder-gray-400"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* BOTONES */}

                        <div className='col-12 col-lg-6 col-md-12 ms-lg-5 ms-md-2'>

                            {/* TIPO CONTACTO - IMAGEN */}

                            <div className='col-12 mb-4'>

                                <div className='row'>

                                    {/* TIPO */}

                                    <div className='col-6 col-lg-6 col-md-6 bg-indigo-900 dark:bg-gray-900 mt-4 rounded-2xl'>
                                        {
                                            (changeContact)
                                                ?
                                                (
                                                    <div className='row mt-3 mb-3'>
                                                        <div className='col-12'>
                                                            <button type='button' className="p-3 rounded-lg bg-blue-400 text-gray-900 w-100 mb-4" onClick={() => { setChangeContact(true); }}>
                                                                <p className="font-medium text-xl"><FormattedMessage id="con.b1" defaultMessage="Contacts" /></p>
                                                            </button>
                                                        </div>
                                                        <div className='col-12'>
                                                            <button type='button' className="p-3 rounded-lg hover:bg-blue-900 dark:hover:bg-gray-700 hover:text-teal-300 w-100" onClick={() => { setChangeContact(false) }}>
                                                                <p className="font-medium text-xl"><FormattedMessage id="con.b2" defaultMessage="Investor" /></p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='row mt-3 mb-3'>
                                                        <div className='col-12'>
                                                            <button type='button' className="p-3 rounded-lg hover:bg-blue-900 dark:hover:bg-gray-700 hover:text-teal-300 w-100 mb-4" onClick={() => { setChangeContact(true) }}>
                                                                <p className="font-medium text-xl"><FormattedMessage id="con.b1" defaultMessage="Contacts" /></p>
                                                            </button>
                                                        </div>
                                                        <div className='col-12'>
                                                            <button type='button' className="p-3 rounded-lg bg-blue-400 text-gray-900 w-100" onClick={() => { setChangeContact(false) }}>
                                                                <p className="font-medium text-xl"><FormattedMessage id="con.b2" defaultMessage="Investor" /></p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>

                                    {/* IMAGENES */}

                                    <div className='col-5 col-lg-6 col-md-6 ms-lg-0 ms-md-0 ms-4 flex justify-center'>
                                        {
                                            (changeContact)
                                                ? <img alt="profil" src={`../assets/contact1.svg`} className="lg:ml-16 md:ml-16 sm:ml-15 h-30 w-40 mt-4" />
                                                : <img alt="profil" src={`../assets/inversor.svg`} className="lg:ml-16 md:ml-16 sm:ml-15 h-30 w-40 mt-4" />
                                        }
                                    </div>

                                </div>

                            </div>

                            <div className="relative flex mt-2 items-center"> {/* ms-3 */}
                                <div className="flex-grow border-t border-teal-300 dark:border-indigo-400"></div>
                                <span className="flex-shrink mx-4 text-teal-400 dark:text-indigo-400"> <Info /> </span>
                                <div className="flex-grow border-t border-indigo-300 dark:border-indigo-400"></div>
                            </div>

                            {/* REGISTRO */}

                            <div className='col-12 lg:mt-7 md:mt-3 flex lg:justify-end md:justify-center justify-center'>
                                <button type='submit' className="p-3 mt-2 rounded-lg w-50 bg-blue-900 dark:bg-indigo-600 text-gray-200 font-medium hover:font-bold hover:bg-teal-600 dark:hover:bg-indigo-800">
                                    <p className="text-xl"><FormattedMessage id="con.b3" defaultMessage="Register" /></p>
                                </button>
                            </div>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    )
}