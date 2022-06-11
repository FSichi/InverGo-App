import { Agregar } from './Agregar'
import { Listado } from './Listado'

export const Eventos = ({ contacto, opcion, eventos }) => {
    return (
        <>
            {
                (opcion)
                    ? <Listado contacto={contacto} eventos={eventos} />
                    : <Agregar contacto={contacto} />
            }
        </>
    )
}