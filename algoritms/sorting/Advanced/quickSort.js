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

let arr = [];
for (let i = 0; i < 100000; ++i) {
    arr[i] = Math.floor((Math.random() + 1) * i);
}
quickSort(arr);
console.log(arr);
