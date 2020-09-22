import React, { useState, useCallback, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, MenuItem, Menu,
  Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import {
  Menu as MenuIcon, AccountCircle, AssignmentTurnedIn as AssignmentTurnedInIcon,
  PeopleAlt as PeopleAltIcon,
} from '@material-ui/icons';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import logoWhite from '../../assets/logo_white.png';
import useStyles from './styles';
import Button from '../Button';
import { logout } from '../../store/actions/auth';

const MENU_OPTIONS = [
  {
    label: 'Tarefas',
    path: '/tarefas',
    disabled: false,
    Icon: AssignmentTurnedInIcon,
  },
  {
    label: 'Usuários',
    path: '/usuarios',
    disabled: false,
    Icon: PeopleAltIcon,
  },
];

const Template = ({ children }) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [menuOptions, setMenuOptions] = useState(MENU_OPTIONS);
  const userName = useSelector(({ user }) => user.name);
  const userId = useSelector(({ user }) => user.id);
  const dispatch = useDispatch();

  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleProfileMenuOpen = useCallback((event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  }, []);

  const handleProfileMenuClose = useCallback(() => {
    setProfileMenuAnchorEl(null);
  }, []);

  const handleMenuOpen = useCallback((event) => {
    setMenuAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMenuAnchorEl(null);
  }, []);

  const handleToggleLogoutModal = useCallback(() => {
    setIsOpenLogoutModal(!isOpenLogoutModal);
  }, [isOpenLogoutModal]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const profileMenuId = 'profile-menu';
  const renderProfileMenu = (
    <Menu
      anchorEl={profileMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <Link
        to={`/usuarios/ver/${userId}`}
        className={classes.menuLink}
      >
        <MenuItem>Minha conta</MenuItem>
      </Link>
      <MenuItem onClick={handleToggleLogoutModal}>Sair</MenuItem>
    </Menu>
  );

  const menuId = 'appbar-menu';
  const renderMenu = (
    <Menu
      anchorEl={menuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
            menuOptions.map((option, index) => (
              <Link
                to={option.path}
                className={classes.menuLink}
                key={index.toString()}
              >
                <MenuItem
                  disabled={option.disabled}
                  data-path={option.path}
                >
                  <option.Icon className={classes.menuIcon} />
                  {option.label}
                </MenuItem>
              </Link>
            ))
        }
    </Menu>
  );

  useEffect(() => {
    setMenuOptions(MENU_OPTIONS.map((option) => ({
      ...option,
      disabled: pathname === option.path,
    })));
  }, [pathname]);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            aria-controls={menuId}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {`Olá, ${userName}!`}
          </Typography>
          <div className={classes.grow} />
          <img src={logoWhite} alt="Anestech Logo" className={classes.logo} />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="Profile Options"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
      {renderMenu}
      <div className={classes.root}>
        {children}
      </div>
      <Dialog
        open={isOpenLogoutModal}
        onClose={handleToggleLogoutModal}
      >
        <DialogTitle id="alert-dialog-title">Atenção!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja mesmo sair do sistema?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Template.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Template;
