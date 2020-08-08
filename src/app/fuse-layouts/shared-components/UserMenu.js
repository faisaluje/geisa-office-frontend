import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from 'app/auth/store/userSlice';
import { openProfileDialog } from 'app/main/profile/store/formSlice';
import { openPasswordDialog } from 'app/main/profile/store/passwordSlice';

function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = event => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const onClickProfile = () => {
    dispatch(openProfileDialog());
    userMenuClose();
  };

  const onClickPassword = () => {
    dispatch(openPasswordDialog());
    userMenuClose();
  };

  return (
    <>
      <Button className="min-h-40" onClick={userMenuClick}>
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="normal-case font-bold flex">
            {user.data.nama}
          </Typography>
          <Typography className="text-11 capitalize" color="textSecondary">
            {user.data.peran === 3 ? 'Operator' : 'Admin'}
          </Typography>
        </div>

        {user.data.photoURL ? (
          <Avatar className="mx-4" alt="user photo" src={user.data.photoURL} />
        ) : (
          <Avatar className="mx-4">{user.data.nama[0]}</Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        classes={{
          paper: 'py-8'
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to="/login" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText primary="Login" />
            </MenuItem>
            <MenuItem component={Link} to="/register" role="button">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText primary="Register" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={onClickProfile} role="button">
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="Profile Saya" />
            </MenuItem>

            <MenuItem onClick={onClickPassword} role="button">
              <ListItemIcon className="min-w-40">
                <Icon>vpn_key</Icon>
              </ListItemIcon>
              <ListItemText primary="Ubah Password" />
            </MenuItem>

            <MenuItem
              onClick={() => {
                dispatch(logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
