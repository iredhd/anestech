import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: theme.spacing(1),
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  addContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default useStyles;
