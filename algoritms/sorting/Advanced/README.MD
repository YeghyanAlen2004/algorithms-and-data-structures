MERGE SORT
-------------------------------------------------------------------------------------------------------

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

Quick Sort
-------------------------------------------------------------------------------------------------------

Quick Sort is a divide-and-conquer sorting algorithm. It selects a pivot element, partitions the array into two parts (less than pivot and greater than or equal to pivot), recursively sorts each part, and combines them into a sorted array.

> How it works

1.  Choose a pivot element – usually the first, last, or a random element.

2.  Partition the array into two subarrays: elements less than pivot and elements greater than or equal to pivot.

3.  Recursively apply Quick Sort to the left and right subarrays.

4.  Combine the results (pivot is already in its correct position after partitioning).

> Time Complexity

.   Best case: O(n log n) – when the array is evenly partitioned at each step.

.   Average case: O(n log n) – performs efficiently on average.

.   Worst case: O(n²) – occurs when partitions are highly unbalanced (e.g., already sorted array with poor pivot choice).

> Space Complexity

.   O(log n) – uses only the recursion stack (in-place implementation).

> Stability

.   Unstable – equal elements may not retain their original relative order.


___________________________________________________________________________________________
| Algorithm       | Best Case | Average Case | Worst Case | Space Complexity | Stable? |
| --------------- | --------- | ------------ | ---------- | ---------------- | ------- |
| **Merge Sort**  | O(n log n)| O(n log n)   | O(n log n) | O(n)             | Yes     |
| **Quick Sort**  | O(n log n)| O(n log n)   | O(n²)      | O(log n)         | No      |
-------------------------------------------------------------------------------------------
