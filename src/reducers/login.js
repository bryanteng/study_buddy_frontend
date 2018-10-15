export default function quotesReducer(state = {quotes: []}, action){
    switch (action.type) {

      case 'ADD_QUOTE':
        let votes;
        let quote;
        return {
          ...state,
          quotes: [...state.quotes, quote={...action.quote, votes:0}]
        }

      case 'UPVOTE_QUOTE':
      return{
        state.quotes.map(quote => {
          if (quote.id === action.id){
            quote.votes++
          }
        })
      }

      default:
        return state;

    }
}
