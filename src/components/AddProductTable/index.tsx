import React, { useCallback, useState } from 'react';
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
import { FaRegEdit } from 'react-icons/fa';
import { SiIfixit } from 'react-icons/si';

import EditProduct from '../EditProduct';

import { ProductProps } from '../../utils/props';
import Loading from '../Loading';

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
    backgroundColor: '#82af99',
    color: '#fff',
    borderRadius: '5px',
    padding: '2px 2px 0px 2px',
    marginRight: '8px',
  },
  excludeButton: {
    MaxHeight: '100%',
    MaxWidth: '100%',
    padding: '2px 2px 0px 2px',
    backgroundColor: '#c74444',
    color: '#fff',
    borderRadius: '5px',
  },
  styledRow: {
    width: '100%',
    border: 'transparent',
    background: 'transparent',
  },
  buttonCell: {
    flexDirection: 'row',
  },
  table: {
    height: '100%',
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
  handleProduct: (data: ProductProps) => void;
}

const CustomizedTables: React.FC<TableProps> = ({
  products,
  handleProduct,
}) => {
  const classes = useStyles();
  const [editProduct, setEditProduct] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductProps>(
    {} as ProductProps
  );
  const [productsTable, setProductsTable] = useState<ProductProps[]>(products);

  const handleEdit = useCallback((product: ProductProps) => {
    setEditProduct(true);
    setProductToEdit(product);
  }, []);
  const handleEditedProduct = useCallback(
    (data: ProductProps) => {
      setEditProduct(false);
      handleProduct(data);
    },
    [handleProduct]
  );

  if (productsTable) {
    return (
      <>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align={alignTitle}>Nome</StyledTableCell>
                <StyledTableCell align={alignTitle}>Modelo</StyledTableCell>
                <StyledTableCell align={alignTitle}>Categoria</StyledTableCell>
                <StyledTableCell align={alignTitle}>Gênero</StyledTableCell>
                <StyledTableCell align={alignTitle}>Venda</StyledTableCell>
                <StyledTableCell align={alignTitle}> </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <StyledTableRow key={product.id}>
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
                  <StyledTableCell align="left" className={classes.buttonCell}>
                    {/* <button
                      id="edit-button"
                      type="button"
                      onClick={() => handleEdit(product)}
                      className={classes.button}
                    >
                      <FaRegEdit size={20} />
                    </button> */}
                    {/* <button
                      id="exclude-button"
                      type="button"
                      className={classes.excludeButton}
                    >
                      <SiIfixit size={20} />
                    </button> */}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {editProduct && (
          <EditProduct
            handleEditedProduct={handleEditedProduct}
            editProduct={productToEdit}
          />
        )}
      </>
    );
  }
  return <Loading />;
};
export default CustomizedTables;
