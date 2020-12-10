import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles({
  root: {
    width: '100%',
    fontSize: '1rem'
  },
  container: {
    maxHeight: 440,

  },
  head: {
    fontSize: "2rem"
  },
  body: {
    fontSize: "1rem",
    fontWeight: "600"
  }
});

export default function AdminUserTable(props) {
  const classes = useStyles();
  
  const { columns, rows } = props
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow onClick={props.onRowClick.bind(this,rows)}>
              {columns.map((column) => (
                <TableCell
                  className={classes.body}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow role="checkbox" tabIndex={-1} key={row.code}
                  className={row.isRowSelected ? `row-selected ${classes.root}` : `${classes.root} not-selected`}
                  onClick={props.onRowClick !== undefined ?
                    props.onRowClick.bind(this, row)
                    : null
                  }
                >
                  <TableCell component="th" scope="row">
                    {row.name.first}
                  </TableCell>
                  <TableCell component="th" scope="row">
                  {row.name.last}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.location.street.number+" "+row.location.street.name +" "+row.city+","+row.state+","+row.country}
                  </TableCell>
                  <TableCell component="th" scope="row">
                  <Avatar alt="Remy Sharp" src={row.picture.large} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                 {row.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                 {row.dob.date}
                 </TableCell>
                  {/* })} */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    
    </Paper>
  );
}
