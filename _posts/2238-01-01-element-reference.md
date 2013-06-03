--- 
heading: Element reference
category: api
---

SVG elements can be created with the shortcut methods listed below. See the [Creation](/api/creation/) section for information on how to use them.

Each method is linked to the element's page on [MDN's element reference][mdn-svg-el]. For further informatio, see [MDN's attribute reference][mdn-svg-attr] and the [Pablo Resources][resources] section.

<style class="multi-column">
	style.multi-column + ul {
		column-count: 2;
		-moz-column-count: 2;
		-webkit-column-count: 2;
		-o-column-count: 2;
		-ms-column-count: 2;
	}
</style>

* [a()][a]
* [altGlyph()][altGlyph]
* [altGlyphDef()][altGlyphDef]
* [altGlyphItem()][altGlyphItem]
* [animate()][animate]
* [animateColor()][animateColor]
* [animateMotion()][animateMotion]
* [animateTransform()][animateTransform]
* [circle()][circle]
* [clipPath()][clipPath]
* [colorProfile()][color-profile]
* [cursor()][cursor]
* [defs()][defs]
* [desc()][desc]
* [ellipse()][ellipse]
* [feBlend()][feBlend]
* [feColorMatrix()][feColorMatrix]
* [feComponentTransfer()][feComponentTransfer]
* [feComposite()][feComposite]
* [feConvolveMatrix()][feConvolveMatrix]
* [feDiffuseLighting()][feDiffuseLighting]
* [feDisplacementMap()][feDisplacementMap]
* [feDistantLight()][feDistantLight]
* [feFlood()][feFlood]
* [feFuncA()][feFuncA]
* [feFuncB()][feFuncB]
* [feFuncG()][feFuncG]
* [feFuncR()][feFuncR]
* [feGaussianBlur()][feGaussianBlur]
* [feImage()][feImage]
* [feMerge()][feMerge]
* [feMergeNode()][feMergeNode]
* [feMorphology()][feMorphology]
* [feOffset()][feOffset]
* [fePointLight()][fePointLight]
* [feSpecularLighting()][feSpecularLighting]
* [feSpotLight()][feSpotLight]
* [feTile()][feTile]
* [feTurbulence()][feTurbulence]
* [filter()][filter]
* [font()][font]
* [fontFace()][font-face]
* [fontFaceFormat()][font-face-format]
* [fontFaceName()][font-face-name]
* [fontFaceSrc()][font-face-src]
* [fontFaceUri()][font-face-uri]
* [foreignObject()][foreignObject]
* [g()][g]
* [glyph()][glyph]
* [glyphRef()][glyphRef]
* [hkern()][hkern]
* [image()][image]
* [line()][line]
* [linearGradient()][linearGradient]
* [marker()][marker]
* [mask()][mask]
* [metadata()][metadata]
* [missingGlyph()][missing-glyph]
* [mpath()][mpath]
* [path()][path]
* [pattern()][pattern]
* [polygon()][polygon]
* [polyline()][polyline]
* [radialGradient()][radialGradient]
* [rect()][rect]
* [script()][script]
* [set()][set]
* [stop()][stop]
* [style()][style]
* [svg()][svg]
* [switch()][switch]
* [symbol()][symbol]
* [text()][text]
* [textPath()][textPath]
* [title()][title]
* [tref()][tref]
* [tspan()][tspan]
* [use()][use]
* [view()][view]
* [vkern()][vkern]


## Note: Creating SVG with markup

Pablo does not (currently) support the creation of SVG elements by passing in a string of SVG markup. It may support this in future.

The reason for its omission is that SVG elements do not have an equivalent property to HTML elements' `innerHTML`. The [innerSVG](http://code.google.com/p/innersvg/) library should work as a polyfill replacement.


[resources]: http://pablojs.com/resources/#resources
[mdn-svg-el]: https://developer.mozilla.org/en/SVG/Element
[mdn-svg-attr]: https://developer.mozilla.org/en/SVG/Attribute

[a]: https://developer.mozilla.org/en-US/docs/SVG/Element/a
[altGlyph]: https://developer.mozilla.org/en-US/docs/SVG/Element/altGlyph
[altGlyphDef]: https://developer.mozilla.org/en-US/docs/SVG/Element/altGlyphDef
[altGlyphItem]: https://developer.mozilla.org/en-US/docs/SVG/Element/altGlyphItem
[animate]: https://developer.mozilla.org/en-US/docs/SVG/Element/animate
[animateColor]: https://developer.mozilla.org/en-US/docs/SVG/Element/animateColor
[animateMotion]: https://developer.mozilla.org/en-US/docs/SVG/Element/animateMotion
[animateTransform]: https://developer.mozilla.org/en-US/docs/SVG/Element/animateTransform
[circle]: https://developer.mozilla.org/en-US/docs/SVG/Element/circle
[clipPath]: https://developer.mozilla.org/en-US/docs/SVG/Element/clipPath
[color-profile]: https://developer.mozilla.org/en-US/docs/SVG/Element/color-profile
[cursor]: https://developer.mozilla.org/en-US/docs/SVG/Element/cursor
[defs]: https://developer.mozilla.org/en-US/docs/SVG/Element/defs
[desc]: https://developer.mozilla.org/en-US/docs/SVG/Element/desc
[ellipse]: https://developer.mozilla.org/en-US/docs/SVG/Element/ellipse
[feBlend]: https://developer.mozilla.org/en-US/docs/SVG/Element/feBlend
[feColorMatrix]: https://developer.mozilla.org/en-US/docs/SVG/Element/feColorMatrix
[feComponentTransfer]: https://developer.mozilla.org/en-US/docs/SVG/Element/feComponentTransfer
[feComposite]: https://developer.mozilla.org/en-US/docs/SVG/Element/feComposite
[feConvolveMatrix]: https://developer.mozilla.org/en-US/docs/SVG/Element/feConvolveMatrix
[feDiffuseLighting]: https://developer.mozilla.org/en-US/docs/SVG/Element/feDiffuseLighting
[feDisplacementMap]: https://developer.mozilla.org/en-US/docs/SVG/Element/feDisplacementMap
[feDistantLight]: https://developer.mozilla.org/en-US/docs/SVG/Element/feDistantLight
[feFlood]: https://developer.mozilla.org/en-US/docs/SVG/Element/feFlood
[feFuncA]: https://developer.mozilla.org/en-US/docs/SVG/Element/feFuncA
[feFuncB]: https://developer.mozilla.org/en-US/docs/SVG/Element/feFuncB
[feFuncG]: https://developer.mozilla.org/en-US/docs/SVG/Element/feFuncG
[feFuncR]: https://developer.mozilla.org/en-US/docs/SVG/Element/feFuncR
[feGaussianBlur]: https://developer.mozilla.org/en-US/docs/SVG/Element/feGaussianBlur
[feImage]: https://developer.mozilla.org/en-US/docs/SVG/Element/feImage
[feMerge]: https://developer.mozilla.org/en-US/docs/SVG/Element/feMerge
[feMergeNode]: https://developer.mozilla.org/en-US/docs/SVG/Element/feMergeNode
[feMorphology]: https://developer.mozilla.org/en-US/docs/SVG/Element/feMorphology
[feOffset]: https://developer.mozilla.org/en-US/docs/SVG/Element/feOffset
[fePointLight]: https://developer.mozilla.org/en-US/docs/SVG/Element/fePointLight
[feSpecularLighting]: https://developer.mozilla.org/en-US/docs/SVG/Element/feSpecularLighting
[feSpotLight]: https://developer.mozilla.org/en-US/docs/SVG/Element/feSpotLight
[feTile]: https://developer.mozilla.org/en-US/docs/SVG/Element/feTile
[feTurbulence]: https://developer.mozilla.org/en-US/docs/SVG/Element/feTurbulence
[filter]: https://developer.mozilla.org/en-US/docs/SVG/Element/filter
[font]: https://developer.mozilla.org/en-US/docs/SVG/Element/font
[font-face]: https://developer.mozilla.org/en-US/docs/SVG/Element/font-face
[font-face-format]: https://developer.mozilla.org/en-US/docs/SVG/Element/font-face-format
[font-face-name]: https://developer.mozilla.org/en-US/docs/SVG/Element/font-face-name
[font-face-src]: https://developer.mozilla.org/en-US/docs/SVG/Element/font-face-src
[font-face-uri]: https://developer.mozilla.org/en-US/docs/SVG/Element/font-face-uri
[foreignObject]: https://developer.mozilla.org/en-US/docs/SVG/Element/foreignObject
[g]: https://developer.mozilla.org/en-US/docs/SVG/Element/g
[glyph]: https://developer.mozilla.org/en-US/docs/SVG/Element/glyph
[glyphRef]: https://developer.mozilla.org/en-US/docs/SVG/Element/glyphRef
[hkern]: https://developer.mozilla.org/en-US/docs/SVG/Element/hkern
[image]: https://developer.mozilla.org/en-US/docs/SVG/Element/image
[line]: https://developer.mozilla.org/en-US/docs/SVG/Element/line
[linearGradient]: https://developer.mozilla.org/en-US/docs/SVG/Element/linearGradient
[marker]: https://developer.mozilla.org/en-US/docs/SVG/Element/marker
[mask]: https://developer.mozilla.org/en-US/docs/SVG/Element/mask
[metadata]: https://developer.mozilla.org/en-US/docs/SVG/Element/metadata
[missing-glyph]: https://developer.mozilla.org/en-US/docs/SVG/Element/missing-glyph
[mpath]: https://developer.mozilla.org/en-US/docs/SVG/Element/mpath
[path]: https://developer.mozilla.org/en-US/docs/SVG/Element/path
[pattern]: https://developer.mozilla.org/en-US/docs/SVG/Element/pattern
[polygon]: https://developer.mozilla.org/en-US/docs/SVG/Element/polygon
[polyline]: https://developer.mozilla.org/en-US/docs/SVG/Element/polyline
[radialGradient]: https://developer.mozilla.org/en-US/docs/SVG/Element/radialGradient
[rect]: https://developer.mozilla.org/en-US/docs/SVG/Element/rect
[script]: https://developer.mozilla.org/en-US/docs/SVG/Element/script
[set]: https://developer.mozilla.org/en-US/docs/SVG/Element/set
[stop]: https://developer.mozilla.org/en-US/docs/SVG/Element/stop
[style]: https://developer.mozilla.org/en-US/docs/SVG/Element/style
[svg]: https://developer.mozilla.org/en-US/docs/SVG/Element/svg
[switch]: https://developer.mozilla.org/en-US/docs/SVG/Element/switch
[symbol]: https://developer.mozilla.org/en-US/docs/SVG/Element/symbol
[text]: https://developer.mozilla.org/en-US/docs/SVG/Element/text
[textPath]: https://developer.mozilla.org/en-US/docs/SVG/Element/textPath
[title]: https://developer.mozilla.org/en-US/docs/SVG/Element/title
[tref]: https://developer.mozilla.org/en-US/docs/SVG/Element/tref
[tspan]: https://developer.mozilla.org/en-US/docs/SVG/Element/tspan
[use]: https://developer.mozilla.org/en-US/docs/SVG/Element/use
[view]: https://developer.mozilla.org/en-US/docs/SVG/Element/view
[vkern]: https://developer.mozilla.org/en-US/docs/SVG/Element/vkern
