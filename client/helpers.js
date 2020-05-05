module.exports = {
    getIdFromAuth0UserSub (auth0UserSub) {
        return auth0UserSub.split('|').pop();
    }
};