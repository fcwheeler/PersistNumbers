import React, { Component, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  indexCell: {
    width: 5
  }
});

function CalculationPage(props) {
  const { classes } = props;
  const [baseNumber, baseNumberChange] = useState(11);
  const [numberTree, numberTreeChange] = useState([11]);

  function handleCalculation() {
    let done = false;
    let iterator = 0;
    let tempCurrentNumber = parseInt(baseNumber);
    let tempNumberTree = [];

    console.log(baseNumber);
    while (!done) {
      tempCurrentNumber = calcdigits(tempCurrentNumber);
      tempNumberTree.push(tempCurrentNumber);

      if (tempCurrentNumber.toString().length === 1) {
        done = true;
      }

      iterator++;
      if (iterator > 15) {
        done = true;
      }
    }

    numberTreeChange(tempNumberTree);

    return;
  }

  function calcdigits(value) {
    let product = 1;

    var numbers = ("" + value).split("").map(function(t) {
      return parseInt(t);
    });

    for (var i = 0; i < numbers.length; i++) {
      product *= numbers[i];
      console.log(product);
    }

    return product;
  }

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={16}
      >
        <Grid item>
          <h2>Persistence Checker</h2>
        </Grid>
        <Grid>
          <Paper className={classes.root} elevation={1}>
            <TextField onChange={e => baseNumberChange(e.target.value)} />
            <Button onClick={() => handleCalculation()}>Calculate</Button>
          </Paper>
          <Paper>
            <div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.indexCell}>
                      <Typography key={0}> Start</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography key={baseNumber}>{baseNumber}</Typography>
                    </TableCell>
                  </TableRow>
                  {numberTree ? (
                    numberTree.map((branch, i) => {
                      return (
                        <TableRow>
                          <TableCell className={classes.indexCell}>
                            <Typography key={i}> {i + 1}.</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography key={branch}>{branch}</Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(CalculationPage);
