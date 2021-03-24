import { createStyles, makeStyles, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';
import { shade } from 'polished';
import Button from '../Button';

export const StyledConfirm = styled(Button)`
  color: #fff;
  max-width: 150px;
`;
export const StyledCancel = styled(Button)`
  color: #fff;
  background-color: #b6b6b6;
  max-width: 150px;
  margin-right: 10px;
  &:hover {
    background: ${shade(0.2, '#b6b6b6')};
  }
`;

export const useStyles = makeStyles(() =>
  createStyles({
    form: {
      height: '300px',
      display: 'flex',
      flexDirection: 'row',
      placeContent: 'center',
    },
    rightDiv: {
      width: '300px',
      margin: '0 40px',
    },
    leftDiv: {
      width: '300px',
      margin: '0 40px',
    },
    admDiv: {
      display: 'flex',
      marginTop: '37px',
      marginBottom: '18px',
      alignItems: 'center',
    },
    dialog: {
      margin: '0px 20px',
    },
  })
);
export const GreenSwitch = withStyles({
  root: {},
  switchBase: {
    '&$checked': {
      color: '#82af99',
    },
    '&$checked + $track': {
      backgroundColor: '#82af99',
    },
  },
  checked: {},
  track: {},
})(Switch);
