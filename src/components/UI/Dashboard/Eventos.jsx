import { FormattedMessage } from 'react-intl'
import { ordenarEventosByFecha } from '../../../helpers/selector';

export const Eventos = ({ eventos }) => {

    const eventosOrder = ordenarEventosByFecha(eventos);

    return (
        <div className='me-2 ms-2'>
            {
                eventosOrder.map((item) => (

                    <div className='row mt-2 mb-3 p-3 bg-blue-800 dark:bg-black' style={{ borderRadius: '10px' }} key={item._id}>

                        <div className='col-4'>

                            <div className='row'>
                                <div className='col-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-300 dark:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className='col-8 ms-2 mt-1'>
                                    <p className="font-medium text-gray-100 text-xl">
                                        {
                                            (item.tipo === 'Reunion')
                                                ? <FormattedMessage id="dashboard.evt.type.a" defaultMessage="Meeting" />
                                                : <FormattedMessage id="dashboard.evt.type.b" defaultMessage="Conference" />
                                        }
                                    </p>
                                </div>
                                <div className='col-12 mt-3'>
                                    <p className="font-medium text-gray-100 text-md">{item.persona}</p>
                                </div>
                            </div>

                        </div>

                        <div className='col-7 ms-4 border-l-2'>

                            <div className='row ms-2'>
                                <div className='col-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-300 dark:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className='col-10 ms-3'>
                                    <p className="font-medium text-gray-100 text-lg">
                                        {
                                            item.fecha[8] + item.fecha[9] + '-' +
                                            item.fecha[5] + item.fecha[6] + '-' +
                                            item.fecha[0] + item.fecha[1] + item.fecha[2] + item.fecha[3]
                                        }
                                        {
                                            (item.hora !== '-') && ' || ' + item.hora
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className='row mt-3 ms-2'>
                                <div className='col-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-300 dark:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className='col-10 ms-3'>
                                    <p className="font-medium text-gray-100 text-xl">{item.lugar}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                ))
            }
        </div>
    )
}