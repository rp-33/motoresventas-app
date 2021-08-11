export const addToCart = (payload) => ({
    type: 'ADD_CART',
    payload
});

export const removeToCart = (payload) => ({
    type: 'REMOVE_CART',
    payload
});

export const updateProduct = (payload,add) => ({
    type: 'UPDATE_PRODUCT',
    payload,
    add
});

export const addFavorite = (payload) => ({
    type: 'ADD_FAVORITE',
    payload
});