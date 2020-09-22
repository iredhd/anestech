import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  submitContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  addIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
