import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { GrView } from 'react-icons/gr';
import { ProductProps } from '../../utils/props';

import ButtonTooltip from '../ButtonTooltip';

const alignTitle = 'left';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const useStyles = makeStyles({
  button: {
    MaxHeight: '100%',
    MaxWidth: '100%',
    backgroundColor: '#fff',
    // color: '#fff',
    borderRadius: '5px',
    padding: '2px',
    marginRight: '3px',
  },
  styledRow: {
    width: '100%',
    border: 'transparent',
    background: 'transparent',
  },
});

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        '&:hover': {
          backgroundColor: '#b9b9b9',
        },
      },
      '&:nth-of-type(even)': {
        '&:hover': {
          backgroundColor: '#b9b9b9',
        },
      },
      marginTop: '5px',
    },
  })
)(TableRow);

interface TableProps {
  products: ProductProps[];
}

const CustomizedTables: React.FC<TableProps> = ({ products }) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align={alignTitle}>Código</StyledTableCell>
              <StyledTableCell align={alignTitle}>Nome</StyledTableCell>
              <StyledTableCell align={alignTitle}>Modelo</StyledTableCell>
              <StyledTableCell align={alignTitle}>Categoria</StyledTableCell>
              <StyledTableCell align={alignTitle}>Gênero</StyledTableCell>
              <StyledTableCell align={alignTitle}>Venda</StyledTableCell>
              <StyledTableCell align={alignTitle}>Status</StyledTableCell>
              <StyledTableCell align={alignTitle}> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell align="left">
                  {product.product_number}
                </StyledTableCell>
                <StyledTableCell align="left">{product.name}</StyledTableCell>
                <StyledTableCell align="left">
                  {product.mold.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {product.category.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {product.genre === 'F' ? 'Feminino' : 'Masculino'}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {product.sale_value.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {product.status === 'I' ? 'Em estoque' : 'Indisponível'}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <NavLink to={`/dashboard/productView/${product.id}`}>
                    <ButtonTooltip
                      title="Visualizar"
                      positionX="-134px"
                      positionY="-5px"
                    >
                      <button
                        id="view-button"
                        type="button"
                        className={classes.button}
                      >
                        <GrView size={20} />
                      </button>
                    </ButtonTooltip>
                  </NavLink>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default CustomizedTables;
