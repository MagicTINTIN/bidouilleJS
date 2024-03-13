BASE_RECIPE_BOOK = {
    water:[],
    fire:[],
    wind:[],
    earth:[]
};

recipeBook = {
    water:[],
    fire:[],
    wind:[],
    earth:[]
};

tested = [];

newWords = [];

function isTested(item1, item2) {
    return (tested.includes({item1, item2}) || tested.includes({item2, item1}))
}

function addTested(item1, item2) {
    tested.push({item1, item2});
}

function addReceipe(res, item1, item2) {
    if (!recipeBook[res])
        recipeBook[res] = [{item1, item2}];
    else {
        if (!recipeBook[res].includes({item1, item2}) && !recipeBook[res].includes({item2, item1}))
            recipeBook[res].push({item1, item2});
    }
}

function searchWords(numberOfAllCombinaisonsPerWord) {
    wordsToTest = [];
    for (const key in recipeBook) {
        wordsToTest.push(key);
    }
    for (const iterator of object) {
        
    }
}