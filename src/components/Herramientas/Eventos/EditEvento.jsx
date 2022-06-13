import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl'
import { useDispatch } from 'react-redux';
import { Toast } from '../../../helpers/Toast';
import { startEditEvent } from '../../../redux/actions/datosDB';

export const EditEvento = ({ evento, type, horario, uid }) => {

    const dispatch = useDispatch();

    const [changeTipo, setChangeTipo] = useState(type);
    const [changeHorario, setChangeHorario] = useState(horario);

    const { register, handleSubmit } = useForm();

    const handleSaveEdit = (data) => {

        let mje = '';

        (localStorage.getItem('lang') === 'es-MX') ? mje = 'Todos los campos son obligatorios' : mje = 'All fields are required';

        if (changeHorario && (data.date === '' || data.place === '' || data.clock === '' || data.persona === '')) {

            Toast.fire({ icon: 'error', title: mje });
            return;
        }

        if (!changeHorario && (data.date === '' || data.place === '' || data.persona === '')) {

            Toast.fire({ icon: 'error', title: mje });
            return;
        }

        let typeEvent = '';
        let horarioEvent = '-';

        (changeTipo) ? (typeEvent = 'Reunion') : (typeEvent = 'Conferencia');
        (changeHorario) ? (horarioEvent = data.clock) : (horarioEvent = '-');

        var eventoEdit = {
            _id: evento._id,
            fecha: data.date,
            hora: horarioEvent,
            lugar: data.place,
            persona: data.persona,
            tipo: typeEvent,
            uid: {
                firebase: uid,
                enlace: uid
            }
        }

        dispatch(startEditEvent(eventoEdit));
    }

    return (
        <div className='col-12 mt-3' >

            <form className='row flex justify-between' onSubmit={handleSubmit(handleSaveEdit)}>

                {/* INPUTS */}

                <div className='col-7 dark:bg-gray-900 ms-3 p-2 rounded-2xl'>

                    {/* PERSONA */}

                    <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1">
                            <FormattedMessage id="con.screen.actions.Ev.add.form.1" defaultMessage="Person" />
                        </h2>
                        <div className="max-w-sm mx-auto md:w-2/3">
                            <input
                                type="text" defaultValue={evento.persona} {...register("persona")}
                                className="form-control form-control-lg rounded-lg text-center "
                            />
                        </div>
                    </div>

                    {/* FECHA EVENTO */}

                    <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1">
                            <FormattedMessage id="con.screen.actions.Ev.add.form.2" defaultMessage="Event Date" />
                        </h2>
                        <div className="max-w-sm mx-auto md:w-2/3">
                            <input
                                type="date" defaultValue={evento.fecha} {...register("date")}
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
                                    <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1">
                                        <FormattedMessage id="con.screen.actions.Ev.add.form.3" defaultMessage="Hour" />
                                    </h2>
                                    <div className="max-w-sm mx-auto md:w-2/3">
                                        <input
                                            type="time" defaultValue={evento.hora} {...register("clock")}
                                            className="form-control form-control-lg rounded-lg text-center placeholder-gray-400"
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </>

                    {/* LUGAR / APP  */}

                    <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1">
                            <FormattedMessage id="con.screen.actions.Ev.add.form.4" defaultMessage="Place" />
                        </h2>
                        <div className="max-w-sm mx-auto md:w-2/3">
                            <input
                                type="text" defaultValue={evento.lugar} {...register("place")}
                                className="form-control form-control-lg rounded-lg text-center placeholder-gray-400"
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
                                            <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.actions.Ev.add.b.1" defaultMessage="Meeting" /></p>
                                        </button>

                                        <button
                                            className="p-3 rounded-lg text-gray-200 hover:bg-indigo-400 hover:text-gray-900 dark:hover:bg-indigo-900 dark:hover:text-gray-200 w-100"
                                            onClick={() => { setChangeTipo(false) }} type="button"
                                        >
                                            <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.actions.Ev.add.b.2" defaultMessage="Conference" /></p>
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
                                            <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.actions.Ev.add.b.1" defaultMessage="Meeting" /></p>
                                        </button>

                                        <button
                                            className="p-3 rounded-lg bg-blue-500 text-gray-200 dark:bg-gray-700 dark:text-teal-300 w-100"
                                            onClick={() => { setChangeTipo(false) }} type="button"
                                        >
                                            <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.actions.Ev.add.b.2" defaultMessage="Conference" /></p>
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

                    {/* BOTON GUARDAR */}

                    <div className='mt-4 flex justify-center'>
                        <button
                            className="p-3 rounded-lg w-100 md:mr-0 md:ml-0 lg:mr-24 lg:ml-24 bg-indigo-900 dark:bg-gray-900 dark:text-teal-300 hover:bg-teal-400 hover:text-gray-900 dark:hover:bg-green-900 dark:hover:text-gray-200"
                            type="submit"
                        >
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 me-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                <p className=" font-medium text-xl">
                                    <FormattedMessage id="con.screen.actions.Ev.add.b.4" defaultMessage="Save" />
                                </p>
                            </div>
                        </button>
                    </div>

                </div>

            </form>

        </div>
    )
}