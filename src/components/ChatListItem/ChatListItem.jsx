import classes from './ChatListItem.module.scss'

const ChatListItem = ({ number, ...props }) => {
	return (
		<div className={classes.wrapper} {...props}>
			<span>{number}</span>
		</div>
	)
}

export default ChatListItem
