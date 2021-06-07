import { API_URL, username, password } from '../Constants'
import { logOut } from '../redux/user/userActions'
import axios from 'axios'



export const getAccessKey = (email,password) => {
    let body = getBody({ email,password})
    return axios.post(`${API_URL}/?typerequest=getAccessKey`,  body);
}

export const sendConformationCode = (userID, requestKey) => {
    let body = getBody({ userID, requestKey })
    return axios.post(`${API_URL}/?typerequest=sendConformationCode`,  body);
}

export const  passwordChange = (passwordСhangeKey, password) => {
    let body = getBody({passwordСhangeKey, password })
    return axios.post(`${API_URL}/?typerequest=passwordChange`, body);
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

