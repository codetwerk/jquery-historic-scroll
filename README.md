# jquery-historic-scroll

This is a jQuery plugin used to setup HTML5 History handling for elements that you define in the DOM.

## Setup
You can use the defaults and just call **$.historic()** with elements containing an inline attribute of **"data-history"**.

### Options
**callback**: the default is defined to read the URL on load and then animate scroll down to the element on the page that matches the query string in the URL.

**speed**: how fast the scroll should be on load. (default: 800ms)

**attribute**: the string to use for defining the URL query string to be appended and the element to check for on scroll when it is fully in the DOM. (default: data-history)

**cssSelector**: the elements to use in the DOM (default: [data-history])

### Using Options
$.historic({
  callback: whatever,
  speed: realFast,
  attribute: 'data-awesomesauce',
  cssSelector: '.thangy-thangs'
});
