import React, {Fragment, useState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { AccessibilityNew } from '@material-ui/icons';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';




const useStyles = makeStyles((theme) => ({
  buttons2: {
  justifyContent : 'auto'
  }
  }));
//transaction, transactions ,setTransaction, setListUpdated
export default function Chart(props) {

  const [pos,setPos] = useState();

  const classes = useStyles();
  const theme = useTheme();
  const a = props.transactions

  
  const a2=a.filter(x => x.Tipo === "Ingreso" )
  const a1=a.filter(x => x.Tipo === "Egreso" )
  console.log(a1)
  console.log(a2)
  return (
    <React.Fragment>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center">
        <ButtonGroup classNeme={classes.buttons} disableElevation variant="contained" color="primary">
          <Button onClick={() => {setPos(1)}}>Ingresos</Button>
          <Button onClick={() => {setPos(2)}}>Gastos</Button>
        </ButtonGroup>
      </Grid>
     
      <ResponsiveContainer>
      { pos === 1 ?  
        <LineChart
          data = {a1}      
          margin={{
            top: 15,
            right: 200,
            bottom: 200,
            left: 50,
          }}
        >
          <XAxis dataKey="Fecha" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              INGRESOS
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="Monto" stroke="#008f39" dot={false} /> 
        </LineChart>
         :  
        <LineChart
          data = {a2}      
          margin={{
            top: 15,
            right: 200,
            bottom: 200,
            left: 50,
          }}
        >
          <XAxis dataKey="Fecha" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              GASTOS
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="Monto" stroke="#ff1100" dot={false} />

        </LineChart>
        }
      </ResponsiveContainer>
    </React.Fragment>
  );
}