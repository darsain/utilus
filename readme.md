# utilus

Utilities for [Stylus](https://github.com/stylus/stylus).

**utilus** is trying to make styling process easier by hiding away the annoying parts, and adding new features with a nice to use APIs.

You'll get super comfy media queries, awesome flexgrid, and tons of CSS improvements and extensions. **utilus** also doesn't produce prefixes, that's what [autoprefixer](https://www.npmjs.com/package/autoprefixer) is for.

## Installation

```
npm install utilus --save-dev
```

## Usage

From within your styles, load the whole utilus:

```styl
@require 'utilus'
```

Or only the modules you are interested in:

```styl
@require 'utilus/media'
@require 'utilus/flexgrid'
```

## Examples

Comfy flexible grid system:

```styl
.container
	// define a custom grid for this element
	flexgrid: 12 columns 16px gutter around

	.item
		span: 4/12    // span item 4 out of 12 columns
		offset: 4/12  // offset item 4 out of 12 columns

// save a custom grid
utilus.flexgrid.main = flexgrid-type(12 columns 16px gutter around)

.container
	// and use later
	flexgrid: main
	// or use with some adjustmenst
	flexgrid: main gutter between
```

Easy media queries:

```styl
+media('screen <480px')
	color: red

// or with a shorthand
+screen('<480px')
	color: red

// or save custom query
utilus.media.mobile = media-query('screen <480px')
// and use later
+media('mobile')
	color: red
```

Tons of utility functions and CSS extensions:

```styl
clear: fix          // output clearfix
size: 100px         // set width & height to 100px
size: 100px 60px    // set width to 100px and height to 60px
margin: 5px _ 10px  // set top and bottom margin with underscore omission syntax
padding: 5px _ 10px // set top and bottom padding with underscore omission syntax
position: cover     // cover the parent relative element
position: center    // center within parent relative element
absolute: 5px _ _ 10px // position: absolute, top: 5px, left: 10px
overflow: ellipsis  // text ellipsis overflow
transition: all 300ms easing('in-quad') // easy easing references
width: rem(100px)   // style in `px` and respect the user browser settings at the same time
// and more!
```

## Documentation

[Documentation](https://github.com/darsain/utilus/docs) is located in the `/docs` folder.

- **[Options](https://github.com/darsain/utilus/blob/master/docs/options.md)** - All **utilus** options.
- **[Flexgrid](https://github.com/darsain/utilus/blob/master/docs/flexgrid.md)** - Flexible grid based on flexbox and `calc()`.
- **[Media queries](https://github.com/darsain/utilus/blob/master/docs/media.md)** - Comfy media queries.
- **[CSS extensions](https://github.com/darsain/utilus/blob/master/docs/extensions.md)** - Extended and new CSS properties.
- **[Utilities](https://github.com/darsain/utilus/blob/master/docs/utilities.md)** - Helper mixins and plugins.

[List of available modules](https://github.com/darsain/utilus/utilus) is located in the `/utilus` folder.

## License

[MIT](https://github.com/darsain/utilus/license.md)