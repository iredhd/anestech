import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuIcon: {
    marginRight: theme.spacing(1),
  },
  logo: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  root: {
    padding: theme.spacing(2),
  },
  menuLink: {
    textDecoration: 'none',
    color: 'black',
  },
}));

export default useStyles;
