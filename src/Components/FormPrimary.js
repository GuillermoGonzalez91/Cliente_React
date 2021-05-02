import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import swal from 'sweetalert';



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    [theme.breakpoints.up(600 + theme.spacing(4) * 4)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    [theme.breakpoints.up(600 + theme.spacing(4) * 3)]: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(7),
      padding: theme.spacing(4),
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
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormTransaction({ transaction, setTransaction, setListUpdated }) {


  const handleSubmit = () => {
        swal({
      title: "Are you sure?",
      text: "Are you sure you want to save the file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

        const requestInit = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
          tipo: ''
        })
    
        setListUpdated(true);
      
    

      swal("Your file has been save!", {
          icon: "success",
        });
      } 
      else {
        swal("Your file is not save!");
      }
    });
}



  const handleChange = e => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value
    })
  };

  let { concepto, monto, fecha, tipo } = transaction

  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            FORM
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField onChange={handleChange}
                required
                id="conncepto"
                name="concepto"
                label="Ingresar el concepto"
                value={concepto}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onChange={handleChange}
                required
                id="monto"
                name="monto"
                label="Ingresar el monto"
                value={monto}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onChange={handleChange}
                required
                id="fecha"
                name="fecha"
                label="Ingresar la fecha"
                value={fecha}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel>Tipo</InputLabel>
                <Select
                  required
                  id="tipo"
                  name="tipo"
                  label="Ingresar el tipo"
                  value={tipo}
                  onChange={handleChange}>
                  <MenuItem value={'Ingreso'}>Ingreso</MenuItem>
                  <MenuItem value={'Egreso'} >Egreso</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Button className={classes.button} variant="contained" color="primary"  required onClick={() => { setValores() }}>Cancelar</Button>
            <Button className={classes.button} variant="contained" color="primary" required onClick={() => { handleSubmit() }}>Confirmar</Button>
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
}