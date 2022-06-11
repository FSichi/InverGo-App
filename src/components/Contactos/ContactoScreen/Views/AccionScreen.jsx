import { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { Eventos } from './Eventos/Eventos';
import { Inversiones } from './Inversiones/Inversiones';

export const AccionScreen = ({ contacto, eventos, inversiones }) => {

    const [changeAccion, setChangeAccion] = useState(false);  // PARA CAMBIAR IVERSIONES - EVENTOS
    const [changeOptionInv, setChangeOptionInv] = useState(true);  // PARA CAMBIAR LISTADO - AGREGAR --> INVERSIONES
    const [changeOptionEv, setChangeOptionEv] = useState(true);   // PARA CAMBIAR LISTADO - AGREGAR --> EVENTOS

    const [showMenu, setShowMenu] = useState(false);
    const [bandera, setBandera] = useState(false);

    if (contacto.tipoContacto === 'Inversor' && !bandera) {
        setChangeAccion(true);
        setBandera(true);
    }

    const setOptionMenu = (option) => {

        if (changeAccion) {
            (option === 1) ? setChangeOptionInv(true) : setChangeOptionInv(false)
        } else {
            (option === 1) ? setChangeOptionEv(true) : setChangeOptionEv(false)
        }

        setShowMenu(false);
    }

    return (
        <div className='row me-1'>

            {/* MENU DE ACCIONES - ELECCIONES */}

            <div className='col-12 bg-indigo-600 dark:bg-gray-800 p-3 rounded-2xl text-gray-100'>

                <div className='row flex justify-between'>

                    {/* BOTONES DE SCREEN */}

                    <div className='col-7 flex justify-center'>

                        {/* TIPO DE CONTACTO - BOTONES */}

                        {
                            (contacto.tipoContacto === 'Inversor')
                                ?
                                (
                                    <div className='w-100'>
                                        {
                                            (changeAccion)
                                                ?
                                                (
                                                    <div className='row w-100'>
                                                        <div className='col-6'>
                                                            <button className="p-3 rounded-lg bg-blue-400 text-gray-900 dark:bg-gray-900 dark:text-teal-300 w-100" onClick={() => { setChangeAccion(true); }}>
                                                                <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.actions.Inv.tittle" defaultMessage="Invert" /></p>
                                                            </button>
                                                        </div>

                                                        <div className='col-6'>
                                                            <button className="p-3 rounded-lg text-gray-200 hover:bg-indigo-900 dark:hover:bg-gray-700 dark:hover:text-teal-300 w-100" onClick={() => { setChangeAccion(false) }}>
                                                                <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.actions.Ev.tittle" defaultMessage="Event" /></p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='row w-100'>
                                                        <div className='col-6'>
                                                            <button className="p-3 rounded-lg text-gray-200 hover:bg-indigo-900 dark:hover:bg-gray-700 dark:hover:text-teal-300 w-100" onClick={() => { setChangeAccion(true) }}>
                                                                <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.actions.Inv.tittle" defaultMessage="Inv" /></p>
                                                            </button>
                                                        </div>

                                                        <div className='col-6'>
                                                            <button className="p-3 rounded-lg bg-blue-400 text-gray-900 dark:bg-gray-900 dark:text-teal-300 w-100" onClick={() => { setChangeAccion(false) }}>
                                                                <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.actions.Ev.tittle" defaultMessage="Event" /></p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>
                                )
                                :
                                (

                                    <div className='w-100'>
                                        <div className='row w-100'>
                                            <div className='col-8'>
                                                <button className="p-3 rounded-lg bg-blue-400 text-gray-900 dark:bg-gray-900 dark:text-teal-300 w-100" onClick={() => { setChangeAccion(false) }}>
                                                    <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.actions.Ev.tittle" defaultMessage="Events" /></p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                        }

                    </div>

                    {/* MENU EMERGENTE */}

                    <div className='col-3 grid place-content-center'>

                        <div className='grid place-content-end'>
                            <div className="relative inline-block text-left">

                                <button type="button" onClick={() => { setShowMenu(!showMenu) }} className="bg-blue-400 text-gray-900 dark:bg-gray-900 dark:text-teal-300 flex items-center justify-center w-full rounded-md px-4 py-2 text-md">
                                    <FormattedMessage id="con.screen.actions.options.1" defaultMessage="Options" />
                                    <svg className='ms-2' width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"></path>
                                    </svg>
                                </button>

                                {
                                    (showMenu)
                                    &&
                                    (
                                        <div className="origin-top-right absolute right-0 mt-3 w-56 rounded-lg shadow-lg bg-indigo-900 dark:bg-black">
                                            <div className="rounded-lg" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                <button onClick={() => { setOptionMenu(1) }} className="rounded-lg w-100 px-4 py-3 text-md text-gray-200 hover:bg-amber-500 hover:text-gray-900 dark:hover:bg-teal-300 dark:hover:text-gray-900" role="menuitem">
                                                    <span className="flex flex-col"> <FormattedMessage id="con.screen.actions.options.2" defaultMessage="List" /> </span>
                                                </button>
                                                <button onClick={() => { setOptionMenu(2) }} className="rounded-lg w-100 px-4 py-3 text-md text-gray-200 hover:bg-amber-500 hover:text-gray-900 dark:hover:bg-teal-300 dark:hover:text-gray-900" role="menuitem">
                                                    <span className="flex flex-col"> <FormattedMessage id="con.screen.actions.options.3" defaultMessage="Add" /> </span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* CONTENIDO */}

            <div className='col-12 bg-indigo-600 dark:bg-gray-800 p-2 rounded-2xl mt-3 text-gray-100'>
                {
                    (changeAccion)
                        ? <Inversiones contacto={contacto} opcion={changeOptionInv} inversiones={inversiones} />
                        : <Eventos contacto={contacto} opcion={changeOptionEv} eventos={eventos} />
                }
            </div>

        </div>
    )
}