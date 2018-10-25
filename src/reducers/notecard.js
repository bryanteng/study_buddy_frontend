export default function notecardReducer(state = {notecards: [], current_category:"", notecard_categories: [], notecard_subcategories:[], current_deck: []}, action){
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

      case 'REMOVE_NOTECARD':
      let updated_notecards = state.notecards.filter(notecard => notecard.id !== action.payload)
      return{
        ...state,
        notecards: updated_notecards
      }

      case 'SET_CURRENT_DECK':
      return{
        ...state,
        current_deck: action.payload
      }

      case 'REMOVE_NOTECARD_FROM_DECK':
      let updated_deck = state.current_deck.filter(notecard => notecard.id !== action.payload)
      return{
        ...state,
        current_deck: updated_deck
      }

      case 'ADD_NOTECARD_CATEGORY':
      return{
        ...state,
        notecard_categories: [...state.notecard_categories, action.payload]
      }

      case 'ADD_NOTECARD_SUBCATEGORY':
      return{
        ...state,
        notecard_subcategories: [...state.notecard_subcategories, action.payload]
      }

      default:
        return state;

    }
}
