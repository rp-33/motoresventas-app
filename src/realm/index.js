import Realm from 'realm';

//Models
import UserModel from './models/user';
import SellerModel from './models/seller';
import GarageModel from './models/garage';
import FavoriteModel from './models/favorite';

const Database = new Realm({
    schema: [
    	UserModel,
    	SellerModel,
    	GarageModel,
    	FavoriteModel
    ]
});

export default Database;