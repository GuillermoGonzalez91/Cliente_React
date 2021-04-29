import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';





const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Resume({transaction}) {
  const classes = useStyles();




  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Resumen de la transaccion
      </Typography>
      <List >
          <ListItem className={classes.listItem}>
          <ListItemText primary={transaction.concepto} /> 
          <ListItemText primary={transaction.monto} />  
          <ListItemText primary={transaction.fecha} /> 
          <ListItemText primary={transaction.tipo}/>
          </ListItem>
      </List>

    </React.Fragment>
  );
}