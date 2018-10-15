export default function loginReducer(state = {user_id: 1}, action){
    switch (action.type) {

      // case 'SET_DELTA':
      //   return {
      //     ...state,
      //     delta: action.payload
      //   }

      default:
        return state;

    }
}
