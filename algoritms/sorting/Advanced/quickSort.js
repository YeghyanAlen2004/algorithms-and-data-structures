const quickSort = (arr, low = 0, high = arr.length) => {
    if (low < high - 1) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi + 1);
        quickSort(arr, pi + 1, high);
    }
};

const partition = (arr, low, high) => {
    let pivot = arr[Math.floor(low + Math.random() * (high - low))];
    let i = low - 1;
    let j = high;
    while (true) {
        do {
            i++; 

        } while (arr[i] < pivot);
        do {
            j--;
        } while (arr[j] > pivot);

        if (i >= j) return j;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
};

let arr = [10, 7, 8, 9, 1, 5, 11, 23, 4, 6, 7, 8, 9, 10];
quickSort(arr, 0, arr.length);
console.log(arr);

function isSorted(arr) {
    for (let i = 1; i < arr.length; ++i) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

console.log(isSorted(arr));
quickSort(arr);
console.log(isSorted(arr));

