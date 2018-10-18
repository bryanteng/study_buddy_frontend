export default function notecardReducer(state = {notecards: []}, action){
    switch (action.type) {

      case 'ADD_NOTECARD':
        return {
          ...state,
          notecards: [...state.notecards, action.payload]
        }

      default:
        return state;

    }
}
