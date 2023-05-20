import classes from './Modal.module.scss'

const Modal = ({ onBgClick, children, ...props }) => {
	return (
		<div onClick={onBgClick} className={classes.wrapper}>
			<div className={classes.modal} {...props}>
				{children}
			</div>
		</div>
	)
}

export default Modal
