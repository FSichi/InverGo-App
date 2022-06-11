import { FormattedMessage } from 'react-intl'
import { getInfoInvUsuario } from '../../../helpers/selector';

export const Informacion = ({ inversiones }) => {

    const infoInv = getInfoInvUsuario(inversiones);

    return (
        <div className='row mb-4'>

            <CardInformacion
                titulo={'tools.inv.info.1'} defMsg={'Info 1'} info={infoInv[0]}
                styleCard={'text-2xl text-cyan-300 text-center font-bold my-2'}
            />

            <CardInformacion
                titulo={'tools.inv.info.2'} defMsg={'Info 2'} info={infoInv[1]}
                styleCard={'text-2xl text-green-300 text-center font-bold my-2'}
            />

            <CardInformacion
                titulo={'tools.inv.info.3'} defMsg={'Info 3'} info={infoInv[2]}
                styleCard={'text-2xl text-amber-400 dark:text-indigo-300 text-center font-bold my-2'}
            />

            <CardInformacion
                titulo={'tools.inv.info.4'} defMsg={'Info 4'} info={infoInv[3]}
                styleCard={'text-2xl text-red-400 dark:text-red-500 text-center font-bold my-2'}
            />

        </div>
    )
}

const CardInformacion = ({ titulo, defMsg, styleCard, info }) => {

    return (
        <div className='col-3'>
            <div className="shadow-lg rounded-2xl w-100 p-3 bg-indigo-600 dark:bg-gray-800">
                <p className="text-2xl text-gray-200 text-center">
                    <FormattedMessage id={titulo} defaultMessage={defMsg} />
                </p>
                <div className="flex flex-col justify-start">
                    <p className={styleCard}>
                        {info}
                    </p>
                </div>
            </div>
        </div>
    )
}