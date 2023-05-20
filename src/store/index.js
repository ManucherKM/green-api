import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from '../axios'

export const useStore = create(
	persist(
		set => ({
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
		}),
		{
			name: 'store',
		}
	)
)
