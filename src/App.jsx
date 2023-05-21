import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import { useStore } from './store'

const App = () => {
	const isAuth = useStore(state => state.isAuth)

	return (
		<>
			{isAuth ? (
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			) : (
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			)}
		</>
	)
}

export default App
