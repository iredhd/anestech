import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import Button from '../Button';

const Modal = ({
  open, onClose, title, body, confirmLabel, cancelLabel, onConfirm, onCancel,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {body}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {onCancel && (
      <Button onClick={onCancel} color="primary">
        {cancelLabel}
      </Button>
      )}
      {onConfirm && (
      <Button onClick={onConfirm} color="primary" autoFocus>
        {confirmLabel}
      </Button>
      )}
    </DialogActions>
  </Dialog>
);

Modal.defaultProps = {
  open: false,
  confirmLabel: '',
  cancelLabel: '',
  onConfirm: false,
  onCancel: false,
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onCancel: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

export default Modal;
