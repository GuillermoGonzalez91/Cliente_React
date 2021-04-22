import React, {Fragment, useState, useEffect} from 'react';
import Deposits from './Components/Deposits'
import Egress from './Components/Egress'
import CustomPaginationActionsTable from './Components/List'
import Form from  './Components/FormPrimary'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import PrimarySearchAppBar from './Components/Navbar'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Chart from './Components/Chart'


const useStyles = makeStyles((theme) => ({
paper: {
  padding: theme.spacing(10),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
  borderRadius: theme.spacing(2)

},
cuadrado :{
  width: theme.spacing(10),
  height:theme.spacing(10), 
  backgroundColor: "#bfd7ff"
},


sidebar: {
    position: 'sticky',
    top: 0
},

paper2: {
  padding: theme.spacing(10),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
 backgroundColor: "#bfd7ff"
},
backgroundColor: {
 backgroundColor: "#bfd7ff"
},
fixedHeight: {
  height: 'auto',
},
appBarSpacer: theme.mixins.toolbar,
content: {
  height: '100vh',
  overflow: 'auto',
  backgroundColor: "#ffffff"
},
container: {
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),

},
buttons: {
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(5),
  aling : 'center',

}, 
buttons2: {
  height:theme.spacing(15), 
}

}));

function App() {

  const [transaction, setTransaction] = useState({
    concepto: '',
    monto: 0,
    fecha: Date,
    tipo: ''
  })

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);



  const [transactions, setTransactions] = useState([])
  const [listUpdated, setListUpdated] = useState(false)
  const [mostrar,setMostrar] = useState(true);

  useEffect(() => {
    const getTransactios = () => {
      fetch('http://localhost:9000/api')
      .then(res => res.json())
      .then(res => setTransactions(res))
    }
    getTransactios()
    setListUpdated(false)
  }, [listUpdated]
  )
 
  return (
    <div>
      <main className={classes.content}>
      <PrimarySearchAppBar/>
        <div className={classes.appBarSpacer} />
        <div className={classes.backgroundColor}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={10}>
              {/* Recent Deposits  */}
              <Grid item xs={6} md={6} lg={6}>
                <Paper className={fixedHeightPaper}>
                  <Deposits transactions={transactions} />
                </Paper>
              </Grid>
              {/* Recent Expenses */}
              <Grid item xs={6} md={6} lg={6}>
                <Paper className={fixedHeightPaper}>
                  <Egress transactions={transactions} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div >
        <div className={classes.buttons}>
          <Fragment>
            <ButtonGroup outlined = "none"color = "primary" fullWidth disableElevation variant="contained" className={classes.buttons2}>
              <Button disableRipple  = "none" onClick={() => { setMostrar(true) }}>Grafico</Button>
              <Button outlined = "none" onClick={() => { setMostrar(false) }}>Ingresar Movimientos</Button>
              <Button outlined = "none" onClick={() => { setMostrar(false) }}>Listado</Button>
            </ButtonGroup>
          </Fragment>
        </div>
  {mostrar
        ?
        <Form transaction={transaction} setTransaction={setTransaction} setListUpdated={setListUpdated} />
        :<Chart transaction={transaction} setTransaction={setTransaction} transactions={transactions} setListUpdated={setListUpdated} />
      }
        <Grid item xs={12}>
          <Paper className={classes.paper2} >
            <CustomPaginationActionsTable transaction={transaction} setTransaction={setTransaction} transactions={transactions} setListUpdated={setListUpdated} />
          </Paper>
        </Grid>
      </main>
    </div>
  );
}

export default App;
