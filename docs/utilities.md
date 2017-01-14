# Utilities

List of helpful mixins that come with **utilus**.

- [clockhand](#clockhand)
- [easing](#easing)
- [flatten](#flatten)
- [modular-scale](#modular-scale)
- [golden-ratio](#golden-ratio)
- [parse-fraction](#parse-fraction)
- [flatten](#flatten)

---

### clockhand

```styl
clockhand(values, [propertyName], [sides], [propertyProperty])
```

Internal mixin to implement clockhand underscore omission syntax to various properties. This was completely stolen and a bit adapted from amazing [`clockhand-stylus`](https://www.npmjs.com/package/clockhand-stylus) by [Jason Rose-Kuhrt](https://github.com/jasonkuhrt). He since removed the repo from github, so I can't link to that. Needless to say this is the best solution to this problem I've seen, so I'm not gonna reinvent the wheel here :)

The clockhand works exactly the same as shorthand margin declaration:

```styl
margin: top right bottom left
margin: top horizontal bottom
margin: vertical horizontal
```

But adds the missing combinations by allowing you to skip specific sides with underscore.

```styl
margin: [top|_] [right|_] [bottom|_] [left|_]
```

Which than looks like this:

```styl
margin: vertical _ // to define margin-top + margin-bottom only
margin: top right _ left // no bottom
margin: top right bottom _ // no left
// etc ...
```

The mixin is than used to add this kind of syntax to all properties that would benefit from it, such as:

- `margin`
- `padding`
- [`absolute`](extensions.md#absolutefixedrelative) - custom prop
- [`fixed`](extensions.md#absolutefixedrelative) - custom prop
- [`relative`](extensions.md#absolutefixedrelative) - custom prop

### easing

```styl
easing(name)
```

Returns a cubic-bezier matching the easing name. Available easing types are defined in `utilus.easing`:

```styl
utilus.easing = {
	'in-quad': cubic-bezier(0.55, 0.085, 0.68, 0.53),
	'in-cubic': cubic-bezier(0.55, 0.055, 0.675, 0.19),
	'in-quart': cubic-bezier(0.895, 0.03, 0.685, 0.22),
	'in-quint': cubic-bezier(0.755, 0.05, 0.855, 0.06),
	'in-sine': cubic-bezier(0.47, 0, 0.745, 0.715),
	'in-expo': cubic-bezier(0.95, 0.05, 0.795, 0.035),
	'in-circ': cubic-bezier(0.6, 0.04, 0.98, 0.335),
	'in-back': cubic-bezier(0.6, -0.28, 0.735, 0.045),
	'out-quad': cubic-bezier(0.25, 0.46, 0.45, 0.94),
	'out-cubic': cubic-bezier(0.215, 0.61, 0.355, 1),
	'out-quart': cubic-bezier(0.165, 0.84, 0.44, 1),
	'out-quint': cubic-bezier(0.23, 1, 0.32, 1),
	'out-sine': cubic-bezier(0.39, 0.575, 0.565, 1),
	'out-expo': cubic-bezier(0.19, 1.00, 0.22, 1),
	'out-circ': cubic-bezier(0.075, 0.82, 0.165, 1),
	'out-back': cubic-bezier(0.175, 0.885, 0.32, 1.275),
	'in-out-quad': cubic-bezier(0.455, 0.03, 0.515, 0.955),
	'in-out-cubic': cubic-bezier(0.645, 0.045, 0.355, 1),
	'in-out-quart': cubic-bezier(0.77, 0, 0.175, 1),
	'in-out-quint': cubic-bezier(0.86, 0, 0.07, 1),
	'in-out-sine': cubic-bezier(0.445, 0.05, 0.55, 0.95),
	'in-out-expo': cubic-bezier(1, 0, 0, 1),
	'in-out-circ': cubic-bezier(0.785, 0.135, 0.15, 0.86),
	'in-out-back': cubic-bezier(0.68, -0.55, 0.265, 1.55)
}
```

Example:

```styl
transition: all 300ms easing('in-quad')
// expands to
transition: all 300ms cubic-bezier(0.55, 0.085, 0.68, 0.53)
```

### flatten

```styl
flatten(list, ...[listN])
```

Flatten passed lists into a single flat list. This is essential when doing fancy stuff like passing arguments between function, as stylus has currently a nasty set of issues with that ([#2150](https://github.com/stylus/stylus/issues/2150)).

Example:

```styl
foo()
	// look at stylus#2150 linked above as to why would you do this
	args = flatten(arguments)
```

### modular-scale

```styl
modular-scale(base, ratio, [step])
```

Modular scale of a number. Example:

```styl
font-size: 16px
font-size: modular-scale(@font-size, 1.5)
font-size: modular-scale(@font-size, 1.5, 2)
// expands to
font-size: 16px
font-size: 24px
font-size: 54px
```

### golden-ratio

```styl
golden-ratio(base, [step])
```

Modular scale by golden ratio. A shorthand to `modular-scale(base, 1.618, step)`. Example:

```styl
font-size: 16px
font-size: golden-ratio(@font-size)
font-size: golden-ratio(@font-size, 2)
// expands to
font-size: 16px
font-size: 25.888px
font-size: 67.77281651200002px
```

### parse-fraction

```styl
parse-fraction(mixed)
```

Parses floating number out of passed fraction in different notations. Used by **flexgrid** to make `span` and `offset` mixins work. Example:

```styl
parse-fraction(1 '/' 2) // => 0.5
parse-fraction(1/2)   // => 0.5
parse-fraction('1/2') // => 0.5
parse-fraction(0.5)   // => 0.5
```

### rem

```styl
rem(px)
```

Calculates `rem` out of passed `px` unit based on `utilus.rootFontSize`. Default is:

```styl
utilus.rootFontSize = 16px
```

`16px` matches default root font size in all browsers. Unless you are doing something weird, just leave it be, and respect user's browser settings.

The idea behind this is to style in `px`, but have the resulting CSS output in `rem`. Example:

```styl
width: rem(720px)
+below(@width)
	width: rem(360px)
```

In the example above we have responsive styles, and respect the user's root font size browser setting at the same time.