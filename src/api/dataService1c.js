import { API_URL, username, password } from '../Constants'
import { logOut } from '../redux/user/userActions'
import axios from 'axios'

const auth = {auth: {username, password}} 

export const getAccessKey = (userID, requestKey, confirmationСode) => {
    let body = getBody({ userID, requestKey, confirmationСode })
    return axios.post(`${API_URL}/?typerequest=getAccessKey`,  body);
}

export const sendConformationCode = (userID, requestKey) => {
    let body = getBody({ userID, requestKey })
    return axios.post(`${API_URL}/?typerequest=sendConformationCode`,  body);
}

const getBody = (body = {}) => {
    body.key = localStorage.getItem('key');
    body.messageRecipientKey = localStorage.getItem('messageRecipientKey');
    return body
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

