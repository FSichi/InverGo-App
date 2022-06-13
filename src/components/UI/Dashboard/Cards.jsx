import { FormattedMessage } from 'react-intl'

export const Cards = ({ contactos, inversiones }) => {

    return (
        <div className='row'>
            <CardIzquierda imgSrc={'../assets/contact1.svg'} idMsg={"dashboard.card.1"} defMsg={'Contacts'} info={contactos.cantContactos} />
            <CardDerecha imgSrc={'../assets/inversor.svg'} idMsg={"dashboard.card.2"} defMsg={'Investor'} info={contactos.cantInversores} />
            <CardIzquierda imgSrc={'../assets/inversiones.svg'} idMsg={"dashboard.card.3"} defMsg={'Investments'} info={inversiones.cantInv} />
            <CardDerecha imgSrc={'../assets/finalizado.svg'} idMsg={"dashboard.card.4"} defMsg={'Finished'} info={inversiones.cantInvFin} />
        </div>
    )
}

const CardIzquierda = ({ imgSrc, idMsg, defMsg, info }) => {

    return (
        <div className='col-lg-5 col-md-5 me-lg-5 me-md-5 ms-md-5 ms-lg-0 text-white mt-3 bg-indigo-600 dark:bg-gray-800 rounded-xl shadow-2xl' >
            <div className='row mt-3 mb-3'>
                <div className='col-lg-12 col-md-12 d-flex flex-column align-items-center'>
                    <img src={`${imgSrc}`} alt='Usuario' style={{ height: '70px', width: '70px' }} />
                </div>
                <div className='col-lg-12 col-md-12 mt-3 d-flex flex-column align-items-center'>
                    <h3 className=' text-2xl'> <FormattedMessage id={idMsg} defaultMessage={defMsg} /> </h3>
                    <p className="text-gray-100 text-2xl font-bold my-2 bg-indigo-900 dark:bg-indigo-700 px-4 py-2 rounded-lg">
                        {info}
                    </p>
                </div>
            </div>
        </div>
    )
}

const CardDerecha = ({ imgSrc, idMsg, defMsg, info }) => {

    return (
        <div className='col-lg-5 col-md-5 text-white mt-3 bg-indigo-600 dark:bg-gray-800 rounded-xl shadow-2xl' >
            <div className='row mt-3 mb-3'>
                <div className='col-lg-12 col-md-12 d-flex flex-column align-items-center'>
                    <img src={imgSrc} alt='Usuario' style={{ height: '70px', width: '70px' }} />
                </div>
                <div className='col-lg-12 col-md-12 mt-3 d-flex flex-column align-items-center'>
                    <h3 className=' text-2xl'> <FormattedMessage id={idMsg} defaultMessage={defMsg} /> </h3>
                    <p className="text-gray-100 text-2xl font-bold my-2 bg-indigo-900 dark:bg-indigo-700 px-4 py-2 rounded-lg">
                        {info}
                    </p>
                </div>
            </div>
        </div>
    )
}