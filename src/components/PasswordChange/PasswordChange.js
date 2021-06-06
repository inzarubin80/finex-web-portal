import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import { useDispatch, useSelector } from 'react-redux';
import { sendConfirmationСode, login, сlearError, cancelConformation } from '../../redux/user/userActions';


import { Alert, AlertTitle } from '@material-ui/lab';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import {
  useHistory,
  useLocation
} from "react-router-dom";

const validationSchema = yup.object(

);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  margin: {
    margin: theme.spacing(1),
  },


  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    //border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  buttonConfirmation: {
    marginTop: theme.spacing(1),

  },

  buttonConfirmationGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },

    alert: {
      maxWidth: '12%'
    }

  }


}));


const PasswordChange = () => {


  const dispatch = useDispatch();
  const err = useSelector(state => state.user.err);
  const confirmationСodeSent = useSelector(state => state.user.confirmationСodeSent);
  const confirmationСodeRequested = useSelector(state => state.user.confirmationСodeRequested);
  const loggingIn = useSelector(state => state.user.loggingIn);
  const [confirmationСode, setConfirmationСode] = React.useState('');
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/makets" } };

  const sb = () => {
    history.replace(from);
  }

  const formik = useFormik({
    initialValues: {
      password:  '',
      passwordRepeated: ''

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {


      dispatch(sendConfirmationСode(values.password))



    },
  });

  const classes = useStyles();


  return (
    <div>

     

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

        
         <Typography component="h1" variant="h5">
            Установка пароля
         </Typography>

          <form onSubmit={formik.handleSubmit}>
          
            <TextField
              fullWidth
              id="password"

              type="password"

              name="password"
              label="Новый пароль"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              className={classes.margin}
            />

            <TextField
              fullWidth
              id="passwordRepeated"

              type="password"

              name="passwordRepeated"
              label="Подтверждение пароля"
              value={formik.values.passwordRepeated}
              onChange={formik.handleChange}
              error={formik.touched.passwordRepeated && Boolean(formik.errors.passwordRepeated)}
              helperText={formik.touched.passwordRepeated && formik.errors.passwordRepeated}
              className={classes.margin}
            />
            
            <Button color="primary" variant="contained" fullWidth type="submit" disabled={confirmationСodeRequested}>
              Сменить пароль
            </Button>


            {err && !confirmationСodeSent && <Alert severity="error">
              <AlertTitle>  {err}</AlertTitle>
            </Alert>}

          </form>
        </div>
      </Container>
    </div>
  );
};


export default PasswordChange

