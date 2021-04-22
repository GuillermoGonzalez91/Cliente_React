import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';




const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,},
}));

export default function Deposits(props) {
  const classes = useStyles();


  
  var totalDeposits = props.transactions.reduce((sum, value) => (typeof value.Monto == "number" && value.Tipo !== "Egreso" ? sum + value.Monto : sum), 0);
  console.log(totalDeposits);

  return (
    <React.Fragment  >
       <Typography component="p" variant="h6" aling= "center" color = "primary" className={classes.depositContext}>
         INGRESOS TOTALES
      </Typography>
      <Typography component="p" variant="h4" aling= "center" color = "primary" className={classes.depositContext}>
      <ArrowUpwardIcon htmlColor  = 'green'  fontSize = 'large'/>
            $ {totalDeposits}
      </Typography>
    </React.Fragment>
  );
 }
