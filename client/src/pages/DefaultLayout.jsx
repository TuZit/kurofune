import React from 'react';
import RoleControl from '../components/RoleControl.js';

import Router from '../components/Router.jsx';

function DefaultLayout() {
  return (
    <div>
      <RoleControl />
      <Router />
    </div>
  );
}

export default DefaultLayout;
