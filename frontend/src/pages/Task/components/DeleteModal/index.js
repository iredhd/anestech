import React, { useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Modal } from '../../../../components';
import { Task } from '../../../../services';

const DeleteModal = ({ open, onClose }) => {
  const { id } = useParams();
  const history = useHistory();

  const handleDelete = useCallback(async () => {
    await Task.delete(id);
    history.push('/tarefas');
  }, [id]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      body="Você tem certeza que deseja excluir esta tarefa?"
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
