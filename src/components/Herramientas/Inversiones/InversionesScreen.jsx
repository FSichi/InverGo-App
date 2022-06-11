import { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { getInversionesContacto } from '../../../helpers/selector';
import { Agregar } from './Agregar';
import { Informacion } from './Informacion';
import { Listado } from './Listado';

export const InversionesScreen = () => {

    localStorage.setItem("ruta", `/tools/inv`);

    const { inversiones } = useSelector(state => state.infoDB);
    const { uid, name } = useSelector(state => state.auth);

    const [changeAccion, setChangeAccion] = useState(true);

    const inversionesUsuario = getInversionesContacto(uid, inversiones);

    return (
        <div className='container text-gray-100 list'>

            <div className='row'>

                <div className='col-12'>
                    <Informacion inversiones={inversionesUsuario} />
                </div>

                {/* TITULO Y MENU OPCIONES */}

                <div className='col-12 mb-3'>

                    <div className='bg-indigo-600 dark:bg-gray-800 rounded-2xl p-2'>

                        {/* MENUS */}

                        <div className='d-flex justify-content-between'>

                            <div className='ms-3'>
                                {
                                    (changeAccion)
                                        ? <p className='text-3xl text-gray-300 mt-4'><FormattedMessage id="tools.inv.title.1" defaultMessage="Title 1" /></p>
                                        : <p className='text-3xl text-gray-300 mt-4'><FormattedMessage id="tools.inv.title.2" defaultMessage="Title 2" /></p>
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
                                                        <p className="font-medium text-xl ml-4"> <FormattedMessage id="tools.inv.option.1" defaultMessage="Option 1" /> </p>
                                                    </button>
                                                </div>

                                                <div className='col-6'>
                                                    <button className="p-3 rounded-lg text-gray-200 hover:bg-indigo-400 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-200 w-100" onClick={() => { setChangeAccion(false) }}>
                                                        <p className="font-medium text-xl ml-4"> <FormattedMessage id="tools.inv.option.2" defaultMessage="Option 2" /> </p>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <button className="p-3 rounded-lg text-gray-200 hover:bg-indigo-400 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-200 w-100" onClick={() => { setChangeAccion(true) }}>
                                                        <p className="font-medium text-xl ml-4"> <FormattedMessage id="tools.inv.option.1" defaultMessage="Option 1" /> </p>
                                                    </button>
                                                </div>

                                                <div className='col-6'>
                                                    <button className="p-3 rounded-lg bg-blue-500 text-gray-200 dark:bg-gray-700 dark:text-teal-300 w-100" onClick={() => { setChangeAccion(false) }}>
                                                        <p className="font-medium text-xl ml-4"> <FormattedMessage id="tools.inv.option.2" defaultMessage="Option 2" /> </p>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                }

                            </div>

                        </div>

                    </div>

                </div>

                {/* CONTENIDO */}

                <div className='col-12 mb-3'>
                    <div className='bg-indigo-600 dark:bg-gray-800 rounded-2xl p-2'>
                        {
                            (changeAccion) ? <Listado inversiones={inversionesUsuario} name={name} /> : <Agregar uid={uid} />
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}