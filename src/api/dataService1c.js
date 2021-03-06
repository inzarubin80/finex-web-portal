import { API_URL, username, password } from '../Constants'
import { logOut } from '../redux/user/userActions'
import axios from 'axios'


export const getAccessToken = () => {
    return localStorage.getItem('accessToken')
}

export const setAccessToken = (accessToken) => {

    console.log('accessToken', accessToken);
    localStorage.setItem('accessToken', accessToken);


}

export const login = (email, password) => {
    return axios.post(`${API_URL}/?typerequest=login`, {email, password });
}

export const getConformationCodeApi = (email) => {
    return axios.post(`${API_URL}/?typerequest=getConformationCode`, {email});
}

export const getKeyChangeApi = (email, requestKey, code) => {
    return axios.post(`${API_URL}/?typerequest=getKeyChangePassword`, {email, requestKey, code });
}

export const passwordChange = (passwordСhangeKey, password) => {
    return axios.post(`${API_URL}/?typerequest=passwordChange`, { passwordСhangeKey, password });
}

export const testPrivateRequest = () => {
    return axios.post(`${API_URL}/?typerequest=testPrivateRequest`, { test: 'test' });
}

const refreshToken = () => {
    return axios.post(`${API_URL}/?typerequest=refreshToken`, {});
}

export const executorRequests = (functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch) => {

    axios.defaults.headers.common = {
        'Authorization': `bearer ${getAccessToken()}`,
        'FCM': localStorage.getItem('messageRecipientKey')
    }

    functionRequest()
        .then(response => responseHandlingFunction(response.data))
        .catch((error) => {

            console.log('error', { error });

            if (!error.response && !error.request) {
                exceptionHandlingFunction("что то полшло не так..." + error.message);
            } else if (!error.response && error.request) {
                exceptionHandlingFunction("Проблема соединения")
            } else if (error.request.status == 401) {

               refreshToken()
                    .then(response => {
                        setAccessToken(response.data.accessToken)
                        return executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);
                    })
                    .catch((error) => {dispatch(logOut())})



            } else {
                exceptionHandlingFunction(error.response.data)
            }

        })
}

