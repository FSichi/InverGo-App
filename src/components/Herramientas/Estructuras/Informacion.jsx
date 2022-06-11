import React from 'react'
import { FormattedMessage } from 'react-intl';

export const Informacion = ({ estructura }) => {

    const capitalEstructura = new Intl.NumberFormat("de-DE").format(estructura.capitalEstructura);
    const costoCuentas = new Intl.NumberFormat("de-DE").format(estructura.costoCuentas);
    const gananciaLiquida = new Intl.NumberFormat("de-DE").format(estructura.gananciaLiquida);
    const gananciaPasiva = new Intl.NumberFormat("de-DE").format(estructura.gananciaPasiva);

    return (
        <div className='row'>
            <CardInfo idMsg={'tools.structures.info.1'} defMsg={"Info 1"} styleInfo={'text-blue-700 dark:text-cyan-300'} info={capitalEstructura} />
            <CardInfo idMsg={'tools.structures.info.2'} defMsg={"Info 2"} styleInfo={'text-gray-900 dark:text-green-300'} info={costoCuentas} />
            <CardInfo idMsg={'tools.structures.info.3'} defMsg={"Info 3"} styleInfo={'text-indigo-800 dark:text-indigo-300'} info={gananciaLiquida} />
            <CardInfo idMsg={'tools.structures.info.4'} defMsg={"Info 4"} styleInfo={'text-indigo-800 dark:text-indigo-300'} info={gananciaPasiva} />
        </div>
    )
}

const CardInfo = ({ idMsg, defMsg, styleInfo, info }) => {
    return (
        <div className='col-3'>
            <div className="shadow-lg rounded-2xl w-100 p-4 bg-blue-400 dark:bg-gray-900">
                <p className="text-2xl text-gray-900 dark:text-gray-200 text-center">
                    <FormattedMessage id={idMsg} defaultMessage={defMsg} />
                </p>
                <div className="flex flex-col justify-start">
                    <p className={"text-2xl text-center font-bold my-2" + styleInfo} >
                        $ {info}
                    </p>
                </div>
            </div>
        </div>
    )
}