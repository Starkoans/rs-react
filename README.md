Parameters to Check:

 - **Commit Duration:** Time taken for React to render the committed updates.
 - **Render Duration:** Time taken for individual components to render.
 - **Interactions:** User interactions that triggered the renders.
 - **Flame Graph:** Visual representation of component render times.
 - **Ranked Chart:** Sorted list of components by render duration.


| Interaction | Max Commit Duration | Max Render Duration | Caused by | Flame Graph | Ranked Chart |
|---                     |---:     |---:     |---|---|---|
| Sorting a column       | 239.1ms | 236.7ms | SearchBar, Table     | ![alt text](image-10.png) | ![alt text](image-7.png)  |
| Search by country name | 251.6ms | 244.7ms | SearchBar, Table     | ![alt text](image-11.png) | ![alt text](image-12.png) |
| Search by year         | 232.9ms | 230.8   | SearchBar, Table     | ![alt text](image-14.png) | ![alt text](image-13.png) |
| Add column             | 316.2ms | 316ms   | ColumnsSelect, Table | ![alt text](image-15.png) | ![alt text](image-16.png) |
| Remove column          | 279.9ms | 279.8ms | ColumnsSelect, Table | ![alt text](image-18.png) | ![alt text](image-17.png) |


