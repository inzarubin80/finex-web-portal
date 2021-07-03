import { API_URL, username, password } from '../Constants'
import { logOut } from '../redux/user/userActions'
import axios from 'axios'

axios.defaults.headers.common = {
    'Authorization': `bearer ${localStorage.getItem('accessToken')}`,
    'FCM':   localStorage.getItem('messageRecipientKey')
}


export const login = (email,password) => {
    return axios.post(`${API_URL}/?typerequest=login`,  {email,password});
}

export const getConformationCodeApi = (userID) => {
    return axios.post(`${API_URL}/?typerequest=getConformationCode`,  { userID});   
}

export const getKeyChangeApi = (userID, requestKey, code) => {
    return axios.post(`${API_URL}/?typerequest=getKeyChangePassword`,  { userID, requestKey, code});
}


export const  passwordChange = (passwordСhangeKey, password) => {
    return axios.post(`${API_URL}/?typerequest=passwordChange`, {passwordСhangeKey, password });
}


export const executorRequests = (functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch) => {
    functionRequest()
        .then(response => responseHandlingFunction(response.data))
        .catch((error) => {

            console.log('error', {error});
            
            if (!error.response && !error.request) {
                 exceptionHandlingFunction("что то полшло не так..." + error.message);
            }  else if (!error.response && error.request) {   
                exceptionHandlingFunction("Проблема соединения")
            }  else if (error.request.status == 401) {
                   dispatch(logOut());
            }  else {
                exceptionHandlingFunction(error.response.data)
            }

        })

    }

