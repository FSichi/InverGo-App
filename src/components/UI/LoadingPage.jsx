import { DoubleBubble } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

var text = '';
var bgColor = '';

(localStorage.getItem('lang') === 'es-MX')
    ? text = 'Cargando Datos del Usuario...'
    : text = 'Loading User Data...';

(localStorage.getItem('color-theme') === 'dark')
    ? bgColor = '#1F2937'
    : bgColor = '#312E81';

export const LoadingPage = () => {
    return (
        <div className='text-white grid place-content-center chargeDatasetSize'>  {/* vh-100 */}
            <DoubleBubble text={text} bgColor={bgColor} center={false} width={"235px"} height={"235px"} speed={5} />
            {/* <HalfMalf justify-center text={text} bgColor={bgColor} center={false} width={"200px"} height={"200px"} speed={5} /> */}
        </div>
    )
}