import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';



function preventDefault(event) {
  event.preventDefault();
}
const useStyles = makeStyles({
  depositContext: {
    flex: 4,},});

export default function Egress(props) {

  const classes = useStyles();
  var totalEgress = props.transactions.reduce((sum, value) => (typeof value.Monto == "number" && value.Tipo !== "Ingreso" ? sum + value.Monto : sum), 0);
  console.log(totalEgress);
  
  return (
    <React.Fragment>
    
       <Typography component="p" variant="h6" aling= "center" color = "primary" className={classes.depositContext}>
         GASTOS TOTALES
      </Typography>
      <Typography component="p" variant="h4" aling= "center" color = "primary" className={classes.depositContext}>
      <ArrowDownwardIcon color = 'secondary' fontSize = 'large'/>
         $ {totalEgress}
      </Typography>
    </React.Fragment>
  );
 }

