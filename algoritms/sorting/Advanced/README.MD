MERGE SORT

Merge Sort is a comparison-based divide and conquer algorithm. It divides the array into two halves, recursively sorts each half, and then merges the sorted halves into one sorted array.

> How it works

1.  Divide the array into two halves until each subarray has only one element.

2.  Recursively sort the left and right halves.

3.  Merge the two sorted halves into one sorted array.

> Time Complexity

.   Best case: O(n log n) – always divides and merges efficiently.

.   Average case: O(n log n) – consistent for any input.

.   Worst case: O(n log n) – guaranteed even in reverse order.

> Space Complexity

.   O(n) – requires additional arrays for merging.

> Stability

.   Stable – equal elements retain their original relative order.