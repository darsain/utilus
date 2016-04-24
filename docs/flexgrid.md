# flexgrid

**flexgrid** is a configurable grid system based on flexbox and `calc()` ([flexbox 94%](http://caniuse.com/#search=flexbox) and [calc() 93%](http://caniuse.com/#search=calc) global support as of Apr 2016).

- **[Examples](#examples)**
- **[Goals](#goals)**
- **[Configuration](#configuration)**
- **[API](#api)**
	- [flexgrid](#api)
	- [flexgrid-type](#flexgrid-type)
	- [flexgrid-current](#flexgrid-current)
	- [span](#span)
	- [span-width](#span-width)
	- [offset](#offset)
	- [offset-width](#offset-width)
- **[Custom grids](#custom-grids)**
- **[Nested grids](#nested-grids)**
- **[Best practices](#best-practices)**
- **[Limitations](#limitations)**

## Examples

Basic grid with no gutters and another basic grid nested inside:

```styl
.parent-grid
	// `flexgrid:` defines current global grid used by other mixins like `span:`

	// define a basic grid with 12 columns and no gutters
	flexgrid: 12 columns
	// but seeing as this type of grid is the default grid predefined under the
	// name `basic`, we can just reference that:
	flexgrid: basic

	> .item
		// offset and span use the grid defined above to calculate dimensions

		// span 4 items out of 12
		span: 4/12
		// since argument expands to a raw fraction, this can also be written as
		span: 1/3
		// or
		span: 0.66666
		// but from a human reading perspective, 4/12 is clear in what is happening,
		// so it is the recommended notation to define spans and offsets

	> .child-grid
		offset: 4/12
		span: 4/12

		// create a nested grid inside, extending from `current` grid defined above,
		// and changing max grid columns to 4 = the column span of .child-grid
		flexgrid: current 4 columns
		// or extend from basic grid directly
		flexgrid: basic 4 columns
		// but seeing as all calls without defined `[baseGrid]` extend
		// from `basic` by default, you can just write
		flexgrid: 4 columns

		> .item
			// and now we work with nested grid with 4 max columns
			offset: 2/4
			span: 2/4
```

The markup for this would be very simple and concise:

```html
<div class="parent-grid">
	<div class="item">content</div>
	<div class="child-grid">
		<div class="item">content</div>
	</div>
</div>
```

A sample flexgrid call with all available options:

```styl
// `basic` - name of a grid to extend from. `basic` is default, so this is unnecessary
// `12 columns` - sets the number of max columns for this grid, 12 also default so unnecessary
// `16px gutter` - sets gutter size to static `16px`, set to `%` for relatively sized gutters
// `gutter around` - sets gutter placement to around items
// `vspaced` - adds vertical gutters
// `rtl` - turns on right-to-left items ordering
flexgrid: basic 12 columns 16px gutter around vspaced rtl
```

Saving and using custom grids:

```styl
// create the `main` custom grid
utilus.flexgrid.main = flexgrid-type(12 columns 16px gutter around vspaced rtl)

.container
	// use the `main` grid
	flexgrid: main
	// use the `main` grid but change max columns to 6 and disable rtl
	flexgrid: main 6 columns -rtl
```

The comments above say *use*, but what is actually happening is that you are creating a new grid object that will be extended from `main` grid, and saved to `utilus.flexgrid.current`, which is the grid object mixins `span:` and `offset:` use to calculate dimensions and set styles.

So in this call:

```styl
flexgrid: main 6 columns -rtl
```

The `main` keyword extends a new grid object from `main` predefined grid, and `6 columns -rtl` overrides some of the options of this new grid object.

## Goals

#### No wrapper elements

The main idea behind **flexgrid** is to not touch the border-box of any item, whether it is the container or items within it. All items are positioned with flexbox, gutters and offsets sized with margins, and items sized with width. That, combined with `box-sizing: border-box` on all elements means you have the whole border-box of every item to your disposal, allowing you to use and style it as a normal content element. This is impossible in other grid systems that create gutters with paddings or invisible borders, thus requiring unnecessary nesting and markup pollution.

#### Configurable

Almost every aspect of a grids is easily configurable on grid to grid basis:

- No gutters, gutters around, gutters between.
- Responsively sized columns by default.
- Responsively (when gutter size in `%`) or statically (when gutter size in `px|rem|...`) sized gutters.
- Item wrapping (multiline grids) by default.
- Vertical gutters with a flag.
- Support for rtl layout with a flag.
- Define custom grids, and than just call them, or extend from them without having to redefine them.
- Create a nested grids with responsive gutters, and let **flexgrid** take care of the math in the background.

#### Semantic styling

No `.row` and `.col-md-x` classes everywhere. **flexgrid** is a set of mixins that lets you define grid on any semantic class. But if you want, you can recreate these classes with **flexgrid**.

### In practice

**flexgrid** allows you to, instead of doing this:

```html
<div class="my-section">
	<div class="row">
		<div class="col-xs-12 col-sm-6 col-md-4"><div class="my-item"></div></div>
		<div class="col-xs-12 col-sm-6 col-md-4"><div class="my-item"></div></div>
		<div class="col-xs-12 col-sm-6 col-md-4"><div class="my-item"></div></div>
	</div>
	<div class="row">
		<div class="col-xs-12 col-sm-6 col-md-4"><div class="my-item"></div></div>
		<div class="col-xs-12 col-sm-6 col-md-4"><div class="my-item"></div></div>
		<div class="col-xs-12 col-sm-6 col-md-4"><div class="my-item"></div></div>
	</div>
</div>
```

Do this:

```html
<div class="my-section">
	<div class="my-item"></div>
	<div class="my-item"></div>
	<div class="my-item"></div>
	<div class="my-item"></div>
	<div class="my-item"></div>
	<div class="my-item"></div>
</div>
```

```styl
.my-section
	flexgrid: 16px gutter around

	> .my-item
		span: 4/12

		+media('<992px') // see media.md docs
			span: 6/12

		+media('<768px') // see media.md docs
			span: 12/12
```

##### And why not *just use flexbox*?

So you can write nicely concise and easy to reason about styles:

```styl
.container
	flexgrid: 12 columns 32px gutter around vspaced

	.item
		offset: 4/12
		span: 4/12
```

Instead of fighting boilerplates and `calc()` math:

```styl
.container
	display: flex
	flex-flow: row wrap
	padding-top: 32px
	> *
		flex: 0 0 auto
		width: calc(((100% - 416px) / 12) * 1 + 0px)
		margin-left: calc(((100% - 416px) / 12) * 0 + 32px)
		margin-bottom: 32px
	> .item
		margin-left: calc(((100% - 416px) / 12) * 4 + 160px)
		width: calc(((100% - 416px) / 12) * 4 + 96px)
```

## Configuration

Global configuration is stored in `utilus.flexgrid` hash and has these defaults:

```styl
utilus.flexgrid = {
	borderBox: false, // enable if box-sizing is not set to border-box globally
	ignoredFlags: 'basic' 'size' 'columns' 'gutter', // internal
	spacings: 'around' 'between'                     // internal
	basic: {...},    // basic grid with all default options
	current: {...}   // current global grid, refers to basic at the start
}
```

The only actual option for you to change here is `borderBox`, which when enabled, makes **flexgrid** set `box-sizing: border-box` on containers and items, as this is required for **flexgrid** to work properly. Ignore this if you are already setting this globally on all elements, as any modern styler should :)

Regarding more info on `basic` and `current` grid objects, see [Custom grids documentation](#custom-grids).

## API

### flexgrid

```styl
flexgrid: ...definition...
```

Parses flexgrid definition into a grid configuration object, sets it as a current global flexgrid (`utilus.flexgrid.current`), and outputs the boilerplate. The `span:` and `offset:` mixins than use `utilus.flexgrid.current` to calculate dimensions and set styles.

Use on a grid containing element.

#### definition

A human readable string that defines the grid. Possible options and flags are:

###### **[baseGrid]**

Name of a custom grid, or a raw grid configuration object to extend from (see [Custom grids](#custom-grids)). You can either leave it as is, or extend it with further definitions. Has to be the 1st argument.

All **flexgrid** definitions extend from either `utilus.flexgrid.basic` grid object, or a custom grid defined by **[baseGrid]** argument. In this sense, `utilus.flexgrid.basic` is the grid that defines default values. It is a grid with 12 columns, no gutters, and all other flags disabled. If that is all you want, just reference the predefined `basic` grid:

```styl
flexgrid: basic
```

###### **[size] size**

Set the grid container size. Default is `100%`. Used in nested grids with relative gutters so **flexgrid** knows how to recalculate gutter sizing. If you use static gutters or no gutters at all this option is irrelevant. See [Nested grids documentation](#nested-grids).

###### **[num] columns**

Set the number of max columns per row. Default is `12`, and is defined in `utilus.flexgrid.basic.columns`.

###### **[size] gutter [type]**

Set the gutter size and/or type.

- **[size]** - The unit type of gutter size defines whether gutter sizing will be responsive (when `%`), or static (when `px|rem|...`).
- **[type]** - Can be: `around` *(default)* or `between`

Examples:

```styl
flexgrid: 2% gutter around    // 2% responsive gutters positioned around items
flexgrid: 2% gutter           // same as ^ as around is the default
flexgrid: 16px gutter between // 16px static gutters positioned only between items
```

###### **vspaced**

Boolean flag that adds vertical gutters. Prefix with `-` to turn off.

Examples:

```styl
flexgrid: 16px gutter around vspaced
utilus.flexgrid.main = flexgrid-type(16px gutter around vspaced)
flexgrid: main -vspaced  // extends from main grid, but turns off vertical gutters
```

###### **rtl**

Boolean flag that enables right to left grid (sets `flex-direction` to `row-reverse`). Prefix with `-` to turn off.

### flexgrid-type

```styl
flexgrid-type(...definition...)
```

Parses the definition and returns the grid configuration object. For **definition** spec, see above.

You'd use this to define custom grids, or grid objects to use as optional 2nd arguments in mixins like `span-width()`, `span()`, `offset()`, ... Example:

```styl
utilus.flexgrid.custom = flexgrid-type(6 columns 16px gutter around vspaced)

p(utilus.flexgrid.custom) =>
{
	size: 100%,
	columns: 6,
	gutter: 16px,
	spacing: 'around',
	sizing: 'static',
	vspaced: true,
	rtl: false
}
```

### flexgrid-current

```styl
flexgrid-current(...definition...)
```

Uses `flexgrid-type()` to parse the **definition** and sets it as the `utilus.flexgrid.current` global grid used by mixins such as `span:` and `offset:`. So all it does is:

```styl
utilus.flexgrid.current = flexgrid-type(...definition...)
```

### span

```styl
span: fraction [grid]
```

Calculates an item width for `utilus.flexgrid.current` grid, or custom grid when passed as 2nd argument.

- **fraction** - Full fraction notation, such as `1/12`, which describes that item should span 1 out of 12 available columns.
- **[grid]** - Grid to calculate item span for. Can be: string with custom grid name, or grid object generated by `flexgrid-type()`. By default `utilus.flexgrid.current` grid is used.

The fraction is evaluated into a raw floating number, so `6/12`, `1/2`, and `0.5` are all equivalent and valid **fraction** values, though the `6/12` notation is recommended as it clearly describes what is happening.

Examples:

```styl
utilus.flexgrid.custom = flexgrid-type(32px gutter)

.grid
	flexgrid: 16px gutter

	.item
		span: 6/12 // span 6 out of 12 columns in current grid defined on .grid
		span: 6/12 custom // span 6 of 12 columns of `custom` grid
		span: 6/12 flexgrid-type(custom) // span 6 of 12 columns of `custom` grid object
		span: 6/12 flexgrid-type(64px gutter) // 6 of 12 columns of passed grid object
```

This is just to illustrate all available call types. Only the first span call will produce the correct behavior.

### span-width

```styl
span-width(fraction [grid])
```

Returns the item width used by `span:` mixin documented above. The `span:` mixin is just:

```styl
width: span-width(arguments)
```

### offset

```styl
offset: fraction [grid]
```

Calculates the start (left normally, right when `rtl` enabled) offset of an item from its previous neighbor.

**fraction** and **[grid]** arguments same as in `span:` mixin documented above.

### offset-width

```styl
offset-width(fraction [grid])
```

Calculates the offset width used by `offset:` mixin. Accepts same arguments.

## Custom grids

To not have to always write similar grid definitions, you can save your most used grid type as a custom grid on a `utilus.flexgrid` object.

The only predefined grid is the `basic` grid (no gutters and everything turned off), and its object looks like this:

```styl
utilus.flexgrid.basic = {
	size: 100%,
	columns: 12,
	gutter: false,
	spacing: 'around',  // ignored when no gutter
	sizing: 'relative', // ignored when no gutter, and determined automatically by gutter unit
	vspaced: false,
	rtl: false
}
```

You can use this grid by setting `basic` as a **baseGrid** definition:

```styl
flexgrid: basic
```

If you want to create a custom grid called `main`, you'd use `flexgrid-type()` to parse grid definition, and save the resulting object in a `main` property on `utilus.flexgrid` object:

```styl
utilus.flexgrid.main = flexgrid-type(16px gutter around)
```

And than use it all over the place:

```styl
.container
	flexgrid: main
	...
```

If you need main grid, but with some tweaks, just write other definitions after the grid reference:

```styl
.container
	// extend main grid with different options
	flexgrid: main 4 columns vspaced
	...
```

## Nested grids

Sometimes, you need to put grids within grids. In such cases, you need to do different things depending on the nature of parent and nested grids.

### Basic

In basic grids (no gutters) all you need is to adjust the nested grid max columns.

```styl
.parent
	flexgrid: 12 columns

	.parent-item-but-also-child-grid
		span: 6/12           // child grid item spans 6 out of 12 columns of a parent grid
		flexgrid: 6 columns  // which means max columns in nested grid should also be 6

		.child-item
			span: 3/6 // note the use of 6 as max columns number now
```

### Static gutters

In statically sized gutter grids, you need to make sure that nested grid has `gutter between` sizing, so it seamlessly blends with the grid above.

```styl
utilus.flexgrid.static = flexgrid-type(12 columns 16px gutter around)

.parent
	flexgrid: static

	.parent-item-but-also-child-grid
		span: 6/12
		flexgrid: static 6 columns gutter between

		.child-item
			span: 3/6
```

## Responsive gutters

In responsively sized gutter grids, you need to tell the nested grid what is its size within the parrent grid, so **flexgrid** can recalculate gutter sizing. Nested grid size equals the `%` size of an item it is nested within. You can use `span-width()` utility function to easily calculate it and pass into the **size** option. Example:

```styl
utilus.flexgrid.responsive = flexgrid-type(12 columns 2% gutter around)

.parent-grid
	flexgrid: responsive

	> .parent-item-but-also-child-grid
		span: 6/12

		// span-width(fraction [gridName]) calculates width of an item of a current grid,
		// which defines the size of this nested grid
		flexgrid: current span-width(6/12) size 6 columns gutter between

		// If the parent grid is defined as a custom grid called `responsive`:
		flexgrid: responsive span-width(6/12 responsive) size 6 columns gutter between

		// If you are nesting inside a grid that is not currently set as global,
		// or you don't have it saved as a custom grid, you can extend from and
		// pass the desired parent grid type object as a 2nd span-width argument:
		parentGrid = grid-type(12 columns 2% gutter around)
		flexgrid: parentGrid span-width(6/12 parentGrid) size 6 columns gutter between

		> .child-item
			span: 3/6
```

## Limitations

A few, but there are some.

#### What not to touch

You can't touch padding of a grid containing element, and margins & width of grid items.

Width is defined by `span:` mixin, and margins by gutters, `vspaced` flag and `offset:` mixin.

Apart of that, the border-boxes are yours!

#### Gutter between behavior

The only sorta-serious limitation is currently with the `gutter between` sizing of gutters. In this sizing, gutters are not defined as margins, but as empty space via `justify-content: space-between` flexbox property.

This means that if all of the available columns of the grid row are not filled with items or offsets, the gutters will expand as justified word spacing does.

Also, if size of a 1st item in a row is smaller or equal to the sum of all gutters of a previous row (remember - empty space), it will jump up the row to fill it up.

I've tried many different solutions to this, other ways how to style this type of grid without these issues, but they all required breaking the rule of not touching border-boxes (the number 1 goal of this grid system), significantly crippled the cleanliness of code and API, and made grid nesting a nightmare.

Honestly, this limitation is quite an edge case that isn't that bothersome, and will be fixed when flexbox spec to control gutters lands in majority of browsers.