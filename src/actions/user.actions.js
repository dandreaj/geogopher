import { userService } from '../services';

export const userActions = {
    register,
    login,
    logout
};

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    console.log('User created: ', user);
                    // dispatch(success());
                    // history.push('/login');
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    console.log('Error registering user: ', error);
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: 'USERS_REGISTER_REQUEST', user } }
    // function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    // function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function login(user) {
    return dispatch => {
        userService.getUserInfo(user.profileObj, true)
            .then(
                userObj => {
                    user.profileObj.user_id = userObj;
                    dispatch({ type: 'LOGIN_SUCCESS', payload: user.profileObj })
                },
                error => {
                    console.log('Error getting user info: ', error)
                }
            )

    }
}

function logout() {
    userService.logout();
    return dispatch => { 
        dispatch({ type: 'LOGOUT' });
        dispatch({ type: 'CLEAR_GAME'});
    };
}
