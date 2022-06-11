import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { getClientesByName } from '../../../helpers/selector';
import { TablaContactos } from './TablaContactos'

export const PantallaContactos = ({ search, data }) => {

    const [clientesFilter, setClientesFilter] = useState([]);

    useEffect(() => {
        (search !== '')
            ? setClientesFilter(getClientesByName(search, data))
            : setClientesFilter(data)
    }, [search, data]);

    return (
        <>
            {
                (search === '' && data.length === 0) &&
                (
                    <h2 className='text-center text-gray-100 text-xl bg-indigo-600 dark:bg-gray-800 p-4 rounded-lg'>
                        <FormattedMessage id="con.list.5" defaultMessage="Info No Client" />
                    </h2>
                )
            }
            {
                (search === '' && data.length > 0) && <TablaContactos contactos={data} />
            }
            {
                (search !== '' && clientesFilter.length !== 0) && <TablaContactos contactos={clientesFilter} />
            }
            {
                (search !== '' && clientesFilter.length === 0) &&
                (
                    <h2 className='text-center text-gray-100 text-xl bg-indigo-600 dark:bg-gray-800 p-4 rounded-lg'>
                        <FormattedMessage id="con.list.4" defaultMessage="Info No Client" />
                    </h2>
                )
            }
        </>
    )
}