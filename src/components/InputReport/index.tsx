import React, { useEffect, useState } from 'react';
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
import sortArray from '../../utils/sortObjectArray';
import api from '../../services/api';
import Loading from '../Loading';

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

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      marginTop: '5px',
    },
  })
)(TableRow);

interface TableProps {
  status: string | null;
  start: string | null;
  end: string | null;
}

const CustomizedTables: React.FC<TableProps> = ({ status, start, end }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [finishedData, setFinishedData] = useState(false);

  useEffect(() => {
    api
      .get(`products/?status=${status}&start=${start}&end=${end}`)
      .then((response) => {
        sortArray(response.data);
        setProducts(response.data);
        setFinishedData(true);
      });
  }, [setFinishedData, end, start, status]);

  if (finishedData) {
    return (
      <>
        <TableContainer
          component={Paper}
          style={{
            margin: '50px auto 0 auto',
            width: '1000px',
          }}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align={alignTitle}>Código </StyledTableCell>
                <StyledTableCell align={alignTitle}>Nome </StyledTableCell>
                <StyledTableCell align={alignTitle}>Compra </StyledTableCell>
                <StyledTableCell align={alignTitle}>Venda </StyledTableCell>
                <StyledTableCell align={alignTitle}>Tipo</StyledTableCell>
                <StyledTableCell align={alignTitle}>Categoria</StyledTableCell>
                <StyledTableCell align={alignTitle}>Fornecedor</StyledTableCell>
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
                    {product.purchase_value.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.sale_value.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.purchase_type === 'C' ? 'Consignado' : 'Próprio'}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.category.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.provider.name}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  return <Loading />;
};
export default CustomizedTables;
