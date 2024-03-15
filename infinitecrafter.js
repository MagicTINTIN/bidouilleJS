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
window.newWordsPerRound = 0;

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
        tested.push([item1, item2]);
}

function isTestedAndAddIt(item1, item2) {
    let isTestedRes = isArrayInArray(tested, item1, item2);
    if (!isTestedRes)
        tested.push([item1, item2]);
    return isTestedRes;
}

function addReceipe(res, item1, item2) {
    if (!recipeBook[res])
        recipeBook[res] = [[item1, item2]];
    else {
        window.newWordsPerRound+=1;
        console.log(`Putain de merde ${window.newWordsPerRound}`);

        if (!isArrayInArray(recipeBook[res], item1, item2));
        recipeBook[res].push([item1, item2]);
    }
}

function increment() {
    window.newWordsPerRound++;
    console.log(`Nique ${window.newWordsPerRound}`);
}


async function fetchPageAndReturnJSON(url, timeout = 100) {

    try {
        const response = await fetch(url);
        const data = await response.json();
        //setTimeout(() => {
        return data;
        //}, timeout);
    } catch (error) {
        console.error('Error fetching the page:', error);
        return null;
    }
}

function searchWords(numberOfAllCombinaisonsPerWord) {
    let totalWords = 0;
    for (let index = 0; index < numberOfAllCombinaisonsPerWord; index++) {
        let wordsToTest = [];
        window.newWordsPerRound = 0;
        for (const key in recipeBook) {
            wordsToTest.push(key);
        }
        for (const item1 of wordsToTest) {
            for (const item2 of wordsToTest) {
                if (!isTestedAndAddIt(item1, item2)) {
                    setTimeout(() => {
                        fetchPageAndReturnJSON(`https://neal.fun/api/infinite-craft/pair?first=${item1}&second=${item2}`)
                            .then(jsonData => {
                                //console.log('JSON data:', jsonData);
                                if (jsonData.result != "Nothing" && jsonData.emoji != "") {
                                    addReceipe(jsonData.result, item1, item2);
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    }, 100);
                }
            }
        }
        console.log(`Added ${window.newWordsPerRound} words in round ${index}`);
        totalWords += window.newWordsPerRound;
    }
    console.log(`Added ${totalWords} words$`);
}

function exportToCPP() {
    let text = "";
    let i = 0;
    for (const key in recipeBook) {
        const item = recipeBook[key];

        text += `{"${key}", {{`;
        let c = 1;
        for (const craft of item) {
            text += `{"${craft[0]}", "${craft[1]}"}`;
            if (c < item.size)
                text += ",\n"
            c++;
        }
        text += `},__INT_MAX__}}`;
        if (c < recipeBook.size)
            text += ",\n";
    }
    console.log(text);
    return text;
}