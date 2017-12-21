import axios from 'axios';

export const userService = {
    register,
    getUserInfo,
    logout,
    login,
};

function register(user) {
    return axios.post('/api/user', user)
      .then(function (response) {
          return response.data;
      })
      .catch(function (error) {
       return error;
      });
}

function getUserInfo(userObj, google) {
    let user = {};
    user = userObj;
    user.google = google;
    return axios.get('/api/user/', { params: user })
        .then(function(response) {
            let user = {};
            localStorage.setItem('user', JSON.stringify(response.data.user_id));
            return response.data.user_id;
        })
        .catch(function(error) {
            return error;
        })
}

function logout() {
   localStorage.removeItem('user');
}

function login(user) {
    return axios.post('/api/login', user )
    .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data.user_id));
        return response.data;
    })
    .catch(function(error) {
        return error;
    })
}
