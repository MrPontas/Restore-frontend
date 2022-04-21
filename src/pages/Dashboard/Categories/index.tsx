import React, { useCallback, useState } from 'react';
import { ImPlus } from 'react-icons/im';
import { useHistory } from 'react-router-dom';

import CategoriesTable from '../../../components/CategoriesTable';
import CreateCategory, {
  CategoryCreated,
} from '../../../components/CreateCategory';
import EditCategory from '../../../components/EditCategory';
import Container from '../../../components/PageContainer';
import Title from '../../../components/Title';

import { ButtonDiv, StyledButton } from './styles';
import api from '../../../services/api';
import Alert from '../../../components/GenericAlert';
import { useToast } from '../../../hooks/ToastContext';

const Categories: React.FC = () => {
  const [addUserAlert, setAddUserAlert] = useState(false);
  const [idEdit, setIdEdit] = useState<string | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [excludeCategory, setExcludeCategory] = useState(false);
  const [excludeCategoryId, setExcludeCategoryId] = useState('');
  const { addToast } = useToast();

  const history = useHistory();

  const handleAddUser = useCallback(() => {
    setAddUserAlert(true);
  }, []);

  const handleConfirm = useCallback(
    async (category: CategoryCreated) => {
      setAddUserAlert(false);
      try {
        await api.post('categories', {
          name: category.name,
          description: category.description,
        });
        addToast({
          type: 'success',
          title: 'Categoria criada com sucesso.',
        });

        setTimeout(() => {
          history.go(0);
        }, 2000);
      } catch (error) {
        addToast({
          title: 'Não foi possível criar a categoria',
          type: 'error',
          description: 'A categoria já existe.',
        });
      }
    },
    [history, addToast]
  );

  const handleEditCategory = useCallback(
    async (category: CategoryCreated) => {
      setAddUserAlert(false);
      try {
        await api.patch(`categories/${category.id}`, {
          name: category.name,
          description: category.description,
        });
        addToast({
          type: 'success',
          title: 'Categoria editada com sucesso.',
        });
        setEditMode(false);
        history.go(0);
      } catch (error) {
        throw new Error(error);
      }
    },
    [history, addToast]
  );

  const handleTableEdit = useCallback((id: string) => {
    setIdEdit(id);
    setEditMode(true);
  }, []);

  const handleCancel = useCallback(() => {
    setAddUserAlert(false);
    setEditMode(false);
  }, []);

  const handleTableExclude = useCallback((id: string) => {
    setExcludeCategoryId(id);
    setExcludeCategory(true);
  }, []);

  const handleExclude = useCallback(() => {
    api
      .delete(`categories/${excludeCategoryId}`)
      .then(() => {
        addToast({
          type: 'success',
          title: 'sucesso',
          description: 'Categoria excluída com sucesso.',
        });
        setTimeout(() => {
          history.go(0);
        }, 2000);
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Não foi possível excluir a categoria',
          description: `Há produtos desse tipo cadastrados no sistema!`,
        });
      });
    setExcludeCategory(false);
  }, [addToast, excludeCategoryId, history]);
  const handleExcludeCancel = useCallback(() => {
    setExcludeCategory(false);
  }, []);

  return (
    <Container>
      <Title>
        <h1>Categorias</h1>
      </Title>
      <ButtonDiv>
        <StyledButton type="button" onClick={handleAddUser}>
          <ImPlus size={15} /> Cadastrar categoria
        </StyledButton>
      </ButtonDiv>
      <CategoriesTable
        handleEdit={(id) => handleTableEdit(id)}
        handleExclude={(id) => handleTableExclude(id)}
      />
      {addUserAlert && (
        <CreateCategory
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          openAlert
          open
        />
      )}
      {editMode && idEdit && (
        <EditCategory
          handleConfirm={(category) => handleEditCategory(category)}
          handleCancel={handleCancel}
          idEdit={idEdit}
          openAlert
          open
        />
      )}
      {excludeCategory && (
        <Alert
          title="Tem certeza que deseja excluir?"
          open
          handleConfirm={handleExclude}
          handleCancel={handleExcludeCancel}
        />
      )}
    </Container>
  );
};

export default Categories;
