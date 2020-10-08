import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

const App = () => (
  <div>
    <AmplifySignOut />
    My App
  </div>
);

export default withAuthenticator(App);