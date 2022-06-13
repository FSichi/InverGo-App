import { useContext, useState } from 'react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, LogoutIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import './Navbar.css';
import Switch from '../Grafics/Switch'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { startLogOut } from '../../../redux/actions/auth'
import { langContext } from '../../../context/langContext'
import es from './img/spain.png';
import en from './img/united-kingdom.png';
import { FormattedMessage } from 'react-intl'
import { contactosLogsEng, contactosLogsEsp, herramientasLogEng, herramientasLogEsp, perfilLogsEng, perfilLogsEsp, configLogsEng, configLogsEsp, menuHamburguesaLogsEng, menuHamburguesaLogsEsp } from './Logs'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

export default function NavBar() {

    const dispatch = useDispatch();
    const idioma = useContext(langContext);

    const [state, setState] = useState(false);
    const [contactosLog, setContactosLog] = useState([]);
    const [herramientasLog, setHerramientasLog] = useState([]);
    const [perfilLogs, setPerfilLog] = useState([]);
    const [configLogs, setConfigLog] = useState([]);
    const [menuHamburguesaLogs, setMenuHamburguesaLogs] = useState([]);

    const lang = localStorage.getItem('lang');

    if (lang === 'es-MX' && !state) {
        setContactosLog(contactosLogsEsp);
        setHerramientasLog(herramientasLogEsp);
        setPerfilLog(perfilLogsEsp);
        setConfigLog(configLogsEsp);
        setMenuHamburguesaLogs(menuHamburguesaLogsEsp);
        setState(true);
    } else if (lang === 'en-US' && !state) {
        setContactosLog(contactosLogsEng);
        setHerramientasLog(herramientasLogEng);
        setPerfilLog(perfilLogsEng);
        setConfigLog(configLogsEng);
        setMenuHamburguesaLogs(menuHamburguesaLogsEng);
        setState(true);
    }

    const handleLogOut = () => {

        (lang === 'es-MX')
            ? Toast.fire({ icon: 'success', title: 'Logout Exitoso. Hasta pronto!' })
            : Toast.fire({ icon: 'success', title: 'Logout Successful. See you soon!' })

        localStorage.removeItem('ruta');
        dispatch(startLogOut());
    }

    return (
        <Popover
            className="relative text-gray-900 bg-indigo-500 dark:text-white dark:bg-gray-800 lg:ml-3 lg:mr-3 md:ml-2 md:mr-2 rounded-xl"
            style={{ padding: '11px 0px' }}
        >
            {/* MENU NORMAL */}

            <div className="mx-auto px-4 sm:px-6">

                <div className="flex justify-between items-center md:justify-start md:space-x-12">

                    {/* IMAGEN LOGO */}
                    <div className="flex justify-start lg:w-0 lg:flex-1 me-md-5 me-lg-0">
                        <Link to="/dashboard">
                            <span className="sr-only">Workflow</span>
                            <img
                                className="h-8 w-auto sm:h-10" style={{ width: '50px', height: '50px' }}
                                src={`../../assets/logo2.svg`} alt="Logo NavBar"
                            />
                        </Link>
                        <span className='ms-4 fs-5 hidden md:block text-white' style={{ marginTop: '12px' }}>InverGo</span>
                    </div>

                    {/* BOTON HAMBURGUESA */}

                    <div className="-mr-2 -my-2 md:hidden">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>

                    {/* PARTE CENTRAL */}

                    <Popover.Group as="nav" className="hidden md:flex justify-between space-x-10">

                        {/* CONTACTOS */}

                        <Popover className="relative">
                            {({ open, close }) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? 'text-gray-800 dark:text-teal-300' : 'text-white',
                                            'group rounded-md inline-flex items-center text-base font-medium'
                                        )}
                                    >
                                        <span> <FormattedMessage id="navbar.contact" defaultMessage="Contacts" /> </span>

                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-gray-900 dark:text-teal-300' : 'text-gray-400',
                                                'ml-2 h-5 w-5 group-hover:text-gray-900'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >

                                        <Popover.Panel
                                            className="mt-5 absolute z-10 -ml-4 transform w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2 md:-translate-x-1/4 bg-indigo-300 dark:bg-black"
                                            style={{ borderRadius: '10px' }}
                                        >
                                            <div className="shadow-sm dark:shadow-lg">
                                                <div className="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8" >
                                                    {contactosLog.map((item) => (
                                                        <Link
                                                            key={item.name} to={item.href} onClick={() => close()}
                                                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-indigo-200 dark:hover:bg-gray-900"
                                                        >
                                                            <item.icon className="flex-shrink-0 h-6 w-6 text-gray-900 dark:text-indigo-600 me-3" />

                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-900 dark:text-indigo-600">{item.name}</p>
                                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>

                                            </div>

                                        </Popover.Panel>

                                    </Transition>
                                </>
                            )}
                        </Popover>

                        {/* HERRAMIENTAS */}

                        <Popover className="relative">
                            {({ open, close }) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? 'text-gray-800 dark:text-teal-300' : 'text-white',
                                            'group rounded-md inline-flex items-center text-base font-medium'
                                        )}
                                    >
                                        <span> <FormattedMessage id="navbar.tools" defaultMessage="Tools" /> </span>

                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-gray-900 dark:text-teal-300' : 'text-gray-400',
                                                'ml-2 h-5 w-5 group-hover:text-gray-900'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            className="mt-5 absolute z-10 -ml-4 transform w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2 md:-translate-x-1/4 bg-indigo-300 dark:bg-black"
                                            style={{ borderRadius: '10px' }}
                                        >
                                            <div className="shadow-sm dark:shadow-lg rounded-lg">
                                                <div className="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8">
                                                    {herramientasLog.map((item) => (
                                                        <Link
                                                            key={item.name} to={item.href} onClick={() => close()}
                                                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-indigo-200 dark:hover:bg-gray-900"
                                                        >
                                                            <item.icon className="flex-shrink-0 h-6 w-6 text-gray-900 dark:text-indigo-600 me-3" />

                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-900 dark:text-indigo-600">{item.name}</p>
                                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>

                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>

                    </Popover.Group>

                    {/* PARTE DERECHA */}

                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">

                        {/* PERFIL */}

                        <Popover className="relative">
                            {({ open, close }) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? 'text-gray-800 dark:text-teal-300' : 'text-white',
                                            'group rounded-md inline-flex items-center text-base font-medium'
                                        )}
                                    >
                                        <span className="nav-link me-5">
                                            <img
                                                src={`../assets/avatars/${localStorage.getItem('avatar')}.svg`}
                                                alt="Perfil IMG" className="perfilPic"
                                            />
                                        </span>

                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-gray-900 dark:text-teal-300' : 'text-gray-400',
                                                'ml-2 h-5 w-5 group-hover:text-gray-900'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            className="mt-4 absolute z-10 left-1/10 transform -translate-x-1/2 w-screen max-w-md sm:px-0 menuMas bg-indigo-300 dark:bg-black"
                                            style={{ borderRadius: '10px' }}
                                        >
                                            <div className="shadow-sm dark:shadow-lg rounded-lg">
                                                <div className="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8">
                                                    {perfilLogs.map((item) => (
                                                        <Link
                                                            key={item.name} to={item.href} onClick={() => close()}
                                                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-indigo-200 dark:hover:bg-gray-900"
                                                        >
                                                            <item.icon className="flex-shrink-0 h-6 w-6 text-gray-900 dark:text-indigo-600 me-3" />
                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-900 dark:text-indigo-600">{item.name}</p>
                                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                    <button
                                                        className="-m-3 p-3 flex items-start rounded-lg hover:bg-indigo-200 dark:hover:bg-gray-900 text-start"
                                                        onClick={handleLogOut}
                                                    >
                                                        <LogoutIcon className="flex-shrink-0 h-6 w-6 text-gray-900 dark:text-indigo-600 me-3" />

                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-gray-900 dark:text-indigo-600"><FormattedMessage id="navbar.logout" defaultMessage="LogOut" /></p>
                                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400"><FormattedMessage id="navbar.logout.desc" defaultMessage="LogOut Desc" /></p>
                                                        </div>
                                                    </button>

                                                </div>
                                                <div className="px-5 py-4 bg-indigo-400 dark:bg-slate-800 sm:px-8 sm:py-8 rounded-b-xl">
                                                    <div>
                                                        <h3 className="text-sm tracking-wide font-semibold dark:font-medium text-gray-900 dark:text-white uppercase"><FormattedMessage id="navbar.settings" defaultMessage="Settings" /></h3>

                                                        {/* IDIOMA */}

                                                        <div className='row mt-4'>
                                                            <div className='col-6'>
                                                                <div className='row'>
                                                                    <div className='col-2'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                                                        </svg>
                                                                    </div>
                                                                    <div className='col-8 ms-3'>
                                                                        <p className='mt-1'> <FormattedMessage id="navbar.settings.lang" defaultMessage="Languaje" /> </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-3'>
                                                                <button
                                                                    className="-m-3 p-2 flex items-start rounded-lg text-teal-400 hover:bg-gray-900 hover:text-white"
                                                                    onClick={() => { idioma.establecerLenguaje('es-MX'); window.location.reload(); }}
                                                                >
                                                                    <img src={es} alt="" style={{ width: '40px', height: '40px' }} className='ms-2 me-2' />
                                                                </button>
                                                            </div>
                                                            <div className='col-3'>
                                                                <button
                                                                    className="-m-3 p-2 flex items-start rounded-lg text-teal-400 hover:bg-gray-900 hover:text-white"
                                                                    onClick={() => { idioma.establecerLenguaje('en-US'); window.location.reload(); }}
                                                                >
                                                                    <img src={en} alt="" style={{ width: '40px', height: '40px' }} className='ms-2 me-2' />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* MODO DE COLOR - TEMA */}

                                                        <div className='row mt-4'>
                                                            <div className='col-6 mt-2'>
                                                                <div className='row'>
                                                                    <div className='col-2'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                                        </svg>
                                                                    </div>
                                                                    <div className='col-8 ms-3'>
                                                                        <p className='mt-1'> <FormattedMessage id="navbar.settings.apearence" defaultMessage="Appearance" /> </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-6 mt-2'>
                                                                <Switch />
                                                            </div>
                                                        </div>

                                                        <ul className="mt-4 text-center">
                                                            {configLogs.map((item) => (
                                                                <Link
                                                                    key={item.id} to={item.href} onClick={() => close()}
                                                                    className="text-base truncate"
                                                                >
                                                                    <p className="font-medium text-gray-900 dark:text-gray-500 hover:text-gray-200 dark:hover:text-gray-300 my-2 ml-4">{item.name}</p>
                                                                </Link>
                                                            ))}
                                                        </ul>

                                                    </div>

                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>

                    </div>

                </div>

            </div>

            {/* CUANDO ES MENU HAMBURGUESA */}

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className="absolute top-1 inset-x-0 p-2 transition transform origin-top-right md:hidden" style={{ zIndex: '1' }}>
                    {({ open, close }) => (

                        <div className="rounded-lg divide-y-2 divide-gray-50 bg-indigo-300 dark:bg-black" >
                            <div className="pt-4 pb-6 px-4">

                                {/* CERRAR MENU Y LOGO */}

                                <div className="flex items-center justify-between">
                                    <div>
                                        <img className="h-8 w-auto" src={`../../assets/logo2.svg`} style={{ width: '50px', height: '50px' }} alt="Workflow" />
                                    </div>

                                    <span className='fs-5 text-gray-900 dark:text-gray-200' style={{ marginTop: '12px' }}>InverGo</span>

                                    <div className="-mr-2">
                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>

                                {/* RUTAS */}

                                <div className="mt-10">
                                    <nav className="grid gap-y-7">
                                        {menuHamburguesaLogs.map((item) => (
                                            <Link
                                                key={item.name} to={item.href} onClick={() => close()}
                                                className="-m-3 p-3 flex rounded-lg hover:bg-indigo-200 dark:hover:bg-gray-900"
                                            >
                                                <item.icon className="flex-shrink-0 h-6 w-6 text-gray-900 dark:text-indigo-600 me-3" />

                                                <div className="ml-2">
                                                    <p className="text-base font-medium text-gray-900 dark:text-gray-200">{item.name}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </nav>
                                </div>

                                <div className='mt-3 mb-3'>
                                    <hr />
                                </div>

                                {/* CONFIGURACION */}

                                <div className="mt-6">

                                    {/* LOGOUT */}

                                    <div className='flex justify-center'>
                                        <button
                                            className="-m-3 p-3 rounded-xl hover:bg-indigo-200 dark:hover:bg-gray-900 flex"
                                            onClick={handleLogOut}
                                        >
                                            <LogoutIcon className="flex-shrink-0 h-6 w-6 text-gray-900 dark:text-red-600 me-3" />

                                            <div className="ml-2">
                                                <p className="text-base font-medium text-gray-900 dark:text-gray-200"><FormattedMessage id="navbar.logout" defaultMessage="LogOut" /></p>
                                            </div>

                                        </button>
                                    </div>



                                    <div className="px-5 py-3 bg-indigo-400 dark:bg-slate-800 rounded-xl mt-4">
                                        <div>
                                            <h3 className="text-sm text-center tracking-wide font-semibold dark:font-medium text-gray-900 dark:text-white uppercase"><FormattedMessage id="navbar.settings" defaultMessage="Settings" /></h3>

                                            {/* IDIOMA */}

                                            <div className='row mt-4'>

                                                {/*                                                 <div className='col-2 me-4'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                                    </svg>
                                                </div> */}

                                                <div className='col-6 flex justify-center'>
                                                    <button
                                                        className="-m-3 p-2 flex items-start rounded-lg text-teal-400 hover:bg-gray-900 hover:text-white"
                                                        onClick={() => { idioma.establecerLenguaje('es-MX'); window.location.reload(); }}
                                                    >
                                                        <img src={es} alt="" style={{ width: '40px', height: '40px' }} className='ms-2 me-2' />
                                                    </button>
                                                </div>
                                                <div className='col-6 flex justify-center'>
                                                    <button
                                                        className="-m-3 p-2 flex items-start rounded-lg text-teal-400 hover:bg-gray-900 hover:text-white"
                                                        onClick={() => { idioma.establecerLenguaje('en-US'); window.location.reload(); }}
                                                    >
                                                        <img src={en} alt="" style={{ width: '40px', height: '40px' }} className='ms-2 me-2' />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* MODO DE COLOR - TEMA */}

                                            <div className='row mt-5'>
                                                <div className='col-6 mt-2 flex justify-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                    </svg>
                                                </div>
                                                <div className='col-6 mt-2 flex justify-center'>
                                                    <Switch />
                                                </div>
                                            </div>

                                            <div className='mt-3 mb-2'>
                                                <hr />
                                            </div>

                                            <ul className="mt-4 text-center">
                                                {configLogs.map((item) => (
                                                    <Link
                                                        key={item.id} to={item.href} onClick={() => close()}
                                                        className="truncate"
                                                    >
                                                        <p className="text-lg font-medium text-gray-900 dark:text-gray-500 hover:text-gray-200 dark:hover:text-gray-300 my-2 ">{item.name}</p>
                                                    </Link>
                                                ))}
                                            </ul>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    )}

                </Popover.Panel>
            </Transition>

        </Popover>
    )
}