BASE_RECIPE_BOOK = {
    Water: [],
    Fire: [],
    Wind: [],
    Earth: []
};

recipeBook = {
    Water: [],
    Fire: [],
    Wind: [],
    Earth: []
};

tested = [];

newWords = [];

function isArrayInArray(array, item1, item2) {
    for (const craft of array) {
        if ((craft[0] == item1 && craft[1] == item2) || (craft[1] == item1 && craft[0] == item2))
            return true;
    }
    return false;
}

function isTested(item1, item2) {
    return isArrayInArray(tested, item1, item2);
}

function addTested(item1, item2) {
    if (!isTested(item1, item2))
        tested.push([ item1, item2 ]);
}

function isTestedAndAddIt(item1, item2) {
    let isTestedRes = isArrayInArray(tested, item1, item2);
    if (!isTestedRes)
        tested.push([ item1, item2 ]);
    return isTestedRes;
}

function addReceipe(res, item1, item2) {
    if (!recipeBook[res])
        recipeBook[res] = [[ item1, item2 ]];
    else {
        if (!isArrayInArray(recipeBook[res], item1, item2));
            recipeBook[res].push([ item1, item2 ]);
    }
}

async function fetchPageAndReturnJSON(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching the page:', error);
        return null;
    }
}

function searchWords(numberOfAllCombinaisonsPerWord) {
    wordsToTest = [];
    for (const key in recipeBook) {
        wordsToTest.push(key);
    }
    for (const item1 of wordsToTest) {
        for (const item2 of wordsToTest) {
            if (!isTestedAndAddIt(item1, item2)) {
                fetchPageAndReturnJSON(`https://neal.fun/api/infinite-craft/pair?first=${item1}&second=${item2}`)
                    .then(jsonData => {
                        //console.log('JSON data:', jsonData);
                        if (jsonData.result != "Nothing" && jsonData.emoji != "")
                            addReceipe(jsonData.result, item1, item2);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
    }
}