import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormSecundary from './FormSecundary';
import Resume from './Resume';






const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
const steps = ['Ingresar Transaccion', 'Datos'];






export default function Checkout({transaction, setTransaction, setListUpdated}) {


  const handleSubmit = () => {

    //consulta
    const requestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(transaction)
    }
    fetch('http://localhost:9000/api', requestInit)
    .then(res => res.text())
    .then(res => console.log(res))

    //reiniciando state de la transaccion
    setTransaction({
        concepto: '',
        monto: 0,
        fecha: Date,
        tipo:''
    })
    
    setListUpdated(true);
setActivate();
}

//REEMPAZAR POR UN IF 
    function getStepContent(step, transaction, setTransaction) {
        switch (step) {
          case 0:
            return <FormSecundary transaction={transaction} setTransaction = {setTransaction}/>;
          case 1:
            return <Resume transaction={transaction}/>;
          default:
            throw new Error('Unknown step');
        }
      }
      
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0); 

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

const setActivate = () => {
    setActiveStep(0);
  };

 


  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
          FORM
          </Typography>

          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>


          <React.Fragment>
            {activeStep === steps.length ? (
                 <React.Fragment>
                 <Typography variant="h6" gutterBottom>
                   Thank you for your order.
                 </Typography>
                 <Typography variant="subtitle1">
                  Mensaje de confirmacion!!
                 </Typography>
                 <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.button}
                  >
                       Back           
                  </Button>      
               </React.Fragment>
               
            ) : (
              <React.Fragment>
                {getStepContent(activeStep,transaction,setTransaction)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}