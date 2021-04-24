import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,},
}));

export default function CardResume(props) {
  const classes = useStyles();
  var value;

    function showTransation(tipe) {
        if (tipe === "INGRESOS TOTALES") {
             var TotalTransaction = props.transactions.reduce((sum, value) => (typeof value.Monto == "number" && value.Tipo !== "Egreso" ? sum + value.Monto : sum), 0);
            console.log(TotalTransaction);
        }
        else {
             TotalTransaction = props.transactions.reduce((sum, value) => (typeof value.Monto == "number" && value.Tipo !== "Ingreso" ? sum + value.Monto : sum), 0);
            console.log(TotalTransaction);
        }
        return(TotalTransaction)
    }
    value = showTransation(props.tipe)

    return (
        <React.Fragment>
            <Typography component="p" variant="h6" aling="center" color="primary" className={classes.depositContext}>
                {props.tipe}
            </Typography>
            <Typography component="p" variant="h4" aling="center" color="primary" className={classes.depositContext}>
                {props.tipe === "INGRESOS TOTALES" ? <ArrowUpwardIcon htmlColor='green' fontSize='large' /> :
                    <ArrowDownwardIcon htmlColor='red' fontSize='large' />}
            ${value}
            </Typography>
        </React.Fragment>
    );
}
