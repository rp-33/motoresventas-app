import {
	saveGarageDb,
	findGarageDb,
	saveCarDb,
	deleteCarDb
} from '../services/realm';

const initGarage = [];

const initialState = findGarageDb() || initGarage;

export default (state = [...initialState], action) => {
    switch (action.type) {
    	case 'ADD_GARAGE':
    		saveGarageDb(action.payload)
    		return action.payload;
        case 'ADD_CAR':
        	saveCarDb(action.payload);
            return [...state,action.payload];
        case 'REMOVE_CAR':
        	deleteCarDb(action.payload);
            return action.payload;
        case 'LOGOUT_USER':
            return initGarage;
        default:
            return state;
    }
};