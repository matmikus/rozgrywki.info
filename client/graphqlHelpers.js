module.exports = {
    hasResults (apolloResultArray) {
        return apolloResultArray.length > 0;
    },
    
    getResultObject (apolloResultArray, propName) {
        if (apolloResultArray.length === 0) {
            return {};
        }
        
        if (propName === undefined) {
            return apolloResultArray[0];
        }
        
        if (apolloResultArray[0][propName] === undefined) {
            return {};
        }
        
        return apolloResultArray[0][propName];
    }
};