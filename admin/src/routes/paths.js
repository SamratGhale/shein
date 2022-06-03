function merge_path(base, submerge_path) {
  return `${base}${submerge_path}`
}

export const ROOTS = {
  auth: '/auth',
  root: '',
  app: 'app',
  admin: '/admin',
  error: '/error'
};

export const PATH_HOME = {
  app: ROOTS.app
};

export const PATH_PAGE = {
  auth: {
    login: merge_path(ROOTS.root, '/login'),
    signup: merge_path(ROOTS.auth, '/signup'),
    waitForApprove: merge_path(ROOTS.auth, '/waitforapprove'),
    resetPassword: merge_path(ROOTS.auth, '/reset-password'),
  },
  comingSoon: '/coming-soon'
};

export const PATH_APP = {
  root: ROOTS.root,
  app: ROOTS.app,
  inventory: merge_path(ROOTS.admin, '/items/'),
  item_add: merge_path(ROOTS.admin, '/items/add'),
  item_detail: merge_path(ROOTS.admin, '/items/'),
  dashboard: merge_path(ROOTS.admin, '/dashboard'),
  add: merge_path(ROOTS.admin, '/items/add'),
  users: merge_path(ROOTS.app, '/users'),
  users_details: merge_path(ROOTS.app, '/users/:id'),
};