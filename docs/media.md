# media

**media** provides an easy way how to define media queries.

- **[Examples](#examples)**
- **[Options](#options)**
- **[API](#api)**
	- [media](#api)
	- [media-query](#media-query)
- **[Shorthands](#shorthands)**
- **[Custom queries](#custom-queries)**
- **[Notable behavior](#notable-behavior)**

## Examples

Basic usage:

```styl
.foo
	+media('screen <960px landscape fullscreen or print >960px monochrome')
		color: red

// expands to
@media screen and (max-width: 959px) and (orientation: landscape) and (display-mode: fullscreen), print and (min-width: 960px) and (monochrome) {
  .foo {
    color: #f00;
  }
}
```

Shorthands:

```styl
.foo
	+landscape()
		color: red
```

Shorthands + nesting:

```styl
.foo
	+between(960px 1200px)
		color: red
		+portrait()
			color: blue

// expands to
@media (min-width: 960px) and (max-width: 1199px) {
  .foo {
    color: #f00;
  }
}
@media (min-width: 960px) and (max-width: 1199px) and (orientation: portrait) {
  .foo {
    color: #00f;
  }
}
```

## Options

All **media** options are defined in `utilus.media` object, and are mostly for internal needs:

```styl
utilus.media = {
	types: 'all' 'braille' 'handheld' 'print' 'projection' 'screen' 'tty' 'tv' 'embossed' 'speech' '3d-glasses',
	orientations: 'landscape' 'portrait',
	modes: 'fullscreen' 'standalone' 'minimal-ui' 'browser',
	flags: 'color' 'color-index' 'monochrome' 'grid',
	scans: 'progressive' 'interlace',
	reductor: {
		'px': 1, 'em': 0.1, 'rem': 0.1, 'ex': 0.1, 'pt': 0.1,
		'pc': 0.1, 'in': 0.1, 'mm': 0.1, 'cm': 0.1, 'ch': 0.1
	}
}
```

You can maybe extend these with new keywords when they arrive in spec, and **utilus** will be too slow to adopt :)

The `reductor` is also useful for controlling [query collisions](#query-collisions).

## API

### media

```styl
+media(queryName|rules)
	{block}
```

Parses rules into a valid media query and assigns all styles from `{block}` to it.

#### queryName

Use a predefined query by passing its name. See [custom queries](#custom-queries).

#### rules

A string (has to be a string, not a list of idents) of short and concise rules to define the media query.

Available rules and flags are:

- ***media type*** : `{mediaType}`
	- Has to be the 1st rule, or 1st rule after `or`.
	- Available: `all`, `braille`, `handheld`, `print`, `projection`, `screen`, `tty`, `tv`, `embossed`, `speech`, `3d-glasses`
	Example: `screen <480px or print` becomes `screen and (max-width: 479px), print`
- ***device*** : `device`
	- Turns on the use of **device** queries in all consecutive rules.
	- Example: `>20px device <400pz` becomes `(min-width: 20px) and (max-device-width: 399px)`.
- **width** : `{sign}{size}` or `w{sign}{size}`
	- `{sign}` can be `>|<|=` for min, max, and equal query.
	- `{size}` can be any CSS length unit.
	- Example: `>960px` becomes `(min-width: 960px)`
- **height** : `h{sign}{size}`
	- `{sign}` can be `>|<|=` for min, max, and equal query.
	- `{size}` can be any CSS length unit.
	- Example: `>480px` becomes `(min-height: 480px)`
- **aspect-ratio** : `{sign}{n}/{n}`
	- `{sign}` can be `>|<|=` for min, max, and equal query.
	- Example: `>1/1` becomes `(min-aspect-ratio: 1/1)`
- **resolution** : `{sign}{resolution}`
	- `{sign}` can be `>|<|=` for min, max, and equal query.
	- `{resolution}` can be in `dpi`, `dpcm`, `dppx`
	- Example: `>2dppx` becomes `(min-resolution: 2dppx)`, the new syntax for `(min-device-pixel-ratio: 2)`
- **orientation** : `{orientation}`
	- Available: `landscape`, `portrait`
	- Example: `landscape` becomes `(orientation: landscape)`
- **display-mode** : `{displayMode}`
	- Available: `fullscreen`, `standalone`, `minimal-ui`, `browser`
	- Example: `fullscreen` becomes `(display-mode: fullscreen)`
- **scan** : `{scan}`
	- Available: `progressive`, `interlace`
	- Example: `progressive` becomes `(scan: progressive)`
- ***flags*** `{flag}`
	- Enables a boolean flag.
	- Available: `color`, `color-index`, `monochrome`, `grid`
	- Example: `monochrome` becomes `(monochrome)`
- **color** : `color{sign}{num}`
	- Sets the number of bits per color component of the output device.
	- `{sign}` can be `>|<|=` for min, max, and equal query.
	- Example: `color>4` becomes `(min-color: 4)`
- **color-index** : `color-index{sign}{num}`
	- Sets the number of entries in the color look-up table for the output device.
	- `{sign}` can be `>|<|=` for min, max, and equal query.
	- Example: `color-index>256` becomes `(min-color-index: 256)`

Operators:

- `or` - All rules are joind with `and`, this splits the `and` groups by comma, effectively creating an `or` logic.
	- Example: `screen <480px or print` becomes `screen and (max-width: 479px), print`

Example query with all available rules:

```styl
+media('screen device >960px <1200px h>480px >1/1 >2dppx landscape fullscreen progressive color color-index monochrome grid color>4 color-index>256')
	{block}
```

### media-query

```styl
media-query(rules)
```

Mixin that parses `rules` and returns a valid media query string. For `rules` documentation see above.

## Shorthands

Shorthands that prepend or append their name to the optional rules:

```styl
+all([rules])    => +media(rules)
+screen([rules]) => +media('screen ' + rules)
+print([rules])  => +media('print ' + rules)

+above(min)       => +media('>{min}')
+below(max)       => +media('<{max}')
+between(min max) => +media('>{min} <{max}')

+landscape([rules]) => +media(rules + ' landscape')
+portrait([rules])  => +media(rules + ' portrait')

+fullscreen([rules])  => +media(rules + ' fullscreen')
+aspect-ration(ratio) => +media(ratio)
+resolution(res)      => +media(res)
```

Shorthands `+all()`, `+aspect-ratio()`, and `+resolution()` are just an aliases of `+media()`, but might provide more descriptive declarations if you're just setting that one property. For example:

```styl
+resolution('>2dppx')
//instead of
+media('>2dppx')
```

Whatever is more appropriate for you.

## Custom queries

You can use `media-query()` to generate a custom query, save it, and than just reference by its name later.

All queries have to be saved as properties on `utilus.media` object. Example:

```styl
utilus.media.mobile = media-query('<480px')
```

You can recall this query by passing a `queryName` instead of `rules` into the `+media()` mixin:

```styl
+media('mobile')
	{block}
```

## Query collisions

If you have 2 rules like this:

```styl
+media('<480px')
+media('>480px')
```

The rules will collide when the page width is precisely `480px`.

To prevent this, **media** automatically adjust the `max-(width|height)` values to be exclusive, similar to array slicing arguments. This behavior affects only **width** and **height** queries.

`px` units are reduced by `1`, while other units are reduced by `0.1`. In practice, this means:

```styl
+media('<480px')` // => (max-width: 479px)
+media('<480em')` // => (max-width: 479.9em)
```

You can control the reduction amount with `utilus.media.reductor` option, which by default is:

```styl
utilus.media.reductor: {
	'px': 1, 'em': 0.1, 'rem': 0.1, 'ex': 0.1, 'pt': 0.1,
	'pc': 0.1, 'in': 0.1, 'mm': 0.1, 'cm': 0.1, 'ch': 0.1
}
```

Changing `rem` reduction amount to `0.5` would look like:

```styl
utilus.media.reductor.rem = 0.5
```

You can also set a global reductor for all units by replacing the whole object with a number:

```styl
utilus.media.reductor = 0.5
```

Or disable this behavior completely by setting it to `0`:

```styl
utilus.media.reductor = 0
```