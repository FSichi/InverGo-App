import { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { getEventosContacto } from '../../../helpers/selector';
import { Agregar } from './Agregar';
import { Listado } from './Listado';

export const EventosScreen = () => {

    localStorage.setItem("ruta", `/tools/evt`);

    const [changeAccion, setChangeAccion] = useState(true);  // PARA CAMBIAR LISTADO - AGREGAR

    const { uid, name } = useSelector(state => state.auth);
    const { eventos } = useSelector(state => state.infoDB);

    const eventosContacto = getEventosContacto(uid, eventos);

    return (
        <div className='container text-gray-100 list'>
            <div className='row'>

                <div className='col-12 mb-3'>

                    <div className='bg-indigo-600 dark:bg-gray-800 rounded-2xl p-3'>

                        {/* MENUS */}

                        <div className='d-flex justify-content-between mb-3'>

                            <div className='mt-2'>
                                {
                                    (changeAccion)
                                        ? <p className='text-3xl text-gray-300 mt-3 ms-5'> <FormattedMessage id="tools.evt.title.1" defaultMessage="Title 1" /> </p>
                                        : <p className='text-3xl text-gray-300 mt-3 ms-5'> <FormattedMessage id="tools.evt.title.2" defaultMessage="Title 2" /> </p>
                                }
                            </div>

                            {/* MENU BOTONES */}

                            <div className='col-6 bg-blue-900 dark:bg-gray-900 p-2 rounded-2xl'>

                                {
                                    (changeAccion)
                                        ?
                                        (
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <button className="p-3 rounded-lg bg-blue-500 text-gray-200 dark:bg-gray-700 dark:text-teal-300 w-100" onClick={() => { setChangeAccion(true); }}>
                                                        <p className="font-medium text-xl ml-4"><FormattedMessage id="tools.evt.option.1" defaultMessage="Title 1" /></p>
                                                    </button>
                                                </div>

                                                <div className='col-6'>
                                                    <button className="p-3 rounded-lg text-gray-200 hover:bg-indigo-400 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-200 w-100" onClick={() => { setChangeAccion(false) }}>
                                                        <p className="font-medium text-xl ml-4"><FormattedMessage id="tools.evt.option.2" defaultMessage="Title 2" /></p>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <button className="p-3 rounded-lg text-gray-200 hover:bg-indigo-400 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-200 w-100" onClick={() => { setChangeAccion(true) }}>
                                                        <p className="font-medium text-xl ml-4"><FormattedMessage id="tools.evt.option.1" defaultMessage="Title 1" /></p>
                                                    </button>
                                                </div>

                                                <div className='col-6'>
                                                    <button className="p-3 rounded-lg bg-blue-500 text-gray-200 dark:bg-gray-700 dark:text-teal-300 w-100" onClick={() => { setChangeAccion(false) }}>
                                                        <p className="font-medium text-xl ml-4"><FormattedMessage id="tools.evt.option.2" defaultMessage="Title 2" /></p>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                }

                            </div>

                        </div>

                        {/* CONTENIDO */}

                        <div className='border-t-2 border-teal-300 dark:border-indigo-600'>
                            {
                                (changeAccion)
                                    ? <Listado eventos={eventosContacto} uid={uid} name={name} />
                                    : <Agregar uid={uid} />
                            }
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}