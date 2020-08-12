import { authRoles } from 'app/auth';
import { lazy } from 'react';

const LupaPasswordConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        }
      }
    }
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: '/lupa-password',
      component: lazy(() => import('./LupaPassword'))
    }
  ]
};

export default LupaPasswordConfig;
