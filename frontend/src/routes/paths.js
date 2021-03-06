//used in this file to merge merge_path and submerge_path
function merge_path(base, submerge_path) {
  return `${base}${submerge_path}`
}

export const ROOTS = {
  app: '',
  auth: '/auth',
  error: '/error',
  account: '/account'
};

export const PATH_HOME = {
  app: ROOTS.app
};

export const PATH_PAGE = {
  auth: {
    login: merge_path(ROOTS.auth, '/login'),
    signup: merge_path(ROOTS.auth, '/signup'),
    verify: merge_path(ROOTS.auth, '/verify/:token'),
    resetPassword: merge_path(ROOTS.auth, '/reset-password'),
  },
  comingSoon: '/coming-soon'
};

export const PATH_APP = {
  root: ROOTS.app,
  app:
  {
    item_detail: merge_path(ROOTS.app, '/items/:id'),
    cart: merge_path(ROOTS.app, '/cart'),
    checkout: merge_path(ROOTS.app, '/checkout'),
    items: merge_path(ROOTS.app, '/items'),
    account: merge_path(ROOTS.app, '/account'),
    contactus: merge_path(ROOTS.app, '/contactus'),
    orders: merge_path(ROOTS.app, '/orders'),
    orderDetails: merge_path(ROOTS.app, '/orders/:id')
  },
};