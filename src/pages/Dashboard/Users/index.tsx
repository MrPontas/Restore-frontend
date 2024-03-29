import React, { useCallback, useState } from 'react';
import { ImPlus } from 'react-icons/im';
import { useHistory } from 'react-router-dom';

import UsersTable from '../../../components/UsersTable';
import CreateUser, { UserCreated } from '../../../components/CreateUser';
import EditUser from '../../../components/EditUser';

import { ButtonDiv, StyledButton } from './styles';
import api from '../../../services/api';
import { UserProps } from '../../../utils/props';
import Alert from '../../../components/GenericAlert';
import Container from '../../../components/PageContainer';
import Title from '../../../components/Title';

import { useToast } from '../../../hooks/ToastContext';

const Users: React.FC = () => {
  const [addUserAlert, setAddUserAlert] = useState(false);
  const [idEdit, setIdEdit] = useState<string | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [excludeUser, setExcludeUser] = useState(false);
  const [excludeUserId, setExcludeUserId] = useState('');
  const { addToast } = useToast();

  const history = useHistory();

  const handleAddUser = useCallback(() => {
    setAddUserAlert(true);
  }, []);

  const handleConfirm = useCallback(
    async (user: UserCreated) => {
      setAddUserAlert(false);
      try {
        await api.post('users', {
          name: user.name,
          login: user.login,
          password: user.password,
          administrator: user.administrator,
          email: user.email,
        });
        history.go(0);
      } catch (error) {
        throw new Error('Somethin went wrong');
      }
    },
    [history]
  );

  const handleEditUser = useCallback(
    async (user: UserProps) => {
      setAddUserAlert(false);
      try {
        await api.put(`users/${user.id}`, {
          name: user.name,
          login: user.login,
          password: user.password,
          administrator: user.administrator,
          email: user.email,
        });
        history.go(0);
      } catch (error) {
        throw new Error(error);
      }
    },
    [history]
  );

  const handleEdit = useCallback((id: string) => {
    setIdEdit(id);
    setEditMode(true);
  }, []);

  const handleCancel = useCallback(() => {
    setAddUserAlert(false);
    setEditMode(false);
  }, []);

  const handleExcludeAlert = useCallback((id: string) => {
    setExcludeUserId(id);
    setExcludeUser(true);
  }, []);

  const handleExclude = useCallback(() => {
    api.delete(`users/${excludeUserId}`).then((response) => {
      if (response.status === 200)
        addToast({
          type: 'success',
          title: 'sucesso',
          description: 'Usuário excluído com sucesso.',
        });
      history.go(0);
    });
  }, [addToast, excludeUserId, history]);
  const handleExcludeCancel = useCallback(() => {
    setExcludeUser(false);
  }, []);

  return (
    <Container>
      <Title>
        <h1>Usuários</h1>
      </Title>
      <ButtonDiv>
        <StyledButton type="button" onClick={handleAddUser}>
          <ImPlus size={15} /> Cadastrar usuário
        </StyledButton>
      </ButtonDiv>
      <UsersTable
        handleEdit={(id) => handleEdit(id)}
        handleExclude={(id) => handleExcludeAlert(id)}
      />
      {addUserAlert && (
        <CreateUser
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          openAlert
          open
        />
      )}
      {editMode && idEdit && (
        <EditUser
          handleConfirm={(user) => handleEditUser(user)}
          handleCancel={handleCancel}
          openAlert
          userEdit={idEdit}
          open
        />
      )}
      {excludeUser && (
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

export default Users;
