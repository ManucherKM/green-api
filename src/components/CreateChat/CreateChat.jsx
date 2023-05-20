import classes from './CreateChat.module.scss'
import Modal from '../Modal/Modal'

const CreateChat = ({ onBgClick }) => {
	return (
		<Modal onBgClick={onBgClick}>
			<div className={classes.wrapper}>CreateChat</div>
		</Modal>
	)
}

export default CreateChat
