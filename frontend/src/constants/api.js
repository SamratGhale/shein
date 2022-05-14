const server_url = process.env.REACT_APP_API_SERVER
const base_url   = server_url + '/api/v1' 

module.exports = {
    AUTH   : base_url + '/user',
    CLOTHES: base_url + '/clothes', 
    CLOTHES_IMAGE: server_url+ '/modules/clothes/images/'
}