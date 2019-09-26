const axios = require('axios');
async function getAll(url, completeArray = [], total = 0) {
    try{
        const results = await makeSwapiAPICall('get', url);
        const {count, next, results: swapiResults} = results
        total = count ? count : 0;
        completeArray = [...completeArray, ...swapiResults];
        if(completeArray.length < total && next) {
            return getAll(next, completeArray, total);
        } else {
            return completeArray
        }
    } catch(error) {
        console.error(error);
        throw(error)
    }
}

async function makeSwapiAPICall(method='get', url) {
    try {
        if(typeof url === 'string' && url !== '') {
            const results = await axios[method](url);
            return results.data
        } 
        return;
    } catch(error) {
        console.error(error)
        throw(error)
    }
}

function sort(array, sortItem) {
    if(!sortItem) {
        return array.sort();
    } else {
        return array.sort((a, b) => a[sortItem] > b[sortItem] ? 1 : -1);
    }
}
module.exports = {getAll, makeSwapiAPICall, sort};
    