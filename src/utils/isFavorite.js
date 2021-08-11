

export const isFavorite = (id, cart)=>{
	for(var i=0; i < cart.length; i++){
		if(id === cart[i]._id) return true;
	}
	return false;
}