# jQuery.quicktip #

Inspired by: Owain Lewis (www.Owainlewis.com)
Author: Artūrs Mekšs
This is small, simple and easy to use jQuery plugin for browser's default tooltip text replacement.
Tooltip text can be defined as title attribute of parent element or as nested element (e.g. span)
for more complex tip content, which may has HTML/CSS formatting

## Cross browser support ##

Cross browser support:
* FireFox 3.6 or later
* Google Chrome 9 or later
* Apple Safari 5 or later
* Internet Explorer 7 or later (not tested, but may work even on IE6)

## Dependencies ##

jQuery 1.4.3 or later

## How to use? ##

1) Ensure that jQuery is available into your project
2) Include quicktip's js and css files into your project
3) Call $(selector).quicktip(options) once somewhere on page load
Thats it, for every element which match selector defined in third step quicktip will be bind on the fly.
And no matter does this element exist on page load or will appear later.

### Example ###

```javascript
$(function(){
  $(".tooltip").quicktip();
});
```

```html
...
<span class="tooltip" title="my custom tooltip">
  mouse over here
</span>
...
```

## Options ##

* speed - tooltip display timeout in ms (default: 250)
* xOffset - tooltip X offset from mouse pointer in px (default: 10)
* yOffset - tooltip Y offset from mouse pointer in px (default: 10)
* className - tooltip content selector if it defined as nested element (default: 'title')
* altTip - alternate value if content of tooltip is empty (default: '-')
* css - additional style for tooltip box (default: {})
* cursor - mouse pointer style when mouseover DOM element containing tip (default: 'default')

## Licence ##

The MIT License

Copyright (c) 2011 Artūrs Mekšs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
