import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import LoginConfig from 'app/main/login/LoginConfig';
import DashboardConfig from 'app/main/dashboard/DashboardConfig';
import LupaPasswordConfig from 'app/main/lupaPassword/LupaPasswordConfig';

const routeConfigs = [LoginConfig, LupaPasswordConfig, DashboardConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/home" />
  }
];

export default routes;
