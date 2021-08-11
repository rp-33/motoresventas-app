import {
    findSellerDb,
    saveSellerDb,
    updateImageSellerDb,
    updateNameSellerDb,
    updateLocationSellerDb,
    updatePhoneSellerDb,
    updateSuscriptionSellerDb
} from '../services/realm';


let initSeller = {
    _id:'',
    name:'',
    rifCode: '',
    rif:'',
    phone:'',
    location:[],
    image:null,
    plan : '',
    init_date : '',
    expired_date:''
}

const initialState = findSellerDb() || initSeller;

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_SELLER':
            let {_id,name,rifCode,rif,phone,image,geo,suscription} = action.payload
            saveSellerDb(_id,name,rifCode,rif,phone,image,geo,suscription);
            return findSellerDb();
        case 'NAME':
            updateNameSellerDb(action.payload);
            return {...state, name:action.payload}
        case 'IMAGE':
            updateImageSellerDb(action.payload);
            return {...state, image:action.payload}
        case 'LOCATION':
            updateLocationSellerDb(action.payload);
            return {...state, location:action.payload};
        case 'PHONE':
            updatePhoneSellerDb(action.payload);
            return {...state, phone:action.payload};
        case 'SUSCRIPTION':
            const {plan,init_date,expired_date} = action.payload;
            updateSuscriptionSellerDb(plan,init_date,expired_date);
            return findSellerDb();
        case 'LOGOUT_USER':
            return initSeller;
        default:
            return state;
    }
};