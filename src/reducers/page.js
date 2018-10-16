export default function pageReducer(state = {document_id: 1, delta: "", user_documents: [], user_categories: []}, action){
    switch (action.type) {

      case 'SET_DELTA':
        return {
          ...state,
          delta: action.payload
        }

        case 'SET_USER_DOCUMENTS':
        return{
          ...state,
          user_documents: action.payload
        }

        case 'SET_DOCUMENT':
        return{
          ...state,
          document_id: action.payload
        }

        case 'SET_CATEGORIES':
        return{
          ...state,
          user_categories: action.payload
        }

      default:
        return state;

    }
}
