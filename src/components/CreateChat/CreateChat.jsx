import classes from './CreateChat.module.scss'
import Modal from '../Modal/Modal'
import Input from '../Input/Input'
import Button from '../Button/Button'
import TextError from '../TextError/TextError'
import Loader from '../Loader/Loader'
import { useState } from 'react'
import { useStore } from '../../store'

const CreateChat = ({ setVisible }) => {
	const [number, setNumber] = useState('')
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const createChat = useStore(state => state.createChat)

	function numberHandler(e) {
		setNumber(e.target.value.replace(/\D/g, ''))
	}

	function createChatHandler(e) {
		e.preventDefault()
		setLoading(true)

		if (!number) {
			setError(true)
			setLoading(false)
			return
		}

		const res = createChat(number)

		if (!res) {
			setLoading(false)
			setError(true)
			return
		}

		setLoading(false)
		setVisible()
	}

	return (
		<Modal onBgClick={setVisible}>
			<div className={classes.wrapper}>
				{loading ? (
					<Loader />
				) : (
					<form>
						<Input
							onChange={numberHandler}
							value={number}
							placeholder='79231234562'
						/>
						{error && <TextError>Некорректные данные</TextError>}
						<Button onClick={createChatHandler}>Создать</Button>
					</form>
				)}
			</div>
		</Modal>
	)
}

export default CreateChat
