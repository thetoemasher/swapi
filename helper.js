const axios = require('axios');
async function makeSwapiAPICall(url, completeArray = [], total = 0) {
    try{
        const results = await axios.get(url);
        const {count, next, results: swapiResults} = results.data
        total = count ? count : 0;
        completeArray = [...completeArray, ...swapiResults];
        if(completeArray.length < total && next) {
            return makeSwapiAPICall(next, completeArray, total);
        } else {
            return completeArray
        }
    } catch(error) {
        console.error(error);
    }
}

function sort(array, sortItem) {
    if(!sortItem) {
        return array.sort();
    } else {
        return array.sort((a, b) => a[sortItem] > b[sortItem] ? 1 : -1)
    }
}
module.exports = {makeSwapiAPICall, sort};
    