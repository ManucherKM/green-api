import { useState } from 'react'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Loader from '../../components/Loader/Loader'
import TextError from '../../components/TextError/TextError'
import { useStore } from '../../store'
import classes from './Login.module.scss'

const Login = () => {
	const [loading, setLoading] = useState(false)

	const [form, setForm] = useState({
		idInstance: '',
		apiTokenInstance: '',
	})

	const [error, setError] = useState(false)

	const auth = useStore(state => state.auth)

	async function sendForm(e) {
		e.preventDefault()
		setLoading(true)

		if (!form.apiTokenInstance || !form.idInstance) {
			setError(true)
			setLoading(false)
			return
		}

		const res = await auth(form.idInstance, form.apiTokenInstance)

		if (!res) {
			setError(true)
			setLoading(false)
		}

		setLoading(false)
	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.form_wrapper}>
				{loading ? (
					<Loader />
				) : (
					<>
						<h1>Авторизация</h1>
						<form>
							<Input
								onChange={e =>
									setForm(p => ({ ...p, idInstance: e.target.value }))
								}
								value={form.idInstance}
								required
								placeholder="idInstance"
							/>
							<Input
								value={form.apiTokenInstance}
								required
								onChange={e =>
									setForm(p => ({ ...p, apiTokenInstance: e.target.value }))
								}
								placeholder="apiTokenInstance"
							/>

							{error && <TextError>Некорректные данные</TextError>}
							<Button onClick={sendForm}>Отправить</Button>
						</form>
					</>
				)}
			</div>
		</div>
	)
}

export default Login
