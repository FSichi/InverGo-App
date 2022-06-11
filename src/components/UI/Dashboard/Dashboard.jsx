import { useState } from 'react'
import { BarGraf, DonoutGraf } from '../Grafics/DonoutGraf';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { getInfoContactosDB, getInfoInversionesDB } from '../../../helpers/selector';
import { InferiorScreen } from './InferiorScreen';
import { Cards } from './Cards';

export const Dashboard = () => {

    localStorage.removeItem("ruta");

    const { infoDB } = useSelector(state => state);

    const contactosAll = getInfoContactosDB(infoDB.contactos);
    const inversionesAll = getInfoInversionesDB(infoDB.inversiones);

    const [showG1, setShowG1] = useState(true);
    const [showG2, setShowG2] = useState(false);

    const handleShowG1 = () => {
        setShowG1(true);
        setShowG2(false);
    }

    const handleShowG2 = () => {
        setShowG2(true);
        setShowG1(false);
    }

    return (

        <div className='container-fluid text-gray-900 dark:text-gray-100' >

            <div className='lg:mr-1 lg:ml-3'>

                {/* PRIMERA PARTE */}

                <div className='row'>

                    {/* CARDS */}

                    <div className='col-6 col-lg-6 col-md-12 col-sm-12'>
                        <Cards contactos={contactosAll} inversiones={inversionesAll} />
                    </div>

                    {/* GRAFICAS */}

                    <div className='col-6 col-md-12 col-lg-6 mt-3 ms-md-4 ms-lg-0'>

                        <div className='text-white p-1 bg-blue-800 dark:bg-gray-800 ms-md-2 ms-lg-0 me-md-5 me-lg-0' style={{ borderRadius: '10px' }}>

                            {/* TITULOS */}

                            <div className='row p-1' style={{ marginBottom: '5px' }}>

                                <div className='col-6 mt-1'>
                                    {
                                        (showG1)
                                            ?
                                            (
                                                <button className="p-3 rounded-lg text-gray-200 bg-blue-500 dark:bg-gray-900 dark:text-indigo-300 w-100" onClick={handleShowG1}>
                                                    <p className=" font-medium text-lg ml-4">
                                                        <FormattedMessage id="dashboard.graf.1" defaultMessage="Investment Distribution" />
                                                    </p>
                                                </button>
                                            )
                                            :
                                            (
                                                <button className="p-3 rounded-lg hover:bg-blue-900 hover:text-teal-300 dark:hover:bg-gray-700 dark:hover:text-teal-300 w-100" onClick={handleShowG1}>
                                                    <p className="font-medium text-lg ml-4">
                                                        <FormattedMessage id="dashboard.graf.1" defaultMessage="Investment Distribution" />
                                                    </p>
                                                </button>
                                            )
                                    }

                                </div>

                                <div className='col-6 mt-1'>
                                    {
                                        (showG2)
                                            ?
                                            (
                                                <button className="p-3 rounded-lg text-gray-200 bg-blue-500 dark:bg-gray-900 dark:text-indigo-300 w-100" onClick={handleShowG2}>
                                                    <p className="font-medium text-lg ml-4">
                                                        <FormattedMessage id="dashboard.graf.2" defaultMessage="Quarterly Records" />
                                                    </p>
                                                </button>
                                            )
                                            :
                                            (
                                                <button className="p-3 rounded-lg hover:bg-blue-900 hover:text-teal-300 dark:hover:bg-gray-700 dark:hover:text-teal-300 w-100" onClick={handleShowG2}>
                                                    <p className="font-medium text-lg ml-4">
                                                        <FormattedMessage id="dashboard.graf.2" defaultMessage="Quarterly Records" />
                                                    </p>
                                                </button>
                                            )
                                    }

                                </div>

                            </div>

                            <hr />

                            {/* GRAFICOS */}

                            <>
                                {
                                    (showG1)
                                    &&
                                    (
                                        <div className='p-2'>
                                            <DonoutGraf inversiones={infoDB.inversiones} />
                                        </div>
                                    )
                                }
                                {
                                    (showG2)
                                    &&
                                    (
                                        <div className='p-2'>
                                            <BarGraf contactos={infoDB.contactos} inversiones={infoDB.inversiones} />
                                        </div>
                                    )
                                }

                            </>

                        </div>

                    </div>

                </div>

                {/* SEGUNDA PARTE */}

                <InferiorScreen contactos={infoDB.contactos} eventos={infoDB.eventos} inversiones={infoDB.inversiones} />

            </div>

        </div>
    )
}