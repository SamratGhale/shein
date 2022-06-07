const server_url = process.env.REACT_APP_API_SERVER
const base_url = server_url + '/api/v1'

module.exports = {
  AUTH:     base_url + '/auth',
  USER:     base_url + '/user',
  CLOTHES : base_url + '/clothes',
  INVOICE:  base_url + '/invoice',
  ORDER:    base_url + '/Order',
  ROLES:    base_url + '/roles',
}