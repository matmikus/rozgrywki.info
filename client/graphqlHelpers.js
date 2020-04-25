module.exports = {
    isResultEmpty (apolloResultArray) {
        return !(apolloResultArray.length > 0);
    },
    
    getResultObject (apolloResultArray) {
        if (apolloResultArray.length > 0) {
            return apolloResultArray[0];
        } else {
            return {};
        }
    }
};