import classes from './ChatListItem.module.scss'

const ChatListItem = ({ number }) => {
	return (
		<div className={classes.wrapper}>
			<span>{number}</span>
		</div>
	)
}

export default ChatListItem
