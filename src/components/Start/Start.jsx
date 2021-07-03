import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,

        },

        ref: {

            display: 'block',
            margin: '0 auto',
            width: '240px'
        },


        logo: {

            display: 'block',
            margin: '0 auto',
            maxWidth: '95%'
        },

        paper: {
            textAlign: 'center',
            width: '80%',
            //color: theme.palette.text.secondary,
            margin: '0 auto',
            marginBottom: '35px'

        },

    }),
);


export default function Start() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>        
                <Grid item xs={12}>
                    <Typography className={classes.paper} xs={12} variant="h6" component="h6">
                    FiNEX
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.paper} variant="body2" color="textSecondary" component="p">
                            FiNEX handcrafted floors - мы создаём безграничные возможности для ваших интерьеров!
                    </Typography>
                </Grid>


            </Grid>
        </div>
    );
}