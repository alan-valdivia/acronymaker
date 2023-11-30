const cicd = require('./CICD.json')

// Function to sort the keys of an object
function sortObjectKeys(obj) {
    return Object.keys(obj).sort().reduce((sortedObj, key) => {
        sortedObj[key] = obj[key];
        return sortedObj;
    }, {});
}

// Sort the keys at each level of the cicd object
for (let mainKey in cicd) {
    cicd[mainKey] = sortObjectKeys(cicd[mainKey]);
    for (let subKey in cicd[mainKey]) {
        cicd[mainKey][subKey] = sortObjectKeys(cicd[mainKey][subKey]);
    }
}

function getAllCombinations(data) {
    const keys = Object.keys(data).sort();
    let combinations = [{combo: '', path: []}];

    keys.forEach(mainKey => {
        let newCombinations = [];
        Object.keys(data[mainKey]).sort().forEach(subKey => {
            Object.keys(data[mainKey][subKey]).sort().forEach(element => {
                combinations.forEach(({combo, path}) => {
                    newCombinations.push({
                        combo: combo + element,
                        path: [...path, subKey] // only include the subKey
                    });
                });
            });
        });
        combinations = newCombinations;
    });

    return combinations;
}

const tripleConsecutivePattern = /([a-zA-Z])\1{1,}/;

let allCombinations = getAllCombinations(cicd);
let uniqueCombinations = {};

allCombinations.forEach(({combo, path}) => {
    if (!tripleConsecutivePattern.test(combo)) {
        uniqueCombinations[combo] = path.join(', '); // Join the path array into a string
    }
});

// Convert to an array, then sort and reconstruct the object
let sortedUniqueCombinations = Object.keys(uniqueCombinations)
    .sort()
    .reduce((obj, key) => {
        obj[key] = uniqueCombinations[key];
        return obj;
    }, {});

console.log(sortedUniqueCombinations);
