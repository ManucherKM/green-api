import classes from './Login.module.scss'
import Input from '../../components/Input/Input'

const Login = () => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.form_wrapper}>
				<h1>Авторизация</h1>

				<form>
					<Input placeholder='idInstance' />
					<Input placeholder='apiTokenInstance' />
				</form>
			</div>
		</div>
	)
}

export default Login
