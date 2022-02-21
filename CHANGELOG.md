# Changelog

## Unreleased...

- ... <!-- Add new lines here. Version number will be decided later -->

## 1.4.0

_2022-02-21_

- feat: Add TypeScript type declarations

## 1.3.3

_2019-06-03_

- fix: Check for `'disable'` method in the jQuery plugin action invocation

## 1.3.1 — 1.3.2

_2019-05-08_

- fix: Preserve whitespace/newlines in `<option/>` text
- fix: Avoid double escaping of `"<"` characters

## 1.3.0

_2017-03-17_

- feat: Toggle `emptyClass` depending on if selected value is `""`
- feat: Tolerate repeat instantiations with new config
- fix: Copy only defined (non-nully) options to widget instance

## 1.2.1

_2015-12-21_

- fix: `jQuery.fn.selectybox('widget')` method returned nothing
- fix: jQuery `refresh`/`val`/`destroy` methods threw errors when collection was empty

## 1.2.0

_2015-11-23_

- feat: Always register the jQuery plugin if jQuery is defined

## 1.1.0 — 1.1.1

_2015-04-30_

- feat: Add support for `disabledClass` on `widget.container`
- docs: Update jQuery plugin docs with 'disable' method invocation

## 1.0.0

_2014-11-03_

- Initial release as npm module. Codebase already 2 years old.
