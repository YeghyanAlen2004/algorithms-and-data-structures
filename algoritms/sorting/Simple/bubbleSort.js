function bubbleSort (arr) {
    let size = arr.length;

    for (let i = 0; i < size - 1; ++i) {
        let swapped = false;
        for (let j = 0; j < size - 1 - i; ++j) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    return arr;
}

const arr = [2, 2, 3, 1];
console.log(bubbleSort(arr));