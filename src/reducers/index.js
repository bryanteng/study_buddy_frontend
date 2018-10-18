import { combineReducers } from 'redux';
import page from './page';
import login from './login'
import notecard from './notecard'


export default combineReducers({
  page, login, notecard
});
