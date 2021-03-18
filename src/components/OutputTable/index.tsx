import React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

import { ProductProps } from '../../utils/props';
import sortArray from '../../utils/sortObjectArray';
import api from '../../services/api';
import Loading from '../Loading';
import { Message } from './styles';

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
        '&:hover': {
          backgroundColor: '#b9b9b9',
        },
        '&.Mui-selected': {
          background: '#dfdfdf',
        },
      },
      '&:nth-of-type(even)': {
        '&:hover': {
          backgroundColor: '#b9b9b9',
        },
        marginTop: '5px',
        '&.Mui-selected': {
          background: '#f0f0f0',
        },
      },
    },
  })
)(TableRow);

const GreenCheckbox = withStyles({
  root: {
    '&$checked': {
      color: '#82af99',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface TableProps {
  handleOutputProducts: (productsId: ProductProps[]) => void;
}

const CustomizedTables: React.FC<TableProps> = ({ handleOutputProducts }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [finishedData, setFinishedData] = useState(false);
  const [selected, setSelected] = React.useState<ProductProps[]>([]);

  const isSelected = (p: ProductProps): boolean => selected.indexOf(p) !== -1;

  useEffect((): void => {
    handleOutputProducts(selected);
  }, [selected, handleOutputProducts]);

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    api.get(`products/?status=I`).then((response) => {
      sortArray(response.data);
      setProducts(response.data);
      setFinishedData(true);
    });
  }, [setFinishedData]);

  const handleClick = (
    event: React.MouseEvent<unknown>,
    productHandle: ProductProps
  ): void => {
    const selectedIndex = selected.indexOf(productHandle);
    let newSelected: ProductProps[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, productHandle);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  if (finishedData) {
    return (
      <>
        {products.length === 0 ? (
          <Message>Parece que não há produtos :(</Message>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align={alignTitle}>
                    <GreenCheckbox
                      onChange={(event) => handleSelectAllClick(event)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align={alignTitle}>Nome </StyledTableCell>
                  <StyledTableCell align={alignTitle}>Modelo </StyledTableCell>
                  <StyledTableCell align={alignTitle}>
                    Categoria
                  </StyledTableCell>
                  <StyledTableCell align={alignTitle}>Gênero</StyledTableCell>
                  <StyledTableCell align={alignTitle}>Venda</StyledTableCell>
                  <StyledTableCell align={alignTitle}>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => {
                  const isItemSelected = isSelected(product);
                  return (
                    <StyledTableRow
                      key={product.id}
                      selected={isItemSelected}
                      onClick={(event) => handleClick(event, product)}
                    >
                      <StyledTableCell align="left">
                        <GreenCheckbox
                          // onChange={handleChange}
                          checked={isItemSelected}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.name}
                      </StyledTableCell>
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
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
    );
  }
  return <Loading />;
};
export default CustomizedTables;
