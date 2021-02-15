import React from "react";
import {
  useQueryWithStore
} from "react-admin";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
export const SchemaSettings = (props) => {
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();
    const { loaded, error, data } = useQueryWithStore({
        type: 'getOne',
        resource: 'schema',
        payload: { id: "123457" }
    });
    if(error){
        console.log(error)
    }
    const formElement = [];
    if (loaded) {
        for (const key of Object.keys(data)) {
            formElement.push(key);
        }
    }
    return (
<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Custom felt</TableCell>
            <TableCell align="right">Synlig</TableCell>
            <TableCell align="right">Beskrivelse</TableCell>
            <TableCell align="right">Datatype</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formElement.map((row) => (
            <TableRow key={row}>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="right">{data[row].visibility ? 'synlig' : 'skjult'}</TableCell>
              <TableCell align="right">{data[row].description}</TableCell>
              <TableCell align="right">{data[row].datatype}</TableCell>
              {console.log(data[row])}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
};
  export default SchemaSettings