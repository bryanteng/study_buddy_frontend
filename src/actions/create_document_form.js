import { addDocument, addCategory, setDelta } from './page'
import { API_ROOT } from '../constants';

export const fetchDocument = (user_id, categoryName, documentTitle) => {
  return (dispatch) =>{
    return fetch(`${ API_ROOT }/documents-and-category`,{
        method: "POST",
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify({user_id: user_id, name: categoryName, title: documentTitle})
      }
    ).then(res => res.json())
    .then(data => {
      console.log(data)
      dispatch(addCategory(data.category))
      dispatch(addDocument({id: data.document.id, category: data.category, title: data.document.title}))
      dispatch(setDelta(data.document.id))
    })
  }
}
