import { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { startNewEvento } from '../../../../../redux/actions/datosDB';
import { Toast } from '../../../../../helpers/Toast';

export const Agregar = ({ contacto }) => {

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const [changeTipo, setChangeTipo] = useState(true);
    const [changeHorario, setChangeHorario] = useState(false);

    const handleAddEvent = (data) => {

        let mje = '';

        (localStorage.getItem('lang') === 'es-MX') ? mje = 'Todos los campos son obligatorios' : mje = 'All fields are required';

        if (changeHorario && (data.date === '' || data.place === '' || data.clock === '')) {

            Toast.fire({ icon: 'error', title: mje });
            return;
        }

        if (!changeHorario && (data.date === '' || data.place === '')) {

            Toast.fire({ icon: 'error', title: mje });
            return;
        }

        let typeEvent = '';
        let horarioEvent = '-';

        (changeTipo) ? (typeEvent = 'Reunion') : (typeEvent = 'Conferencia');
        (changeHorario) ? (horarioEvent = data.clock) : (horarioEvent = '-');

        var eventoNew = {
            fecha: data.date,
            hora: horarioEvent,
            lugar: data.place,
            persona: contacto.nombre,
            tipo: typeEvent,
            uid: {
                firebase: contacto.uidFirebase,
                enlace: contacto._id
            }
        }

        dispatch(startNewEvento(eventoNew));
    }

    return (
        <form className='row' onSubmit={handleSubmit(handleAddEvent)}>

            {/* INPUTS */}

            <div className='col-8'>

                {/* PERSONA */}

                <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.actions.Ev.add.form.1" defaultMessage="Person" /> </h2>
                    <div className="max-w-sm mx-auto md:w-2/3">
                        <input
                            type="text" defaultValue={contacto.nombre} disabled
                            className="form-control form-control-lg rounded-lg text-center inputPerson"
                        />
                    </div>
                </div>

                {/* FECHA EVENTO */}

                <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.actions.Ev.add.form.2" defaultMessage="Date Ev" /> </h2>
                    <div className="max-w-sm mx-auto md:w-2/3">
                        <input
                            type="date" {...register("date")}
                            className="form-control form-control-lg rounded-lg text-center "
                        />
                    </div>
                </div>

                {/* HORA*/}

                <>
                    {
                        (changeHorario)
                        &&
                        (
                            <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                                <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.actions.Ev.add.form.3" defaultMessage="Hour Ev" /> </h2>
                                <div className="max-w-sm mx-auto md:w-2/3">
                                    <input
                                        type="time" placeholder=" ... " {...register("clock")}
                                        className="form-control form-control-lg rounded-lg text-center"
                                    />
                                </div>
                            </div>
                        )
                    }
                </>

                {/* LUGAR / APP  */}

                <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.actions.Ev.add.form.4" defaultMessage="Place App" /> </h2>
                    <div className="max-w-sm mx-auto md:w-2/3">
                        <input
                            type="text" placeholder=" ... " {...register("place")}
                            className="form-control form-control-lg rounded-lg text-center"
                        />
                    </div>
                </div>

            </div>

            {/* BOTONES */}

            <div className='col-4'>

                {/* BOTONES --> REUNION - CONFERENCIA */}

                <div className='bg-blue-900 dark:bg-gray-900 p-3 rounded-2xl'>
                    {
                        (changeTipo)
                            ?
                            (
                                <>
                                    <button
                                        className="p-3 rounded-lg bg-blue-500 text-gray-200 dark:bg-gray-700 dark:text-teal-300 w-100 mb-4"
                                        onClick={() => { setChangeTipo(true) }} type="button"
                                    >
                                        <p className=" font-medium text-xl ml-4"> <FormattedMessage id="con.screen.actions.Ev.add.b.1" defaultMessage="Meeting" /> </p>
                                    </button>

                                    <button
                                        className="p-3 rounded-lg text-gray-200 hover:bg-indigo-400 hover:text-gray-900 dark:hover:bg-indigo-900 dark:hover:text-gray-200 w-100"
                                        onClick={() => { setChangeTipo(false) }} type="button"
                                    >
                                        <p className="font-medium text-xl ml-4"> <FormattedMessage id="con.screen.actions.Ev.add.b.2" defaultMessage="Conference" /> </p>
                                    </button>
                                </>
                            )
                            :
                            (
                                <>
                                    <button
                                        className="p-3 rounded-lg text-gray-200 hover:bg-indigo-400 hover:text-gray-900 dark:hover:bg-indigo-900 dark:hover:text-gray-200 w-100 mb-4"
                                        onClick={() => { setChangeTipo(true) }} type="button"
                                    >
                                        <p className=" font-medium text-xl ml-4"> <FormattedMessage id="con.screen.actions.Ev.add.b.1" defaultMessage="Meeting" /> </p>
                                    </button>

                                    <button
                                        className="p-3 rounded-lg bg-blue-500 text-gray-200 dark:bg-gray-700 dark:text-teal-300 w-100"
                                        onClick={() => { setChangeTipo(false) }} type="button"
                                    >
                                        <p className=" font-medium text-xl ml-4"> <FormattedMessage id="con.screen.actions.Ev.add.b.2" defaultMessage="Conference" /> </p>
                                    </button>
                                </>
                            )
                    }
                </div>

                {/* AGREGAR HORARIO */}

                <div className='row mt-3 d-flex justify-content-center'>
                    <div className='col-4 grid place-content-center' onClick={() => { setChangeHorario(!changeHorario) }}>
                        <div className='p-3 rounded-2xl bg-blue-900 dark:bg-gray-900 text-gray-100 hover:bg-teal-400 hover:text-gray-900 dark:hover:bg-teal-600 dark:hover:text-gray-900'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div >

                {/* BOTON AGREGAR */}

                <div className='flex justify-center mt-2'>
                    <button
                        className="p-3 rounded-lg w-75 bg-blue-500 dark:bg-gray-900 dark:text-teal-300  hover:bg-indigo-900 hover:text-gray-100 dark:hover:bg-green-900 dark:hover:text-gray-200"
                        type="submit"
                    >
                        <p className="font-medium text-xl ml-4"> <FormattedMessage id="con.screen.actions.Ev.add.b.3" defaultMessage="Add Ev" /> </p>
                    </button>
                </div>

            </div>

        </form>
    )
}