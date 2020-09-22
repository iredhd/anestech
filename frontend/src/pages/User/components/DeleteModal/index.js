import React, { useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Modal } from '../../../../components';
import { Notify, User } from '../../../../services';

const DeleteModal = ({ open, onClose }) => {
  const { id } = useParams();
  const history = useHistory();

  const handleDelete = useCallback(async () => {
    const { success, body } = await User.delete(id);

    if (success) {
      history.push('/usuarios');
    } else {
      Notify.error(body);
    }
  }, [id]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      body="Você tem certeza que deseja excluir este usuário e todas as suas tarefas?"
      title="Atenção!"
      onConfirm={handleDelete}
      confirmLabel="Sim"
    />
  );
};

DeleteModal.defaultProps = {
  open: false,
};

DeleteModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default DeleteModal;
