# Options

List of all to you relevant **utilus** options with their default values:

```styl
// used by rem() mixin to calculate rem values from px units
// example: rem(16px) => 1rem
// 16px is the default font-size in all browsers, so unless you are doing
// something unnecessary with root font size, leave it as is
utilus.rootFontSize = 16px

// when true, tells flexgrid to manually set box-sizing to border-box on its
// containers and child items, which is required for flexgrid to work properly
// most sensible people these days set border-box sizing globally
// on all elements, so this is irrelevant in 99% of the cases
utilus.flexgrid.borderBox = false
```

As you can see, there is not much need for configuration in **utilus**. If something has configurable behavior, you define it in mixin calls, just as you would when using CSS properties. For example, you don't spam global variables to define your grid:

```styl
my-grid-columns = 12
my-gutter-size = 16px
my-gutter-type = around
```

You do that right in the mixin for each particular grid:

```styl
.container
	flexgrid: 12 columns 16px gutter around

	.item
		span: 1/12
```