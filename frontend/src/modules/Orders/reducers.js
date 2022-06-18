import actions from "./actions";

const reducer = (state, action) => {
    switch (action.type) {
        case actions.SET_ORDERS:
            return { ...state, orders: action.data }
        case actions.SET_CURR_ORDER:
            return { ...state, currOrder: action.data }
        case actions.REFRESH_DATA:
            return { ...state, refresh: !state.refresh }
    }
}
export default reducer;