import React, {Fragment, useState, useEffect} from 'react';
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
import CardResume from './Components/CardResume';



const useStyles = makeStyles((theme) => ({
paper: {
  padding: theme.spacing(10),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
  borderRadius: theme.spacing(4),
  alignItems : 'center'

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
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  borderRadius: theme.spacing(11),
}, 
buttons2: {
  borderRadius: theme.spacing(11),
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
  const [pos,setPos] = useState();

  function getContent(pos) {
    switch (pos) {
      case 0:
        return(
          <Fragment>
            <Chart transaction={transaction} setTransaction={setTransaction} transactions={transactions} setListUpdated={setListUpdated} />
          </Fragment>
        )
      case 1:
       return(
         <Grid  className={classes.paper2}>
                  <Form transaction={transaction} setTransaction={setTransaction} transactions={transactions} setListUpdated={setListUpdated}  />
         </Grid>
       )
       default: 
       return(<Grid item xs={12}>
          <Paper className={classes.paper2} >
            <CustomPaginationActionsTable transaction={transaction} setTransaction={setTransaction} transactions={transactions} setListUpdated={setListUpdated} />
          </Paper>
        </Grid>)
        } 
  }
  
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
          <Container>
            <Grid container spacing={10}>
              {/* Recent Deposits  */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper className={fixedHeightPaper}>
                <CardResume type = {'GASTOS TOTALES'} transactions={transactions} />
                </Paper>
              </Grid>
              {/* Recent Expenses */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper className={fixedHeightPaper}>
                  <CardResume type = {'INGRESOS TOTALES'} transactions={transactions} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div >
        <div className={classes.buttons}>
          <Fragment>
            <ButtonGroup outlined = "none"color = "primary" fullWidth disableElevation variant="contained" className={classes.buttons2}>
              <Button outlined  = "none" onClick={() => { setPos(2)}}>Listado</Button>
              <Button outlined  = "none" onClick={() => { setPos(0)}}>Grafico</Button>
              <Button outlined  = "none" onClick={() => { setPos(1)}}>Ingresar Movimientos</Button>
            </ButtonGroup>
          </Fragment>
        </div>
            {getContent(pos)} 
      </main>
    </div>
  );
}

export default App;
