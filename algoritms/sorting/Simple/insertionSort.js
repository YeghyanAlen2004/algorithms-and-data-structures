function insertionSort(arr) {
    let size = arr.length;

    for (let i = 1; i < size; ++i) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}
const arr = [5, 4, 6, 7, 1, 2, 3];

console.log(insertionSort(arr));