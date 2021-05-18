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

import { UserProps } from '../../utils/props';
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
  contentCell: {
    width: '25%',
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

interface UserTableProps {
  handleEdit: (id: string) => void;
  handleExclude: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ handleEdit, handleExclude }) => {
  const [finishedData, setFinishedData] = useState(false);

  const [users, setUsers] = useState({} as UserProps[]);
  const classes = useStyles();
  useEffect(() => {
    try {
      api.get('users').then((response) => {
        setUsers(response.data);
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
              <StyledTableCell
                align={alignTitle}
                className={classes.contentCell}
              >
                Nome
              </StyledTableCell>
              <StyledTableCell
                align={alignTitle}
                className={classes.contentCell}
              >
                Login
              </StyledTableCell>
              <StyledTableCell
                align={alignTitle}
                className={classes.contentCell}
              >
                Tipo de usuário
              </StyledTableCell>
              <StyledTableCell align={alignTitle}> </StyledTableCell>
              <StyledTableCell align={alignTitle}> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <StyledTableRow>
                  <StyledTableCell align="left" className={classes.contentCell}>
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align="left" className={classes.contentCell}>
                    {user.login}
                  </StyledTableCell>
                  <StyledTableCell align="left" className={classes.contentCell}>
                    {user.administrator ? 'Administrador' : 'Comum'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {user.login === 'admin' ? (
                      ' '
                    ) : (
                      <ButtonTooltip
                        title="Editar"
                        positionX="-10px"
                        positionY="-80px"
                      >
                        <button
                          id="edit-button"
                          type="button"
                          onClick={() => handleEdit(user.id)}
                          className={classes.button}
                        >
                          <FaRegEdit size={20} />
                        </button>
                      </ButtonTooltip>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {user.login === 'admin' ? (
                      ' '
                    ) : (
                      <ButtonTooltip
                        title="Excluir"
                        positionX="-50px"
                        positionY="-50px"
                      >
                        <button
                          id="exclude-button"
                          type="button"
                          onClick={() => handleExclude(user.id)}
                          className={classes.buttonDlt}
                        >
                          <FaTrashAlt size={20} />
                        </button>
                      </ButtonTooltip>
                    )}
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
export default UserTable;
