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
import { RegisterProps } from '../../utils/props';
import getHoursBr from '../../utils/getDateBr';

import Loading from '../Loading';

import { Message } from './styles';

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
    width: '35px',
    height: '35px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    marginRight: '3px',
  },
  styledRow: {
    width: '100%',
    border: 'transparent',
    background: 'transparent',
  },
  load: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& .MuiCircularProgress-root': {
      borderColor: '#000',
    },
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

interface RegisterTableProps {
  registers: RegisterProps[] | undefined;
  finishedData: boolean;
}

const CustomizedTables: React.FC<RegisterTableProps> = ({
  registers,
  finishedData,
}) => {
  const classes = useStyles();

  if (finishedData && registers) {
    return (
      <>
        {registers.length === 0 ? (
          <Message>Parece que não há registros :(</Message>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="customized table" stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell align={alignTitle}>
                    Tipo de registro
                  </StyledTableCell>
                  <StyledTableCell align={alignTitle}>
                    Data de criação
                  </StyledTableCell>
                  <StyledTableCell align={alignTitle}>
                    Número de produtos
                  </StyledTableCell>
                  <StyledTableCell align={alignTitle}>Usuário</StyledTableCell>
                  <StyledTableCell align={alignTitle}> </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registers.map((register) => (
                  <StyledTableRow key={register.id}>
                    <StyledTableCell align="left">
                      {register.type === 'I' ? 'Entrada' : 'Saída'}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getHoursBr(register.created_at)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {register.products.length}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {register.user.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <NavLink to={`/dashboard/registerView/${register.id}`}>
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
        )}
      </>
    );
  }
  return <Loading />;
};
export default CustomizedTables;
