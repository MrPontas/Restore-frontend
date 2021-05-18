import React, { useEffect, useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

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

import Loading from '../Loading';

import api from '../../services/api';

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

const useStyles = makeStyles({
  table: {
    maxWidth: '70%',
    marginTop: '50px',
    alignSelf: 'center',
  },
  codeCell: {
    width: '10%',
  },
  nameCell: {
    width: '25%',
  },
  descriptionCell: {
    width: '40%',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    width: '35px',
    height: '35px',
  },
  buttonDlt: {
    width: '35px',
    height: '35px',
    color: '#fff',
    backgroundColor: '#c74444',
    borderRadius: '5px',
  },
});

interface CategoryTableProps {
  handleEdit: (id: string) => void;
  handleExclude: (id: string) => void;
}

interface CategoryToString {
  id: string;
  name: string;
  category_number: string;
  description?: string;
}
const CategoryTable: React.FC<CategoryTableProps> = ({
  handleEdit,
  handleExclude,
}) => {
  const [finishedData, setFinishedData] = useState(false);

  const [categories, setCategories] = useState({} as CategoryToString[]);
  const classes = useStyles();

  useEffect(() => {
    try {
      api.get('categories').then((response) => {
        setCategories(response.data);
        setFinishedData(true);
      });
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  if (finishedData) {
    return (
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align={alignTitle} className={classes.codeCell}>
                Código
              </StyledTableCell>
              <StyledTableCell align={alignTitle} className={classes.nameCell}>
                Nome
              </StyledTableCell>
              <StyledTableCell
                align={alignTitle}
                className={classes.descriptionCell}
              >
                Descrição
              </StyledTableCell>
              <StyledTableCell align={alignTitle}> </StyledTableCell>
              <StyledTableCell align={alignTitle}> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => {
              return (
                <StyledTableRow>
                  <StyledTableCell align={alignTitle}>
                    {category.category_number}
                  </StyledTableCell>
                  <StyledTableCell
                    align={alignTitle}
                    className={classes.nameCell}
                  >
                    {category.name}
                  </StyledTableCell>
                  <StyledTableCell
                    align={alignTitle}
                    className={classes.descriptionCell}
                  >
                    {category.description}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <ButtonTooltip
                      title="Editar"
                      positionX="-50px"
                      positionY="-50px"
                    >
                      <button
                        id="edit-button"
                        type="button"
                        onClick={() => handleEdit(category.id)}
                        className={classes.button}
                      >
                        <FaRegEdit size={20} />
                      </button>
                    </ButtonTooltip>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <ButtonTooltip
                      title="Excluir"
                      positionX="-50px"
                      positionY="-50px"
                    >
                      <button
                        id="exclude-button"
                        type="button"
                        onClick={() => handleExclude(category.id)}
                        className={classes.buttonDlt}
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </ButtonTooltip>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <Loading />;
};
export default CategoryTable;
