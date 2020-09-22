import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  submitContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
