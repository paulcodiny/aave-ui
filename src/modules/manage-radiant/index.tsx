import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ManagerRadiantMain from './screens/ManageRadiantMain';
import { stakeConfig } from '../../ui-config';
import ErrorPage from '../../components/ErrorPage';
import { StakeDataProvider } from '../../libs/pool-data-provider/hooks/use-stake-data-context';

export default function ManageRadiant() {
  if (!stakeConfig) {
    return <ErrorPage title="Stake was not configured" />;
  }

  return (
    <StakeDataProvider stakeConfig={stakeConfig}>
      <Switch>
        <Route exact={true} path="/manage-radiant" component={ManagerRadiantMain} />

        <Redirect to="/borrow" />
      </Switch>
    </StakeDataProvider>
  );
}
