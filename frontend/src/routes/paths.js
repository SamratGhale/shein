//used in this file to merge merge_path and submerge_path
function merge_path(base, submerge_path){
  return `${base}${submerge_path}`
}

export const ROOTS={
  app      :'/',
  auth     :'/auth',
  error    :'/error',
  account  :'/account'
};

export const PATH_HOME={
  app: ROOTS.app
};

export const PATH_PAGE = {
  auth: {
    login           : merge_path(ROOTS.auth, '/login'),
    signup          : merge_path(ROOTS.auth, '/signup'),
    resetPassword   : merge_path(ROOTS.auth, '/reset-password'),
  },
  comingSoon: '/coming-soon'
};

export const PATH_APP = {
  root: ROOTS.app,
  app:
  {
    item_detail     : merge_path(ROOTS.app, '/items/:id'),
    items           : merge_path(ROOTS.app, '/items'),
    cart            : merge_path(ROOTS.app, '/cart'),
  },
};