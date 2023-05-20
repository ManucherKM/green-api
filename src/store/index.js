import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from '../axios'

export const useStore = create(
	persist(
		(set, get) => ({
			user: {
				idInstance: '',
				apiTokenInstance: '',
			},
			isAuth: false,
			chats: [],
			auth: async (idInstance, apiTokenInstance) => {
				if (!idInstance || !apiTokenInstance) {
					return
				}

				try {
					const { data } = await axios.get(
						`/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
					)

					if (data.stateInstance !== 'authorized') {
						return
					}

					set({
						isAuth: true,
						user: { idInstance, apiTokenInstance },
					})

					return true
				} catch (e) {
					return
				}
			},
			createChat: chatId => {
				if (!chatId) {
					return
				}

				const chat = { chatId: chatId }

				set(state => {
					const isExist = state.chats.find(chat => chat.chatId === chatId)

					if (!isExist) {
						return { chats: [...state.chats, chat] }
					}

					return {}
				})

				return chat
			},
			getMessages: async chatId => {
				if (!chatId) {
					return
				}

				const params = {
					chatId: chatId + '@c.us',
					count: 50,
				}

				const { data } = await axios.post(
					`/waInstance${get().user.idInstance}/GetChatHistory/${
						get().user.apiTokenInstance
					}`,
					params
				)

				if (!data.length) {
					return
				}

				return data
			},
			sendMessage: async (chatId, message) => {
				if (!chatId || !message) {
					return
				}

				const params = { chatId: chatId + '@c.us', message }

				const { data } = await axios.post(
					`/waInstance${get().user.idInstance}/SendMessage/${
						get().user.apiTokenInstance
					}`,
					params
				)

				if (!data) {
					return
				}

				return data
			},
		}),
		{
			name: 'store',
		}
	)
)
