import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import { translate, crudDelete, startUndoable, usePermissions } from 'ra-core';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { SimpleForm, Button, DeleteButton, TextInput, LongTextInput, required } from 'react-admin';

const styles = (theme) => ({
  deleteButton: {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.error.main, 0.12),
      // Reset on mouse devices
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }
});
class DeleteButtonWithConfirmation extends Component {
  state = {
    showDialog: false
  };

  handleClick = () => {
    this.setState({ showDialog: true });
  };

  handleCloseClick = () => {
    this.setState({ showDialog: false });
  };
  
  handleDelete = (event) => {
    event.preventDefault();
    this.setState({ showDialog: false });
    const { dispatchCrudDelete, startUndoable, resource, record, basePath, redirect } = this.props;
    const undoable = false;
    console.log(record)
    console.log(this.props);
    if (undoable) {
      startUndoable(crudDelete(resource, record.id, record, basePath, redirect));
    } else {
      dispatchCrudDelete(resource, record.id, record, basePath, redirect);
    }
  };

  render() {
    const { showDialog } = this.state;
    const { label = 'ra.action.delete', classes = {}, className } = this.props;
    return (
      <Fragment>
        <Button onClick={this.handleClick} label={label} className={classnames('ra-delete-button', classes.deleteButton, className)} key="button">
          <ActionDelete />
        </Button>
        <Dialog fullWidth open={showDialog} onClose={this.handleCloseClick} aria-label="Are you sure?">
          <DialogTitle>er du sikker på du vil slette den her data?</DialogTitle>
          <DialogContent>
            <div>
              denne handling vil være permanent
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDelete} label={label} className={classnames('ra-delete-button', classes.deleteButton, className)} key="button">
              <ActionDelete />
            </Button>
            <Button label="ra.action.cancel" onClick={this.handleCloseClick}>
              <IconCancel />
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteButtonWithConfirmation.propTypes = {
  basePath: PropTypes.string,
  classes: PropTypes.object,
  className: PropTypes.string,
  dispatchCrudDelete: PropTypes.func.isRequired,
  label: PropTypes.string,
  record: PropTypes.object,
  redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func]),
  resource: PropTypes.string.isRequired,
  startUndoable: PropTypes.func,
  translate: PropTypes.func,
  undoable: PropTypes.bool
};

DeleteButtonWithConfirmation.defaultProps = {
  redirect: 'list',
  undoable: true
};

export default compose(
  connect(
    null,
    { startUndoable, dispatchCrudDelete: crudDelete }
  ),
)(DeleteButtonWithConfirmation);