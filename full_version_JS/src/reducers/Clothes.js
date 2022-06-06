import ACTIONS from '../actions/Clothes';
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.REFRESH_DATA:
      return { ...state, refresh: !state.refresh };
    case ACTIONS.SET_LIST:
      return { ...state, clothList : action.data };
    default:
      return state;
  }
};

export default reducer;