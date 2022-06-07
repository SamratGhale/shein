import ACTIONS from '../actions/Orders';
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.REFRESH_DATA:
      return { ...state, refresh: !state.refresh };
    case ACTIONS.SET_LIST:
      return { ...state, orderList : action.data };
    default:
      return state;
  }
};

export default reducer;