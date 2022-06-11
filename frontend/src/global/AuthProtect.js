import React from 'react';
import PropTypes from 'prop-types';
import { Navigate} from 'react-router-dom';
import { PATH_PAGE, ROOTS } from '../routes/paths';
import { getUser } from '../utils/sessionManager';

AuthProtect.propTypes = {
  children: PropTypes.node
};

function AuthProtect({ children}) {
  const currentUser = getUser();

  if (!currentUser) {
    return <Navigate to={PATH_PAGE.auth.login} />;
  }
  const { role, is_registered, is_archived} = currentUser;
  if (!is_registered || is_archived) {
    return <Navigate to={PATH_PAGE.auth.waitForApprove} />;
  }
  return <>{children}</>;
}

export default AuthProtect;
