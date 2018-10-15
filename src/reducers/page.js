export default function pageReducer(state = {document_id: 2, delta: "", user_documents: []}, action){
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
        console.log(this.state);
        return{
          ...state,
          document_id: action.payload
        }

      default:
        return state;

    }
}
