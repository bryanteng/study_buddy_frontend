import { API_ROOT } from '../constants';

class UserAdapter{
  static login(data){
    return fetch(`${API_ROOT}/login`,{
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({user: data})
    })
    .then(res => res.json())
  }

  static persist(token){
    return fetch(`${API_ROOT}/persist`,{
      method: "GET",
      headers: {
        "Authorization" : token
      }
    })
    .then(res => res.json())
  }
}

export default UserAdapter
