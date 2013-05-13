--- 
category: overview
heading: Build Process
---

If you are editing the core library, you can build your own minified version of the library.

Currently, the build process handles code linting and minification. In the future, the build process may be used to create custom, module builds of Pablo. [node](http://nodejs.org/) and [Grunt](http://gruntjs.com) is required:

## Install grunt

    $ npm uninstall -g grunt # for old grunt users
    $ npm install -g grunt-cli

## Build

    $ git clone git@github.com:dharmafly/pablo.git
    $ cd pablo/build
    $ npm install
    $ grunt

A copy of `pablo.min.js` will be saved in the `build/dist` directory.
