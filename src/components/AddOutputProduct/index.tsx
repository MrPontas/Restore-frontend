import React, { useCallback, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router-dom';
import Table from '../OutputTable';

import { ConfirmButton, CancelButton, ErrorSpan } from './styles';
import { ProductProps } from '../../utils/props';

interface AddOutputProductProps {
  handleSubmitProduct: (data: ProductProps[]) => void;
}

const Alert: React.FC<AddOutputProductProps> = ({ handleSubmitProduct }) => {
  const [open, setOpen] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [productsOutput, setproductsOutput] = useState<ProductProps[]>([]);
  const [isErrored, setIsErrored] = useState(false);

  const handleConfirm = useCallback(() => {
    if (productsOutput.length === 0) {
      setIsErrored(true);
      setTimeout(() => {
        setIsErrored(false);
      }, 2500);
      return;
    }
    handleSubmitProduct(productsOutput);
    setOpen(false);
  }, [productsOutput, handleSubmitProduct]);

  const handleCancel = useCallback(() => {
    setOpen(false);
    setRedirect(true);
  }, []);

  const handleProductsFromTable = useCallback((products: ProductProps[]) => {
    setproductsOutput(products);
  }, []);

  if (redirect) return <Redirect to="registers" push />;
  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xl"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Adicionar produtos no registro de saída
        </DialogTitle>
        <DialogContent>
          <Table handleOutputProducts={handleProductsFromTable} />
        </DialogContent>
        <DialogActions>
          {isErrored && (
            <ErrorSpan>
              <FiAlertTriangle /> O registro não pode ser vazio!
            </ErrorSpan>
          )}
          <CancelButton onClick={handleCancel} autoFocus>
            Cancelar
          </CancelButton>
          <ConfirmButton onClick={handleConfirm}>Confirmar</ConfirmButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Alert;
