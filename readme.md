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

## Documentation

[Documentation](https://github.com/darsain/utilus/docs) is located in the `/docs` folder.

- **[Options](https://github.com/darsain/utilus/docs/options.md)** - All **utilus** options.
- **[Flexgrid](https://github.com/darsain/utilus/docs/flexgrid.md)** - Flexible grid based on flexbox and `calc()`.
- **[Media queries](https://github.com/darsain/utilus/docs/media.md)** - Comfy media queries.
- **[CSS extensions](https://github.com/darsain/utilus/docs/extensions.md)** - Extended and new CSS properties.
- **[Utilities](https://github.com/darsain/utilus/docs/utilities.md)** - Helper mixins and plugins.

[List of available modules](https://github.com/darsain/utilus/utilus) is located in the `/utilus` folder.

## License

[MIT](https://github.com/darsain/utilus/license.md)