export const setAuth = (payload)=>({
    type : 'AUTH_USER',
	payload
});

export const setLogout = ()=>({
    type : 'LOGOUT_USER'
});

export const setAvatar = (payload)=>({
    type: 'AVATAR_USER',
    payload
});

export const setDisplayName = (payload)=>({
    type: 'DISPLAYNAME_USER',
    payload
});

export const setDistance = (payload)=>({
    type: 'DISTANCE_USER',
    payload
});

export const setNotifications = (payload)=>({
    type: 'NOTIFICATIONS_USER',
    payload
});

export const setStatus = (payload)=>({
    type: 'STATUS_USER',
    payload
});

export const setCurrentCar = (payload)=>({
    type: 'CAR_USER',
    payload
});

