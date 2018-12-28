export default function loginReducer(state = {user_id: 0, username: ""}, action){
    switch (action.type) {

      case 'SET_USER_ID':
        return {
          ...state,
          user_id: action.payload
        }

      case 'SET_USERNAME':
      return{
        ...state,
        username: action.payload
      }

      case 'SET_USER':
      return{
        ...state,
        user_id: action.payload.user_id,
        username: action.payload.username
      }

      default:
        return state;

    }
}
