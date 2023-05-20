import classes from './Modal.module.scss'

const Modal = ({ onBgClick, children, ...props }) => {
	function clickHandler(e) {
		e.stopPropagation()
	}

	return (
		<div onClick={onBgClick} className={classes.wrapper}>
			<div className={classes.modal} onClick={clickHandler} {...props}>
				{children}
			</div>
		</div>
	)
}

export default Modal
