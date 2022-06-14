import React from 'react'
import { FormattedMessage } from 'react-intl'
import { getPorcentajeBarraInversion } from '../../../../../helpers/selector'

export const ViewInversion = ({ inversion }) => {

    const barra = getPorcentajeBarraInversion(inversion);

    // console.log('Inversion', inversion);

    return (
        <div className='row lg:mt-5 md:mt-4'>

            <div className='col-4 col-lg-4 col-md-6'>
                <div className="shadow-lg rounded-xl bg-blue-900 dark:bg-gray-900 w-full md:w-100 p-3 relative overflow-hidden me-3">

                    <p className="text-teal-400 text-2xl"> <FormattedMessage id="con.screen.actions.Inv.screen.cap" defaultMessage="Capital" /> </p>

                    <div className="flex items-center my-3 text-blue-500 rounded justify-between">
                        <span className="rounded-lg p-2 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </span>
                        <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                            <p className="text-white text-xl">$ {inversion.capitales.capital}</p>
                            <p className="text-blue-200 text-lg"><FormattedMessage id="con.screen.actions.Inv.screen.cap.1" defaultMessage="Capital 1" /></p>
                        </div>
                    </div>

                    <div className="flex items-center my-3 text-blue-500 rounded justify-between">
                        <span className="rounded-lg p-2 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                            <p className="text-white text-xl">$ {parseInt(inversion.capitales.capitalFinal) - parseInt(inversion.capitales.capital)}</p>
                            <p className="text-blue-200 text-lg"><FormattedMessage id="con.screen.actions.Inv.screen.cap.2" defaultMessage="Capital 2" /></p>
                        </div>
                    </div>

                    <div className="flex items-center text-blue-500 rounded justify-between">
                        <span className="rounded-lg p-2 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </span>
                        <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                            <p className="text-white text-xl">$ {inversion.capitales.capitalFinal}</p>
                            <p className="text-blue-200 text-lg"><FormattedMessage id="con.screen.actions.Inv.screen.cap.3" defaultMessage="Capital 3" /></p>
                        </div>
                    </div>

                </div>
            </div>

            <div className='col-4 col-lg-4 col-md-6'>
                <div className="shadow-lg rounded-xl bg-blue-900 dark:bg-gray-900 w-full md:w-100 p-3 relative overflow-hidden">

                    <p className="text-teal-400 text-2xl"> <FormattedMessage id="con.screen.actions.Inv.screen.pl" defaultMessage="Plazo" /> </p>

                    <div className="flex items-center my-3 text-blue-500 rounded justify-between">
                        <span className="rounded-lg p-2 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                            <p className="text-white text-xl">
                                {
                                    inversion.fechas.inicio[8] + inversion.fechas.inicio[9] + '-' +
                                    inversion.fechas.inicio[5] + inversion.fechas.inicio[6] + '-' +
                                    inversion.fechas.inicio[0] + inversion.fechas.inicio[1] + inversion.fechas.inicio[2] + inversion.fechas.inicio[3]
                                }
                            </p>
                            <p className="text-blue-200 text-lg"><FormattedMessage id="con.screen.actions.Inv.screen.pl.1" defaultMessage="Plazo 1" /></p>
                        </div>
                    </div>

                    <div className="flex items-center my-3 text-blue-500 rounded justify-between">
                        <span className="rounded-lg p-2 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                            <p className="text-white text-xl">
                                {
                                    inversion.fechas.fin[8] + inversion.fechas.fin[9] + '-' +
                                    inversion.fechas.fin[5] + inversion.fechas.fin[6] + '-' +
                                    inversion.fechas.fin[0] + inversion.fechas.fin[1] + inversion.fechas.fin[2] + inversion.fechas.fin[3]
                                }
                            </p>
                            <p className="text-blue-200 text-lg"><FormattedMessage id="con.screen.actions.Inv.screen.pl.2" defaultMessage="Plazo 2" /></p>
                        </div>
                    </div>

                    <div className="flex items-center text-blue-500 rounded justify-between">
                        <span className="rounded-lg p-2 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                            <p className="text-white text-xl"> <FormattedMessage id="con.screen.actions.Inv.screen.pl.3.a" defaultMessage="16 M" /> </p>
                            <p className="text-blue-200 text-lg"><FormattedMessage id="con.screen.actions.Inv.screen.pl.3" defaultMessage="Plazo 3" /></p>
                        </div>
                    </div>

                </div>
            </div>

            <div className='col-4 col-lg-4 col-md-6 lg:mt-0 md:mt-5 flex justify-center d-md-none d-lg-block '>
                <div className="shadow-lg rounded-xl bg-blue-900 dark:bg-gray-900 w-full md:w-100 p-3 relative overflow-hidden">

                    <p className="text-teal-400 text-2xl"> <FormattedMessage id="con.screen.actions.Inv.screen.inv" defaultMessage="Investment" /> </p>

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
                                    (inversion.tipo === 'Compuesto')
                                        ? <FormattedMessage id="con.screen.actions.Inv.table.tipo.a" defaultMessage="Compound" />
                                        : <FormattedMessage id="con.screen.actions.Inv.table.tipo.b" defaultMessage="Simple" />
                                }
                            </p>
                            <p className="text-blue-200 text-lg"><FormattedMessage id="con.screen.actions.Inv.screen.inv.1" defaultMessage="Investment 1" /></p>
                        </div>
                    </div>

                    <div className="flex items-center text-blue-500 rounded justify-between">
                        <span className="rounded-lg p-2 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                        </span>
                        <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                            <p className="text-white text-xl"> {(inversion.tipo === 'Compuesto') ? 200 : 60} % </p>
                            <p className="text-blue-200 text-lg"><FormattedMessage id="con.screen.actions.Inv.screen.inv.2" defaultMessage="Investment 2" /></p>
                        </div>
                    </div>

                    <div className='col-12 lg:mt-16 md:mt-5'>
                        <div className="relative h-2 bg-gray-200 rounded w-100">
                            <div className={`absolute top-0 h-2 left-0 rounded bg-green-500 ` + barra}> </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='col-4 col-md-12 lg:mt-0 md:mt-5 flex justify-center d-lg-none d-sm-none d-md-block'>
                <div className="shadow-lg rounded-xl bg-blue-900 dark:bg-gray-900 w-full md:w-100 p-3 relative overflow-hidden">

                    <p className="text-teal-400 text-2xl text-center"> <FormattedMessage id="con.screen.actions.Inv.screen.inv" defaultMessage="Investment" /> </p>

                    <div className='row '>
                        <div className='col-6 flex justify-center'>
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
                                            (inversion.tipo === 'Compuesto')
                                                ? <FormattedMessage id="con.screen.actions.Inv.table.tipo.a" defaultMessage="Compound" />
                                                : <FormattedMessage id="con.screen.actions.Inv.table.tipo.b" defaultMessage="Simple" />
                                        }
                                    </p>
                                    <p className="text-blue-200 text-lg"><FormattedMessage id="con.screen.actions.Inv.screen.inv.1" defaultMessage="Investment 1" /></p>
                                </div>
                            </div>
                        </div>
                        <div className='col-6 flex justify-center'>
                            <div className="flex items-center my-3 text-blue-500 rounded justify-between">
                                <span className="rounded-lg p-2 bg-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                </span>
                                <div className="flex flex-col w-full ml-5 mt-1 items-start justify-evenly">
                                    <p className="text-white text-xl"> {(inversion.tipo === 'Compuesto') ? 200 : 60} % </p>
                                    <p className="text-blue-200 text-lg"><FormattedMessage id="con.screen.actions.Inv.screen.inv.2" defaultMessage="Investment 2" /></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-12 mt-4'>
                        <div className="relative h-2 bg-gray-200 rounded w-100">
                            <div className={`absolute top-0 h-2 left-0 rounded bg-green-500` + barra}> </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}