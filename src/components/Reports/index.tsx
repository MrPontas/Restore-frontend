import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoExitOutline } from 'react-icons/io5';
import { FiBox } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {
  SearchDiv,
  StyledInputLabel,
  useStyles,
  ReportButton,
  ReportButtonsDiv,
} from './styles';

interface ReportProps {
  handleCloseDialog: () => void;
}

const Alert: React.FC<ReportProps> = ({ handleCloseDialog }) => {
  useEffect(() => {
    const today = new Date();

    const startDateDefault = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-01`;
    const b = '0';
    let position = 5;
    let output = startDateDefault;
    if (today.getMonth() + 1 < 10)
      output = [
        startDateDefault.slice(0, position),
        b,
        startDateDefault.slice(position),
      ].join('');
    setStartDate(output);
  }, []);

  useEffect(() => {
    const today = new Date();

    const endDateDefault = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const b = '0';
    let positionMonth = 5;
    let positionDay = 8;
    let output = endDateDefault;
    if (today.getMonth() + 1 < 10)
      output = [
        endDateDefault.slice(0, positionMonth),
        b,
        endDateDefault.slice(positionMonth),
      ].join('');
    if (today.getDate() < 10)
      output = [
        endDateDefault.slice(0, positionDay),
        b,
        endDateDefault.slice(positionDay),
      ].join('');
    setEndDate(output);
  }, []);

  const [open, setOpen] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const formRef = useRef<FormHandles>(null);

  const classes = useStyles();

  const handleCancel = useCallback(() => {
    setOpen(false);
    handleCloseDialog();
  }, [handleCloseDialog]);

  const handleGenerateReport = useCallback(
    (type: string) => {
      window.open(`/report/?type=${type}&start=${startDate}&end=${endDate}`);
    },
    [startDate, endDate]
  );
  const handleStartDate = useCallback((date: string) => {
    setStartDate(date);
  }, []);
  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Gerar relatório</DialogTitle>
        <DialogContent>
          <SearchDiv>
            <Form onSubmit={{} as () => void} ref={formRef}>
              <StyledInputLabel
                label="De"
                type="date"
                name="start"
                value={startDate}
                onChange={(e) => handleStartDate(e.target.value)}
              />
              <StyledInputLabel
                label="Até"
                name="end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form>
          </SearchDiv>
          <ReportButtonsDiv>
            <ReportButton
              type="button"
              onClick={() => handleGenerateReport('I')}
            >
              <FiBox size={20} />
              Relatório de estoque
            </ReportButton>

            <ReportButton
              type="button"
              id="output_report"
              onClick={() => handleGenerateReport('O')}
            >
              <IoExitOutline size={20} />
              Relatório de saída
            </ReportButton>
          </ReportButtonsDiv>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancel}
            autoFocus
            className={classes.colorSecondary}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Alert;
