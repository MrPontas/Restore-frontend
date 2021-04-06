import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from 'react';

import { createStyles, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import LabelInput from '../LabelInput';
import { CategoryProps } from '../../utils/props';
import { useToast } from '../../hooks/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';
import { Textarea } from './styles';

export type CategoryCreated = Partial<CategoryProps>;

const useStyles = makeStyles(() =>
  createStyles({
    colorPrimary: {
      color: '#82af99',
    },
    colorSecondary: {
      color: '#9c9b9b',
    },
    form: {
      // display: 'flex',
      margin: '30px 50px',
      flexDirection: 'row',
      placeContent: 'center',
    },
  })
);

interface AlertProps extends DialogProps {
  openAlert?: boolean;
  handleConfirm: (category: CategoryCreated) => void;
  handleCancel: () => void;
}
const Alert: React.FC<AlertProps> = ({
  handleConfirm,
  handleCancel,
  openAlert,
  ...rest
}) => {
  const formRef = useRef<FormHandles>(null);
  const [isDescriptionFocused, setIsDesciptionFocused] = useState(false);
  const [description, setDescription] = useState('');

  const classes = useStyles();
  const { addToast } = useToast();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openAlert) setOpen(true);
  }, [openAlert]);

  const handleSubmit = useCallback(
    async (data: CategoryProps) => {
      formRef.current?.setErrors({});
      try {
        let schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setOpen(false);
        const categoryData: CategoryCreated = {
          name: data.name,
          description,
        };
        handleConfirm(categoryData);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Ops!',
          type: 'error',
          description: 'Algo deu errado. Verifique as informações',
        });
      }
    },
    [addToast, handleConfirm, description]
  );

  const handleChangeDescription = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    []
  );

  const handleCancelButton = useCallback(() => {
    setOpen(false);
    handleCancel();
  }, [handleCancel]);

  return (
    <Dialog
      {...rest}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        Cadastrar nova categoria
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            id="category-form"
            className={classes.form}
          >
            <div>
              <LabelInput label="Nome" name="name" />
              <Textarea
                isFocused={isDescriptionFocused}
                onFocus={() => setIsDesciptionFocused(true)}
                onBlur={() => setIsDesciptionFocused(false)}
              >
                <p>Descrição</p>
                <div>
                  <textarea
                    name="description"
                    onChange={(e) => handleChangeDescription(e)}
                  />
                </div>
              </Textarea>
            </div>
          </Form>
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={handleCancelButton}
            className={classes.colorSecondary}
            color="secondary"
            autoFocus
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="category-form"
            className={classes.colorPrimary}
            color="primary"
          >
            Confirmar
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Alert;
