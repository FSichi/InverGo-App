import { Agregar } from './Agregar'
import { Listado } from './Listado'

export const Inversiones = ({ contacto, opcion, inversiones }) => {

    return (
        <>
            {
                (opcion)
                    ? <Listado contacto={contacto} inversiones={inversiones} />
                    : <Agregar contacto={contacto} />
            }
        </>
    )
}