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
import api from '../../services/api';
import Loading from '../Loading';

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
  idEdit: string;
}
const Alert: React.FC<AlertProps> = ({
  handleConfirm,
  handleCancel,
  openAlert,
  idEdit,
  ...rest
}) => {
  const formRef = useRef<FormHandles>(null);
  const [isDescriptionFocused, setIsDesciptionFocused] = useState(false);
  const [category, setCategory] = useState<CategoryProps | undefined>(
    undefined
  );
  const [description, setDescription] = useState('');

  const classes = useStyles();
  const { addToast } = useToast();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openAlert) setOpen(true);
    api.get(`categories/${idEdit}`).then((response) => {
      setDescription(response.data.description);
      setCategory(response.data);
    });
  }, [openAlert, idEdit]);

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
        const categoryEdited: CategoryProps = {
          id: idEdit,
          name: data.name,
          description,
          category_number: 0, // o código é gerado automaticamente no backend,
          // só esta definido como 0 pra não ter erro de tipagem
        };
        setOpen(false);

        handleConfirm(categoryEdited);
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
    [addToast, handleConfirm, idEdit, description]
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
      <DialogTitle id="alert-dialog-title">Editar categoria</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {!category ? (
            <Loading />
          ) : (
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              id="category-form"
              className={classes.form}
            >
              <div>
                <LabelInput
                  label="Nome"
                  name="name"
                  defaultValue={category.name}
                />
                <Textarea
                  isFocused={isDescriptionFocused}
                  onFocus={() => setIsDesciptionFocused(true)}
                  onBlur={() => setIsDesciptionFocused(false)}
                  defaultValue={category.description}
                >
                  <p>Descrição</p>
                  <div>
                    <textarea
                      name="description"
                      onChange={(e) => handleChangeDescription(e)}
                      defaultValue={description}
                    />
                  </div>
                </Textarea>
              </div>
            </Form>
          )}
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
