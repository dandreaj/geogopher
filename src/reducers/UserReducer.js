export default function reducer(state = {
  user: null,
  gameSelected: null,
  registering: null,
}, action) {
  switch (action.type) {
  case 'SELECT_GAME': {
    return {
      ...state,
      gameSelected: action.payload
    };
  }
  case 'USERS_REGISTER_REQUEST': {
    return {
      ...state,
      registering: true,
     };
  }
  case 'LOGIN_SUCCESS': {
    return {
      ...state,
      user: action.payload
    };
   }
   case 'LOGOUT': {
     return {}
   }
  }
  return state;
}