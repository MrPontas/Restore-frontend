import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { GrView } from 'react-icons/gr';
import { ProductProps } from '../../utils/props';

// import ButtonTooltip from '../ButtonTooltip';

const alignTitle = 'left';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 12,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

interface TableProps {
  products: ProductProps[];
}

const CustomizedTables: React.FC<TableProps> = ({ products }) => {
  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          width: '1000px',
        }}
      >
        <Table aria-label="customized table" size="small">
          <TableHead style={{ padding: '0' }}>
            <TableRow>
              <StyledTableCell align={alignTitle}>Código </StyledTableCell>
              <StyledTableCell align={alignTitle}>Nome </StyledTableCell>
              <StyledTableCell align={alignTitle}>
                Preço de compra{' '}
              </StyledTableCell>
              <StyledTableCell align={alignTitle}>
                Preço de venda{' '}
              </StyledTableCell>
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
};
export default CustomizedTables;
