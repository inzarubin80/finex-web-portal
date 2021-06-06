import logo from './logo.svg';
import './App.css';
import { API_URL, username, password } from './Constants'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'



const auth = {auth: {username, password}} 




const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});



const Test =  () => {

  
  axios.post(`${API_URL}/?typerequest=sendConformationCode`,{},{s:1, d2:2})
  axios.get(`${API_URL}/?typerequest=sendConformationCode`)
  
  
 
}




function App() {
  return (
    <div className="App">
      <Button variant="contained" color="primary" onClick={Test}>
        ТЕСТ111
      </Button>


    </div>
  );
}

export default App;
