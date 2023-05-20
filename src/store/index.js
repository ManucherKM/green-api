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
		}),
		{
			name: 'store',
		}
	)
)
