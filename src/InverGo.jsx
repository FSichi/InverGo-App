import { MainRoutes } from './routes/MainRoutes'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'

export const InverGo = () => {
    return (
        <Provider store={store}>
            <MainRoutes />
        </Provider>
    )
}
