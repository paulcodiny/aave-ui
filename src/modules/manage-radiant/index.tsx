import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import BorrowMain from './screens/BorrowMain';

export default function ManageRadiant() {
  return (
    <Switch>
      <Route exact={true} path="/manage-radiant" component={BorrowMain} />

      <Redirect to="/borrow" />
    </Switch>
  );
}
