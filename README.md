Parameters to Check:

 - **Commit Duration:** Time taken for React to render the committed updates.
 - **Render Duration:** Time taken for individual components to render.
 - **Interactions:** User interactions that triggered the renders.
 - **Flame Graph:** Visual representation of component render times.
 - **Ranked Chart:** Sorted list of components by render duration.

## BEFORE OPTIMISATION

| Interaction | Max Commit Duration | Max Render Duration | Caused by | Flame Graph | Ranked Chart |
|---                     |---:     |---:     |---|---|---|
| Sorting a column       | 239.1ms | 236.7ms | SearchBar, Table     | ![alt text](image-10.png) | ![alt text](image-7.png)  |
| Search by country name | 251.6ms | 244.7ms | SearchBar, Table     | ![alt text](image-11.png) | ![alt text](image-12.png) |
| Search by year         | 232.9ms | 230.8   | SearchBar, Table     | ![alt text](image-14.png) | ![alt text](image-13.png) |
| Add column             | 316.2ms | 316ms   | ColumnsSelect, Table | ![alt text](image-15.png) | ![alt text](image-16.png) |
| Remove column          | 279.9ms | 279.8ms | ColumnsSelect, Table | ![alt text](image-18.png) | ![alt text](image-17.png) |

## AFTER OPTIMISATION

| Interaction | Max Commit Duration | Max Render Duration | Caused by | Flame Graph | Ranked Chart |
|---                     |---:     |---:     |---|---|---|
| Sorting a column       | 215.9ms | 215.3ms | SearchBar, Table     | ![alt text](image-28.png) | ![alt text](image-27.png)  |
| Search by country name | 40.7ms | 40.2ms | SearchBar, Table     | ![alt text](image-26.png) | ![alt text](image-25.png) |
| Search by year         | 233.7ms | 233.2ms | SearchBar, Table     | ![alt text](image-24.png) | ![alt text](image-23.png) |
| Add column             | 270.6ms | 246.9ms | ColumnsSelect, Table | ![alt text](image-19.png) | ![alt text](image-20.png) |
| Remove column          | 239ms   | 217.1ms | ColumnsSelect, Table | ![alt text](image-22.png) | ![alt text](image-21.png) |


Commit and render times decreased:
- sorting a column (-10%),
- adding/deleting columns (-14–22%),
- searching by country (~−84%). 

Time has increased a bit on search by year (+0.3–1%).
