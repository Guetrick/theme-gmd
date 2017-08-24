# FilterBar
---

The FilterBar component is an additional bar under the navbar that gives the user the functionality
to switch between different view modes (grid, list), to sort and filter products.

> **Dependents:**    `<Category />`

## Getting Started

```
import { FilterBar } from 'Templates/components';

<FilterBar handleToggleViewMode={() => {}}/>
```

## Props

### handleToggleViewMode (required)

_Type_: `function`

This callback is executed when the user decided to toggle the view mode. (list, grid)

###### Usage:

```
<FilterBar handleToggleViewMode={() => console.log('toggle view')}/>
```

### viewMode

_Default_: `GRID_VIEW`

_Type_: `oneOf[GRID_VIEW, LIST_VIEW]`

The view mode that decides how the product list is being rendered.

###### Usage:

```
import { FilterBar } from 'Templates/components';
import { LIST_VIEW } from 'Library/constants/ViewModes';

<FilterBar handleToggleViewMode={() => {}} viewMode={LIST_VIEW}/>
```

### getFilters (required)

_Type_: `function`

Function that is triggered if the component mounts. It should dispatch the getFilters actions.

###### Usage:

```
<FilterBar getFilters={() => {}} />
```

### handleSortChange (required)

_Type_: `function`

Function that is triggered if the user changed the sort.

###### Usage:

```
<FilterBar handleSortChange={() => {}} />
```

### activeFilters

_Type_: `Object`

_Default_: `{}`

Object with all currently active filters

###### Usage:

```
<FilterBar activeFilters={} />
```

### commitTemporaryFilters

_Type_: `function`

_Default_: `() => {}`

This function is triggered if the user removes one filter via the "X" from the FilterBar

###### Usage:

```
<FilterBar commitTemporaryFilters=() => {} />
```

### handleOpenFiltersView

_Type_: `function`

_Default_: `() => {}`

This function is called if the user clicks on a filter. It should open the main page of the filter.

###### Usage:

```
<FilterBar handleOpenFiltersView=() => {} />
```

### removeTemporaryFilter

_Type_: `function`

_Default_: `() => {}`

This function is called triggered if the user removes one filter via the "X" from the FilterBar

###### Usage:

```
<FilterBar removeTemporaryFilter=() => {} />
```

### sort

_Type_: `String`

_Default_: `null`

Current sort order

###### Usage:

```
<FilterBar sort="" />
```

---