export const addItemToCart = (cartItems, itemToAdd) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === itemToAdd.id);

    if (existingItem) {
        return cartItems.map(cartItem => 
            cartItem.id === existingItem.id ?
            {...cartItem, quantity: cartItem.quantity + 1} :
            cartItem)
    }

    return [...cartItems, {...itemToAdd, quantity: 1}];
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === itemToRemove.id);

    if (existingItem.quantity > 1) {
        return cartItems.map(cartItem => 
            cartItem.id === existingItem.id ?
            {...cartItem, quantity: cartItem.quantity - 1} :
            cartItem)
    }

    return cartItems;
};


