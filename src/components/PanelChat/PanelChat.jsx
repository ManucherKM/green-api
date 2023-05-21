import { useEffect, useRef, useState } from 'react'
import { useStore } from '../../store'
import Input from '../Input/Input'
import Message from '../Message/Message'
import classes from './PanelChat.module.scss'

const PanelChat = ({ currentChat }) => {
	const getMessages = useStore(state => state.getMessages)
	const getNotifications = useStore(state => state.getNotifications)
	const removeNotifications = useStore(state => state.removeNotifications)
	const sendMessage = useStore(state => state.sendMessage)
	const [messages, setMessages] = useState([])
	const [message, setMessage] = useState('')
	const panelChat = useRef(null)

	async function fetchMessages() {
		const res = await getMessages(currentChat)

		if (!res) {
			return
		}

		setMessages(res)
	}

	async function checkUpdates() {
		const res = await getNotifications()

		if (res) {
			fetchMessages()
			removeNotifications(res.receiptId)
		}

		setTimeout(checkUpdates, 500)
	}

	async function sendMessageHandler(e) {
		if (e.key !== 'Enter') {
			return
		}

		if (!message) {
			return
		}

		try {
			await sendMessage(currentChat, message)
		} catch (e) {
			console.log(e)
		}

		setMessage('')
	}

	useEffect(() => {
		if (!panelChat.current) {
			return
		}

		panelChat.current.scrollTop = panelChat.current.scrollHeight
	}, [messages])

	useEffect(() => {
		fetchMessages()
		checkUpdates()
	}, [])

	return (
		<div ref={panelChat} className={classes.wrapper}>
			{[...messages].reverse().map(msg => (
				<Message
					key={msg.idMessage}
					text={msg.textMessage}
					isUser={msg.type === 'outgoing'}
				/>
			))}
			<Input
				onKeyDown={sendMessageHandler}
				value={message}
				onChange={e => setMessage(e.target.value)}
				placeholder="Сообщение"
			/>
		</div>
	)
}

export default PanelChat
