import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux';
import { ordenarInversionesByFechaFin, unirInversionesByUID } from '../../../helpers/selector';

export const TopInv = ({ inversiones, contactosDB }) => {

    const { name, email } = useSelector(state => state.auth);
    // const inversionesOrder = ordenarInversionesByCapital(inversiones);
    const inversionesOrder = ordenarInversionesByFechaFin(inversiones);
    const inversionesFinal = unirInversionesByUID(inversionesOrder, contactosDB, name, email);

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-7 ">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-5">
                    <div className="shadow-sm overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className='bg-blue-900 dark:bg-black'>
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-white dark:text-teal-300 uppercase tracking-wider text-center"
                                    >
                                        <FormattedMessage id="dashboard.inv.name" defaultMessage="Name" />
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-white dark:text-teal-300 uppercase tracking-wider text-center"
                                    >
                                        <FormattedMessage id="dashboard.inv.end" defaultMessage="Fecha Fin" />
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-white dark:text-teal-300 uppercase tracking-wider text-center"
                                    >
                                        <FormattedMessage id="dashboard.inv.cap" defaultMessage="Capital" />
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-xs font-bold text-white dark:text-teal-300 uppercase tracking-wider text-center"
                                    >
                                        <FormattedMessage id="dashboard.inv.ben" defaultMessage="Condition" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-indigo-400 dark:bg-gray-800 divide-y divide-gray-400 dark:divide-gray-700">
                                {inversionesFinal.map((inv) => (
                                    <tr key={inv.inversion._id}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-md font-bold dark:font-medium text-gray-100">{inv.owner}</div>
                                                    <div className="text-md text-gray-300">{inv.email}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="text-lg text-gray-100">
                                                {
                                                    inv.inversion.fechas.fin[8] + inv.inversion.fechas.fin[9] + '-' +
                                                    inv.inversion.fechas.fin[5] + inv.inversion.fechas.fin[6] + '-' +
                                                    inv.inversion.fechas.fin[0] + inv.inversion.fechas.fin[1] + inv.inversion.fechas.fin[2] + inv.inversion.fechas.fin[3]
                                                }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="px-3 py-2 inline-flex text-sm leading-5 font-bold rounded-full text-gray-900 bg-orange-300">
                                                $ {new Intl.NumberFormat("de-DE").format(inv.inversion.capitales.capital)}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="text-md text-gray-100">
                                                <span className="px-3 py-2 inline-flex text-sm leading-5 font-bold rounded-full bg-teal-400 text-gray-900">
                                                    $ {new Intl.NumberFormat("de-DE").format(parseInt(inv.inversion.capitales.capitalFinal) - parseInt(inv.inversion.capitales.capital))}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}