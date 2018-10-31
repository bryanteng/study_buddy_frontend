export default function loginReducer(state = {user_id: 0}, action){
    switch (action.type) {

      case 'SET_USER_ID':
        return {
          ...state,
          user_id: action.payload
        }

      default:
        return state;

    }
}
