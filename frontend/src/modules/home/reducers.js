import actions from "./actions";

const reducer = (state, action) => {
    switch (action.type) {
        case actions.SET_ITEMS:
            return { ...state, items: action.data }
        case actions.REGRESH_DATA:
            return { ...state, refresh: !state.refresh }
        case actions.SET_CART_DATA:
            return { ...state, cart: action.data }
        case actions.SET_CART_COUNT:
            return { ...state, cartCount: action.data }
    }
}
export default reducer;