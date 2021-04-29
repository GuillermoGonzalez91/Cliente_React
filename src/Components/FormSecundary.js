import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

export default function AddressForm({transaction, setTransaction}) {



  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
    const classes = useStyles();

  const handleChange = e => {
    setTransaction({
        ...transaction,
        [e.target.name]: e.target.value
    })};


let{concepto, monto, fecha, tipo} = transaction
    
return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
    Cargar datos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <TextField onChange = {handleChange}
            required
            id="conncepto"
            name="concepto"
            label="Ingresar el conceptp"
            value={concepto}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField onChange = {handleChange}
            required
            id="monto"
            name="monto"
            label="Ingresar el monto"
            value={monto}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField onChange = {handleChange}
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
          onChange = {handleChange}>
            <MenuItem value={'Ingreso'}>Ingreso</MenuItem>
            <MenuItem value={'Egreso'} >Egreso</MenuItem>
          </Select>
        </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}