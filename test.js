function add(x, y) {
    if (!y) {
        if (typeof x !== 'number') return (num) => undefined;
        return (num) => {
            if (typeof num !== 'number') return undefined;
            return x + num;
        }
    }
    if (typeof x !== 'number' || typeof y !== 'number') return undefined;
    return x + y;
}

function getResults(array) {
    let results = [];
    for (let i = 0; i < array.length; i++) {
        let elem = array[i];
        for (let j = 2; j <= elem / 2; j++) {
            let result = nthRoot(j, elem);
            if (Number.isInteger(result)) {
                results.push({ 'number': elem, 'pos': i, 'factor': result, 'exp': j });
                break;
            }
        }
    }
    return results;
}

function nthRoot(k, n) {
    let hi = 1;
    while (Math.pow(hi, k) < n) hi *= 2;
    let lo = hi / 2;
    while (hi - lo > 1) {
        let mid = (lo + hi) / 2;
        let midToK = Math.pow(mid, k);
        if (midToK < n) lo = mid;
        else if (n < midToK) hi = mid;
        else return mid;
    }
    if (Math.pow(hi, k) === n) return hi;
    else return Math.pow(n, 1 / k);
}

let arr = [16, 32, 72, 96, 759375];
console.log(getResults(arr));