import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import { PATH_DASHBOARD } from '../routes/paths';
import { getUser } from '../utils/sessionManager';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const user = getUser();

  if (user) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
