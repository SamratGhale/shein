import React from 'react';
import PropTypes from 'prop-types';
import { Navigate} from 'react-router-dom';
import { PATH_PAGE, ROOTS } from '../routes/paths';
import { getUser } from '../utils/sessionManager';

AuthProtect.propTypes = {
  children: PropTypes.node
};

function AuthProtect({ children, authorizedUsers }) {
  if(authorizedUsers.length===0){
    return <>{children}</>;
  }
  const currentUser = getUser();
  if (!currentUser) {
    return <Navigate to={PATH_PAGE.auth.login} />;
  }
  const { role, is_approved } = currentUser;
  if (!is_approved) {
    return <Navigate to={PATH_PAGE.auth.waitForApprove} />;
  }
  const { isLoading } = { isLoading: false };
  if (isLoading) {
    return(
        <div>
            Loading..
        </div>
    )
  }
  if (authorizedUsers && authorizedUsers.includes(role)) {
    return <>{children}</>;
  } else {
    return <Navigate to={ROOTS.app} />;
  }
}

export default AuthProtect;
