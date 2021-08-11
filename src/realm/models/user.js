const UserModel = {
	name: 'User',
	primaryKey : '_id',
	properties: {
		_id: 'string',
		token : 'string',
		email : 'string',
		rol : 'string',
		displayName : 'string',
		avatar : 'string',
		distance :'int',
		notifications : 'bool',
		status_seller : 'string',
		isAuthenticated : 'bool',
		method : 'string',
		router : {
			type : 'string',
			default : 'BuyerDashboard'
		},
		currentCar : 'string?'
    }
};

export default UserModel;