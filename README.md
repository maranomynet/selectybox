# Selectybox 
**... simple wrapper to allow fancy styling of `<select>` boxes** while being both both accessible and mobile friendly.

## 0: Install and inclusion
 
```
npm install selectybox
```

FormatChange is CommonJS (`require()`) friendly, using `module.exports` by default -- setting `Selectybox` as a global object only as last resort.

Selectybox comes with a nifty jQuery/Zepto plugin factory (See below).

## 1. Basic Usage

```js
var Selectybox = require('selectybox');
```
...or if you loaded the script with a `<script>` tag:

```js
var Selectybox = window.Selectybox;
```

Running the conctructor creates the necessary elements and event handlers and returns a Selectybox widget instance.

```js
var selectElm = document.getElementsByTagName('select')[0];

var widget = Selectybox( selectElm , options ); // using `new` is optional
```

## 2. Options

Selectybox accepts the following options (showing default values):

```js
var options = {
      templ: '<span class="selecty"><span class="selecty-button"/></span>',
      getButton: function () { return this.container.firstChild; },
      focusClass: 'focused',
      disabledClass: 'disabled',
      emptyVal: '\u00a0 \u00a0 \u00a0',
      text: function (txt) { return txt; }, // <-- it's OK to add HTML markup
      selectCSS: {
          // set necessary styles
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // unset existing styles
          top: 'auto',
          right: 'auto',
          margin: 0,
          padding: 0,
          border: 0
        },
    };
```

* **templ** - is the HTML describing the `widget.container` element. The template also contains the `widget.button` element (holding the displayed text value).
* **getButton** - describes where the `widget.button` is within the `widget.container` template.
* **focusClass** -- additional class-name for the `widget.container` while the `<select>` is focused.
* **disabledClass** -- additional class-name for the `widget.container` while the `<select>` is disabled.
* **emptyVal** -- String to display instead of an empty string inside `widget.button`
* **text** -- function that allows dynamic modification of the displayed text.
* **selectCSS** -- CSS properties to apply to the `<select>` while the widget is active.

**NOTE:** The option defaults can be changed via `Selectybox.prototype.*`


## 3. Widget references

The widget object contains references to its key elements:

```js
widget.select;    // the original <select> element
widget.button;    // proxy element that contains the display text
widget.container; // wrapper around both `widget.select` and `widget.button`
```

...and a reverse-lookup for `<select>`'s widget is also possible:

```js
Selectybox.getWidget( selectElm )  ===  widget;  // true
```

## 4. Methods

If the `<select>`'s value, or disabled state has been updated (and no `change` event triggered), then you can silently refresh the widget by running:

```js
widget.refresh();
```

To silently update the `<select>`'s value (and `refresh` the widget's display text) without triggering a DOM change event run:

```js
widget.val( 'Apple' );
```

To change the `<select>`'s `disabled` property, and set the widget's disabledClass accordingly:

```js
widget.disable();      // disable
widget.disable( false ); // enable
```

To remove the injected elements, inline styling an event handlers, simply do

```js
widget.destroy();
```

You can run `Selectybox()` again for the same `<select>` (e.g. with new options) returns the existing widget, but with the new options applied and new `container` and `button` elements in place. (This uses the `destroy` method internally.)

```js
Selectybox( selectElm, newOptions )  ===  widget;  // true
```


# jQuery/Zepto Plugin Factory

Selectybox comes with a small jQuery plugin factory Class method called `Selectybox.jQueryPlugin()`.

If `window.jQuery` is detected, the following command is automatically run:

```js
Selectybox.jQueryPlugin( window.jQuery );
```

(The factory can be run manually against one or more instances of jQuery/Zepto)

...

Invoking the plugin is easy, and its options are fed straight into the Selectybox constructor:

```js
var $mySelect = $('select:first');

var widgetContainer = $mySelect.selectybox( options );
```

The plugin provides jQuery UI like access to the widget methods:

```js
$mySelect.selectybox('refresh');      // .refresh()
$mySelect.selectybox('val', 'Apple'); // .val('Apple')
$mySelect.selectybox('destroy');      // .destroy()
```

Access to the raw `widget` is provided so:

```js
var widget = $mySelect.selectybox('widget');
```
