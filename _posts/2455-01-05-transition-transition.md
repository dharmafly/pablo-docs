---
path: api/transition
heading: transition(transition)
category: api_transition
---


Transition properties can be passed in an object to represent the transition.

    var svg = Pablo(demoElement).svg({width:'100%', height:160}),
        circles = Pablo.circle().duplicate(2).attr({
        r:  50,
        cx: function(el,i){return i * 140 + 80},
        cy: 80,
        stroke: 'lightblue',
        fill: 'darkblue',
        cursor: 'pointer'
    }).appendTo(svg);

    circles.transition({
        name: 'stroke-width',
        from: 0,
        to: 60,
        dur: 3000,
        timing: 'ease-out',
        end: function(){alert('Done')}
    });

The object passed to `transition()` has similar semantics to the attributes of SVG's native [`<animateTransform>` element](https://developer.mozilla.org/docs/SVG/Element/animateTransform) and [CSS transitions](https://developer.mozilla.org/docs/Web/CSS/transition). Only the `name` property is required.

## `name`

Required). The name of the CSS property to transition.

## `from`

The value of the CSS property at the start of the transition. If omitted, the transition will start with the current value of the property on the elements.

## `to`

The value of the CSS property at the end of the transition. If omitted, the transition will not start immediately; instead, it will take place whenever `css()` is used to change the CSS property's value on the elements.

## `dur`

The duration of the transition. If the value is a number, then its unit will be milliseconds. To specify other units, use a string, e.g. `'5s'` for 5 seconds.

## `timing`

The timing function to be used for the transition. This can be a named function, like `ease-out` or a timing matrix.

## `delay`

The delay before the transition starts. As with `dur`, this can be a number (in milliseconds) or a string with a unit.

## `end`

A callback that fires when each transitioned CSS property completes. The callback is passed a native Transition event object, with information about the transition.


## Transitioning transforms

When `transition()` is passed the property `transform`, it will run the passed value through `transformCss()`, allowing complex transforms to be made.

    var container = Pablo(demoElement),
        svg = container.svg({width:'100%', height:260}),
        shape = svg.rect({
            width:  50,
            height: 50,
            stroke: 'lightblue',
            'stroke-width': 25,
            fill: 'darkblue',
            cursor: 'pointer'
        });

    // Transition the CSS `transform` property, over 1000ms
    shape.transition({
        name: 'transform',
        from: {translate: ['300px', '30px']},
        to: [
            {translate: ['60px', '80px']},
            {rotate:'80deg'},
            {skewX: '30deg'}
        ],
        dur: 600,
        timing: 'ease-in-out',
        end: function(){
            shape.transformCss([
                {translate: ['350px', '240px']},
                {rotate: '180deg'},
                {skewX: '180deg'}
            ]);
        }
    });

