import clsx from 'clsx'
import classes from './Message.module.scss'

const Message = ({ text, isUser, ...props }) => {
	return (
		<div className={clsx([classes.wrapper, isUser && classes.user])}>
			<span {...props}>{text}</span>
		</div>
	)
}

export default Message
