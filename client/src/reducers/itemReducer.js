import uuid from 'uuid'
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS } from '../actions/types'
const initialState = {
	items: [
		{ id: uuid(), name: 'Eggs' },
		{ id: uuid(), name: 'Milk' },
		{ id: uuid(), name: 'Cokelat' },
		{ id: uuid(), name: 'Steak' },
		{ id: uuid(), name: 'Water' }
	]
}

export default (state = initialState, action) => {
	switch(action.types) {
		case GET_ITEMS : 
			return {
				...state
			}
		default :
			return state
	}
}
