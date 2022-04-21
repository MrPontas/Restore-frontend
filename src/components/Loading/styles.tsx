import styled from 'styled-components';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  height: auto;
  position: fixed;
  top: 70px;
  left: 182px;
  right: 0;
  bottom: 0;
  flex-direction: column;
  overflow-y: scroll;
  /* background-color: #fff; */
`;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    load: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      '& .MuiCircularProgress-root': {
        borderColor: '#000',
      },
    },
    colorPrimary: { color: '#82af99' },
  })
);
