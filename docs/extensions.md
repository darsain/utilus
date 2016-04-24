# CSS extensions

List of extensions to current CSS properties.

- [clear](#clear)
- [color](#color)
- [font-size](#font-size)
- [margin](#margin)
- [overflow](#overflow)
- [padding](#padding)
- [position](#position)
- [absolute|fixed|relative](#absolute|fixed|relative)
- [size|min-size|max-size](#sizemin-sizemax-size)
- [visibility](#visibility)

---

### clear

```styl
clear: fix
```

`clear` property is extended with `fix` option, which will output clearfix for the current selector:

```styl
&:after
	content: ''
	display: table
	clear: both
```

### color

```styl
color: text [background]
```

Color is extended with optional 2nd argument that defines background color. Example:

```styl
color: white black
// expands to
color: white
background-color: black
```

### font-size

```styl
font-size: size/line-height
```

Font size is extended with optional slash notation that defines line-height. Example:

```styl
font-size: 1em/2
// expands to
font-size: 1em
line-height: 2
```

### margin

```styl
margin: ~clockhand~
```

Margin is extended with clockhand underscore omission syntax. Read more in [clockhand documentation](utilities.md#clockhand). Example:

```styl
margin: 5px _ _ 5px
// expands to
margin-top: 5px
margin-left: 5px
```

### overflow

```styl
overflow: ellipsis [left]
```

Overflow is extended with `ellipsis` option, which outputs text ellipsis overflow styling. Example:

```styl
overflow: ellipsis
// expands to
white-space: nowrap
overflow: hidden
text-overflow: ellipsis
```

```styl
overflow: ellipsis left
// expands to
white-space: nowrap
overflow: hidden
text-overflow: ellipsis
direction: rtl
text-align: right
```

### padding

```styl
padding: ~clockhand~
```

Padding is extended with clockhand underscore omission syntax. Read more in [clockhand documentation](utilities.md#clockhand). Example:

```styl
padding: 5px _ _ 5px
// expands to
padding-top: 5px
padding-left: 5px
```

### position

```styl
position: cover|center
```

Position is extended with `cover` and `center` options. Example:

```styl
position: cover
// expands to
position: absolute
top: 0
left: 0
width: 100%
height: 100%
```

```styl
position: center
// expands to
position: absolute
top: 50%
left: 50%
transform: translate(-50%, -50%)
```

### absolute|fixed|relative

```styl
absolute: ~clockhand~
fixed: ~clockhand~
relative: ~clockhand~
```

Shorthands to apply specific positions and position type in a single line, with clockhand underscore omission syntax. Example:

```styl
absolute: 50% _ _ 50%
// expands to
position: absolute
top: 50%
left: 50%
```

### size|min-size|max-size

```styl
size: width [height] [!important]
min-size: width [height] [!important]
max-size: width [height] [!important]
```

Shorthand to apply both `(min|max-)width` and `(min|max-)height` in a single line. When **height** is omitted, it assumes **width** value.  Example:

```styl
size: 100px
// expands to
width: 100px
height: 100px
```

```styl
min-size: 100px 60px !important
// expands to
min-width: 100px !important
min-height: 60px !important
```

### visibility

```styl
visibility: visuallyhidden
```

Visibility is extended with `visuallyhidden` option, which outputs visuallyhidden boilerplate. Example:

```styl
visibility: visuallyhidden
// expands to
border: 0
clip: rect(0 0 0 0)
height: 1px
margin: -1px
overflow: hidden
padding: 0
position: absolute
width: 1px
```