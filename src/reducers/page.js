export default function pageReducer(state = {document_id: 0, delta: "", user_documents: [], user_categories: []}, action){
    switch (action.type) {

      case 'SET_DELTA':
      let found_delta
      let doc_found = state.user_documents.find(document => document.id === action.payload)
      found_delta = doc_found.delta
        return {
          ...state,
          delta: found_delta
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

        case 'ADD_CATEGORY':
        let user_categories_names = state.user_categories.map(cat => cat.name)
          if(!user_categories_names.includes(action.payload.name)){
          return{...state,
          user_categories: [...state.user_categories, action.payload]}
        }else{
          return state
        }

        case 'ADD_DOCUMENT':
        return{
          ...state,
          user_documents: [...state.user_documents, action.payload]
        }

        case 'REMOVE_DOCUMENT':
        let updated_documents = state.user_documents.filter(document => document.id !== action.payload)
        return{
          ...state,
          user_documents: updated_documents
        }

      default:
        return state;

    }
}
