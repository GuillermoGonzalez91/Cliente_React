import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Grid from '@material-ui/core/Grid';
import TableHead from '@material-ui/core/TableHead';
import { withStyles} from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from '@sweetalert/with-react';
import TextField from '@material-ui/core/TextField';


import {useState} from 'react';
import { Fragment } from 'react';




const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(1),
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
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});




export default function CustomPaginationActionsTable({transaction, setTransaction, transactions, setListUpdated}) {



  const classes = useStyles2();



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, transactions.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  //METODO PARA GAURDAR EN UN STATE LOS VVALORES INGRESADOS
  const handleChange = e => {
    setTransaction({
      transaction,
      [e.target.name]: e.target.value
    })
  };
  let { concepto, monto, fecha, tipo } = transaction



//METODO PARA BORRAR EL CAMPO SELECCIONADO
  const handleDelete = id => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const requestInit = {
          method: 'DELETE'
      }
      fetch('http://localhost:9000/api/' + id, requestInit)
      .then(res => res.text())
      .then(res => console.log(res))
      setListUpdated(true)
      swal("Your file has been deleted!", {
          icon: "success",
        });
      } 
      else {
        swal("Your file is safe!");
      }
    });
}


//CONSULTA PUT PARA EDITAR
const handleUpdate = (id) => {
    const requestInit = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(transaction)
  }
  fetch('http://localhost:9000/api/' + id, requestInit)
  .then(res => res.text())
  .then(res => console.log(res))
  setListUpdated(true)
    }




// FORMULARIO PARA EDITAR EL CAMPO
const formUpdate = (Id) => {
  swal(<Grid>
Modificar movimiento
      
      <Grid container spacing={3}>
           <Grid item xs={12} sm={6}>
             Ingresar el concepto
             <TextField onChange={handleChange}
             required
               id="concepto"
               name="concepto"
               value={concepto}
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             Ingresar el monto
             <TextField onChange={handleChange}
             required
               id="monto"
               name="monto"
               value={monto}
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             Ingresar la fecha
             <TextField onChange={handleChange}
             required
               id="fecha"
               name="fecha"
               value={fecha}
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             Tipo de Transaccion
             <TextField onChange={handleChange}
             required
               id="fecha"
               name="tipo"
               value={tipo}
             />
           </Grid>
           </Grid>
  </Grid>
  , {
    buttons: true,
    dangerMode: true})
  .then((willUpdate) => {
    if (willUpdate) {
    handleUpdate(transaction.Id)
   swal("Your file has been update!", {
    icon: "success",
   });
    } 
    else {
      swal("Your file is not update!");
    }
  });
}



return (
<Grid  className={classes.layout}>
<TableContainer>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead color = "primary">
          <TableRow>
            <StyledTableCell >Concepto</StyledTableCell>
            <StyledTableCell align="center">Monto</StyledTableCell>
            <StyledTableCell  align="center">Fecha</StyledTableCell>
            <StyledTableCell  align="center">Tipo</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : transactions
          ).map((transaction) => (
            <TableRow key={transaction.Id}>
              <TableCell component="th" scope="row">
                {transaction.Concepto}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {transaction.Monto}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {transaction.Fecha}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {transaction.Tipo}
               
               
               
              </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                   <IconButton aria-label="delete" className={classes.margin}>
                  <DeleteIcon  onClick={() => handleDelete(transaction.Id)}fontSize="small" />
                </IconButton>
                <IconButton>
                  <EditIcon onClick={() => formUpdate(transaction.Id)}fontSize="small" />
                </IconButton>
                </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={11} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={transactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
</TableContainer>
</Grid>
  );
}













