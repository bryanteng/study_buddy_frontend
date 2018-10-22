export default function notecardReducer(state = {notecards: [], current_category:"", notecard_categories: [], notecard_subcategories:[]}, action){
    switch (action.type) {

      case 'ADD_NOTECARD':
        return {
          ...state,
          notecards: [...state.notecards, action.payload]
        }

      case 'CHANGE_CATEGORY':
        return{
          ...state,
          current_category: action.payload
        }

      case 'SET_NOTECARDS':
        return{
          ...state,
          notecards: action.payload
        }

      case 'SET_NOTECARD_CATEGORIES':
      return{
        ...state,
        notecard_categories: action.payload
      }

      case 'SET_NOTECARD_SUBCATEGORIES':
      return{
        ...state,
        notecard_subcategories: action.payload
      }

      default:
        return state;

    }
}
