import {
	findUserDb,
	saveUserDb ,
	logoutDb,
	updateDisplayNameDb,
	updateAvatarDb,
	updateNotificationsDb,
	updateDistanceDb,
	setCurrentCarDb
} from '../services/realm';

let initUser = {
	_id: '',
	token : '',
	email : '',
	rol : '',
	displayName : '',
	avatar : null,
	distance :0,
	isAuthenticated : false,
	notifications : true,
	status_seller : '',
	method : '',
	currentCar : null,
}

const initialState = findUserDb() || initUser;

export default (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_USER':
        	saveUserDb(action.payload);
            return action.payload;
        case 'LOGOUT_USER':
        	logoutDb();
			return initUser;
		case 'AVATAR_USER':
			updateAvatarDb(action.payload);
			return {...state, avatar: action.payload};
		case 'DISPLAYNAME_USER':
			updateDisplayNameDb(action.payload);
			return {...state, displayName: action.payload};
		case 'DISTANCE_USER':
			updateDistanceDb(action.payload);
			return {...state, distance: action.payload};
		case 'NOTIFICATIONS_USER':
			updateNotificationsDb(action.payload);
			return {...state, notifications: action.payload};
		case 'STATUS_USER':
			return {...state, status_seller: action.payload};
		case 'CAR_USER':
			setCurrentCarDb(action.payload);
			return {...state, currentCar: action.payload};
        default:
            return state;
    }
};