import React, { Fragment, useCallback, useEffect, useState } from 'react';
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
  button: {
    MaxHeight: '100%',
    MaxWidth: '100%',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '2px',
    paddingLeft: '6px',
    paddingBottom: '0px',
    marginRight: '3px',
  },
  buttonDlt: {
    MaxHeight: '100%',
    MaxWidth: '100%',
    color: '#fff',
    backgroundColor: '#c74444',
    borderRadius: '5px',
    padding: '2px 4px 0 3px',
  },
  buttonCell: {
    marginRight: '30px',
    maxWidth: '10px',
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
              <StyledTableCell align={alignTitle}>Nome </StyledTableCell>
              <StyledTableCell align={alignTitle}>Login </StyledTableCell>
              <StyledTableCell align={alignTitle}>
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
                  <StyledTableCell align="left">{user.name}</StyledTableCell>
                  <StyledTableCell align="left">{user.login}</StyledTableCell>
                  <StyledTableCell align="left">
                    {user.administrator ? 'Administrador' : 'Comum'}
                  </StyledTableCell>
                  <StyledTableCell className={classes.buttonCell}>
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
                  <StyledTableCell>
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
