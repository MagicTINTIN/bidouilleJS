function insertingDoges(nb) {
    for (let index = 0; index <nb; index++) {
        const lastEl = document.querySelector(".neck:last-child")
        injectNeck({ target: lastEl });
    }
}

function rainbowingWows() {
    rainbowwows = 0;
    var allwows = document.querySelectorAll(".textwow");
    for (var i = 0; i < allwows.length; i++) {
        rainbowwows++;
        allwows[i].classList.add("rainbow");
    }

    rainbowsEl.innerText = rainbowwows

    let count = 0
    // Check if they have achieved dogePrime
    let isPrime = primeWows.every((wowEl) => {
      count++
      return wowEl.classList.contains("rainbow")
    })
    
    // Activate doge prime
    if (dogePrime === false && isPrime === true) {
      dogePrime = true
      dogePrimeEl.innerText = "ACTIVE"
      setupSecretWows()
    } else if (count !== primeWows.length) {
      dogePrimeEl.innerText = "INACTIVE (" + count + '/' + primeWows.length + ")"
    }
}

function findingSecretWows() {
    secretwows = 0;
    var allsecretswows = document.querySelectorAll(".secretwow");
    for (var i = 0; i < allsecretswows.length; i++) {
        secretwows++;
        allsecretswows[i].classList.add("found");
    }
    secretWowEl.innerText = secretwows
    
    if (secretwows === 100) {
          fibonacciChallengeStarted = true
          fibowowcontainer.classList.remove("hidden")
        }
      }
    
function fibonaccingWows() {
    let right = true
    for (let i = 0; i < fibonacciWows.length; i++) {
        fibonacciWows[i].classList.add(right ? "spinRight" : "spinLeft");
        right = !right
    }
    right = false;
    for (let i = 0; i < fibonacciSecretWows.length; i++) {
        fibonacciSecretWows[i].classList.add(right ? "spinRight" : "spinLeft")
        right = !right
    }
    checkAllFiboWows();
}

function unlockingAll() {
    let startTime = Date.now();
    while (largewows < largeWowsRequired) {
        insertingDoges(100);
    }
    rainbowingWows();
    findingSecretWows();
    fibonaccingWows();
    console.log(`Unlocked all archivement in ${(Date.now() - startTime) / 1000}s`)
}
unlockingAll();