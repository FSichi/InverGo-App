import { FormattedMessage } from 'react-intl'
import { Eventos } from './Eventos'
import { TopInv } from './TopInv'

export const InferiorScreen = ({ contactos, eventos, inversiones }) => {

    return (
        <div className='row mt-4 mb-5'>

            <div className='col-12 col-md-11 col-lg-5 md:ml-11 md:mr-0 lg:mr-0 lg:ml-0 mt-lg-3 lg:p-0 md:p-1'>
                <h1 className='text-3xl text-center md:mr-2 lg:mr-0 p-3 mb-3 rounded-xl shadow-sm bg-indigo-600 text-gray-200 dark:bg-gray-800 dark:text-gray-100'>
                    <FormattedMessage id="dashboard.evt" defaultMessage="Upcoming events" />
                </h1>
                {
                    (eventos.length > 0)
                        ? <Eventos eventos={eventos} />
                        :
                        (
                            <div className='text-center mt-4 bg-indigo-500 dark:bg-gray-700 p-3 rounded-2xl text-gray-100'>
                                <h3 className='text-xl'> <FormattedMessage id="dashboard.evt.0" defaultMessage="0 Events" /> </h3>
                            </div>
                        )
                }
            </div>

            <div className='col-12 col-md-12 col-lg-7 mt-md-2 mt-lg-0'>
                <div className='p-lg-3 p-md-3 p-0 '> {/* md:ml-5 lg:ml-14 md:mr-2 lg:mr-1 */}

                    <div className='md:ml-5 md:mr-2 lg:-mr-4 lg:ml-6'>
                        <h1 className='text-3xl text-center p-3 mb-3 rounded-xl shadow-sm bg-indigo-600 text-gray-200 dark:bg-gray-800 dark:text-gray-100'>
                            <FormattedMessage id="dashboard.inv" defaultMessage="Investment Ranking" />
                        </h1>
                    </div>


                    <div className='md:ml-5 lg:ml-12 md:mr-2 lg:mr-3'>
                        {
                            (inversiones.length > 0)
                                ? <TopInv inversiones={inversiones} contactosDB={contactos} />
                                :
                                (
                                    <div className='text-center mt-4 bg-indigo-500 dark:bg-gray-700 p-3 rounded-2xl text-gray-100'>
                                        <h3 className='text-xl'> <FormattedMessage id="dashboard.inv.0" defaultMessage="0 Investments" /> </h3>
                                    </div>
                                )
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}