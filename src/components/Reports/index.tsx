import React, { useCallback, useRef, useState } from 'react';
import { IoExitOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FiBox } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  SearchDiv,
  StyledInputLabel,
  CancelButton,
  ReportButton,
  ReportButtonsDiv,
} from './styles';

interface ReportProps {
  handleCloseDialog: () => void;
}

const Alert: React.FC<ReportProps> = ({ handleCloseDialog }) => {
  const [open, setOpen] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const formRef = useRef<FormHandles>(null);

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
  const handlStartDate = useCallback((date: string) => {
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
                onChange={(e) => handlStartDate(e.target.value)}
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
          <CancelButton onClick={handleCancel} autoFocus>
            Cancelar
          </CancelButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Alert;
