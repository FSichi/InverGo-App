import { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './perfil.css'

const avatares = [
    {
        id: '1',
        img: '../assets/avatars/1.svg',
    },
    {
        id: '2',
        img: '../assets/avatars/2.svg',
    },
    {
        id: '3',
        img: '../assets/avatars/3.svg',
    },
    {
        id: '4',
        img: '../assets/avatars/4.svg',
    },
    {
        id: '5',
        img: '../assets/avatars/5.svg',
    },
    {
        id: '6',
        img: '../assets/avatars/6.svg',
    },
    {
        id: '7',
        img: '../assets/avatars/7.svg',
    },
    {
        id: '8',
        img: '../assets/avatars/8.svg',
    },
    {
        id: '9',
        img: '../assets/avatars/9.svg',
    },
    {
        id: '10',
        img: '../assets/avatars/10.svg',
    },
    {
        id: '11',
        img: '../assets/avatars/11.svg',
    },
    {
        id: '12',
        img: '../assets/avatars/12.svg',
    },
    {
        id: '13',
        img: '../assets/avatars/13.svg',
    },
    {
        id: '14',
        img: '../assets/avatars/14.svg',
    },
    {
        id: '15',
        img: '../assets/avatars/15.svg',
    },
    {
        id: '16',
        img: '../assets/avatars/16.svg',
    },
    {
        id: '17',
        img: '../assets/avatars/17.svg',
    },
    {
        id: '18',
        img: '../assets/avatars/18.svg',
    },

]

export const PerfilScreen = () => {

    localStorage.setItem("ruta", `/perfil`);

    const { name, email } = useSelector(state => state.auth);
    const { fichaUser } = useSelector(state => state.infoDB);

    const [avatarView, setAvatarView] = useState(false);
    const [state, setState] = useState(false);
    const [avatarPic, setAvatarPic] = useState('');

    if (localStorage.getItem('avatar') !== null && !state) {
        setAvatarPic(localStorage.getItem('avatar'));
        setState(true);
    }

    const avatarState = () => {
        if (!avatarView) {
            setAvatarView(true);
        } else {
            setAvatarView(false);
            window.location.reload();
        }
    }

    return (

        <div className='container-fluid container-xl list'>
            <div className='row flex justify-center'>

                <div className='col-3 col-lg-3 col-md-12 mt-1'>
                    <div className='bg-indigo-600 dark:bg-gray-800 text-gray-100 p-3 rounded-2xl'>
                        <div className='grid place-content-center mt-5'>
                            <img alt="profil" src={`../assets/avatars/${avatarPic}.svg`} className="h-60" />
                        </div>
                        <button className="p-3 rounded-lg bg-blue-400 text-gray-900 dark:bg-gray-900 dark:text-teal-300 w-100 mt-14 hover:bg-indigo-800 hover:text-gray-100 dark:hover:bg-indigo-800 dark:hover:text-gray-100"
                            onClick={avatarState}
                        >
                            {
                                (avatarView)
                                    ? <p className="font-medium text-xl"><FormattedMessage id="profile.info.avatar.2" defaultMessage="Back" /></p>
                                    : <p className="font-medium text-xl"><FormattedMessage id="profile.info.avatar.1" defaultMessage="Change" /></p>
                            }
                        </button>
                    </div>
                </div>

                {
                    (avatarView)
                        ?
                        (
                            <div className='col-8 col-lg-8 col-md-12 md:mt-5 lg:mt-0'>
                                <div className='bg-indigo-600 dark:bg-gray-800 text-gray-100 p-3 rounded-2xl'>
                                    <div className='row p-4'>
                                        {
                                            (avatares.map(avatar => (
                                                <div key={avatar.id} className='col-2 col-lg-2 col-md-3 mt-3 avatarPic'
                                                    onClick={() => { localStorage.setItem("avatar", `${avatar.id}`); setState(!state) }}
                                                >
                                                    <img alt="avatarPic" src={avatar.img} className="img-fluid rounded" />
                                                </div>
                                            )))
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className='col-8 col-lg-8 col-md-12 md:mt-5 lg:mt-0'>

                                <div className='bg-indigo-600 dark:bg-gray-800 text-gray-100 p-3 rounded-2xl'>

                                    <div className="items-center w-100 p-2 space-y-4 text-gray-100 md:inline-flex md:space-y-0 mt-2">
                                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1">
                                            <FormattedMessage id="profile.info.email" defaultMessage="Email" />
                                        </h2>
                                        <div className="max-w-sm mx-auto md:w-2/3">
                                            <input
                                                type="text" value={email} disabled
                                                className="rounded-lg w-full py-2 px-4 dark:bg-gray-900 dark:text-gray-200 text-xl text-center"
                                            />
                                        </div>
                                    </div>
                                    <div className="items-center w-100 p-2 space-y-4 text-gray-100 md:inline-flex md:space-y-0 mt-3">
                                        <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1">
                                            <FormattedMessage id="profile.info.name" defaultMessage="Nombre y Ap" />
                                        </h2>
                                        <div className="max-w-sm mx-auto md:w-2/3">
                                            <input
                                                type="text" value={name} disabled
                                                className="rounded-lg w-full py-2 px-4 dark:bg-gray-900 dark:text-gray-200 text-xl text-center"
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="flex mt-4">

                                    <div className="shadow-lg rounded-xl bg-indigo-600 dark:bg-gray-800 w-50 md:w-100 p-3 relative overflow-hidden me-3 mt-1">

                                        <p className="text-teal-400 text-2xl">
                                            <FormattedMessage id="profile.info.lic.title.1" defaultMessage="Type of Sus" />
                                        </p>

                                        <div className="flex items-center my-3 text-blue-500 rounded justify-between">
                                            <span className="rounded-lg p-2 bg-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </span>
                                            <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                                                <p className="text-white text-xl">
                                                    {
                                                        (fichaUser.licencia.tipo === 'PA')
                                                            ? <FormattedMessage id="profile.info.lic.1.type.1" defaultMessage="Anual" />
                                                            : <FormattedMessage id="profile.info.lic.1.type.2" defaultMessage="Vit" />
                                                    }
                                                </p>
                                                <p className="text-blue-200 text-lg"> <FormattedMessage id="profile.info.lic.1.type" defaultMessage="Type" /> </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-blue-500 rounded justify-between">
                                            <span className="rounded-lg p-2 bg-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                                </svg>
                                            </span>
                                            <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                                                <p className="text-white text-xl">  $ {(fichaUser.licencia.tipo === 'PA') ? 150 : 450} </p>
                                                <p className="text-blue-200 text-lg"><FormattedMessage id="profile.info.lic.1.value" defaultMessage="Value" /></p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="shadow-lg rounded-xl bg-indigo-600 dark:bg-gray-800 w-full md:w-100 p-3 relative overflow-hidden mt-1">

                                        <p className="text-teal-400 text-2xl ">
                                            <FormattedMessage id="profile.info.lic.title.2" defaultMessage=".." />
                                        </p>

                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className="flex items-center my-3 text-blue-500 rounded justify-between">
                                                    <span className="rounded-lg p-2 bg-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </span>
                                                    <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                                                        <p className="text-white text-xl">
                                                            {
                                                                fichaUser.fechas.inicio[8] + fichaUser.fechas.inicio[9] + '-' +
                                                                fichaUser.fechas.inicio[5] + fichaUser.fechas.inicio[6] + '-' +
                                                                fichaUser.fechas.inicio[0] + fichaUser.fechas.inicio[1] + fichaUser.fechas.inicio[2] + fichaUser.fechas.inicio[3]
                                                            }
                                                        </p>
                                                        <p className="text-blue-200 text-lg"><FormattedMessage id="profile.info.lic.2.startdate" defaultMessage="Start D" /></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="flex items-center my-3 text-blue-500 rounded justify-between">
                                                    <span className="rounded-lg p-2 bg-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </span>
                                                    <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                                                        <p className="text-white text-xl">

                                                            {
                                                                (fichaUser.fechas.finalizacion !== '-')
                                                                    ?
                                                                    (
                                                                        fichaUser.fechas.finalizacion[8] + fichaUser.fechas.finalizacion[9] + '-' +
                                                                        fichaUser.fechas.finalizacion[5] + fichaUser.fechas.finalizacion[6] + '-' +
                                                                        fichaUser.fechas.finalizacion[0] + fichaUser.fechas.finalizacion[1] + fichaUser.fechas.finalizacion[2] + fichaUser.fechas.finalizacion[3]
                                                                    )
                                                                    :
                                                                    (
                                                                        <FormattedMessage id="prices.selection.info.date.frv" defaultMessage="End D" />
                                                                    )
                                                            }
                                                        </p>
                                                        <p className="text-blue-200 text-lg"><FormattedMessage id="profile.info.lic.2.enddate" defaultMessage="End D" /></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className="flex items-center text-blue-500 rounded justify-between">
                                                    <span className="rounded-lg p-2 bg-white">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </span>
                                                    <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                                                        <p className="text-white text-xl">
                                                            {
                                                                (fichaUser.licencia.tipo === 'PA')
                                                                    ? <FormattedMessage id="con.screen.actions.Inv.screen.pl.3.b" defaultMessage="Vit" />
                                                                    : <FormattedMessage id="con.screen.actions.Inv.screen.pl.3.a" defaultMessage="Vit" />
                                                            }
                                                        </p>
                                                        <p className="text-blue-200 text-lg"><FormattedMessage id="profile.info.lic.2.duration" defaultMessage="Duration" /></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <button className="p-3 rounded-lg bg-blue-400 text-gray-900 dark:bg-gray-900 dark:text-teal-300 w-100 mt-3 hover:bg-teal-600 hover:text-gray-100 dark:hover:bg-teal-600 dark:hover:text-gray-100">
                                                    <Link to='/prices' style={{ color: 'inherit', textDecoration: 'inherit' }} className='font-medium text-xl ml-4'>
                                                        <FormattedMessage id="profile.info.lic.2.button" defaultMessage="Extend" />
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        )
                }

            </div>
        </div>
    )
}