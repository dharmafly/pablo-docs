--- 
heading: Build Process
category: misc
---

If you are changing the core Pablo library, you can build your own minified version.

Currently, the build process handles code linting and minification. In the future, it may be used to create custom, modular versions of Pablo. [Node](http://nodejs.org/) and [Grunt](http://gruntjs.com) is required:

## Install Grunt

    $ npm uninstall -g grunt # for old Grunt users
    $ npm install -g grunt-cli

## Build the library

    $ git clone git@github.com:dharmafly/pablo.git
    $ cd pablo/build
    $ npm install
    $ grunt

A copy of `pablo.min.js` and its [source map][sourcemap] file will be saved in the `build` directory.

[sourcemap]: http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
