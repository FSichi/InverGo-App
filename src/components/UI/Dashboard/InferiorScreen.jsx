import { FormattedMessage } from 'react-intl'
import { Eventos } from './Eventos'
import { TopInv } from './TopInv'

export const InferiorScreen = ({ contactos, eventos, inversiones }) => {

    return (
        <div className='row mt-4 mb-5'>

            <div className='col-5 col-md-11 col-lg-5  md:ml-11 lg:ml-0 mt-lg-3'>
                <h1 className='text-3xl text-center p-3 mb-3 rounded-2xl shadow-sm bg-indigo-600 text-gray-200 dark:bg-gray-800 dark:text-gray-100'>
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

            <div className='col-12 col-md-12 col-lg-7 mt-md-4 mt-lg-0'>
                <div className=' p-3 md:ml-8 lg:ml-0 md:mr-2 lg:mr-0'>
                    <h1 className='text-3xl text-center p-3 mb-3 rounded-2xl shadow-sm bg-indigo-600 text-gray-200 dark:bg-gray-800 dark:text-gray-100'>
                        <FormattedMessage id="dashboard.inv" defaultMessage="Investment Ranking" />
                    </h1>

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
    )
}