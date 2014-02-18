# CDL

It's a Website for the visualization and content navigation based on [d3.js](http://d3js.org/) library and jekyll static websites generator. 

All data it's the The general flow of the process is(import from XML from [The Brain (zipfile)](), parse, sanitize and export to JSON) 
with the the grunt task runner, previously publish new data information.

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Requirements

- [Ruby 1.9+](https://www.ruby-lang.org)

You can check nthe version of ruby with:

	$ ruby -v
    
if the ruby version it's less of 1.9, we recommend to update to the lastest version.

- [Node.js](http://nodejs.org)
- [Bundler](http://bundler.io/)

To install bundler, you could execute this command:

	$ gem install bundler
    
please check the [bundler site](http://bundler.io/) to performance the update of the ruby enviroment.

- [Yeoman](http://yeoman.io)

To install yeoman:

	$ npm install -g yo
    
## Installation

To get started you can, clone the project:
	
    $ git@github.com:Gizra/CDL.git

To fetch required dependencies, run the following command from the root of
this repository:

	$ npm install; bower install

Copy source files (XML and images files from the zip file of the "The Brain Application"
in the folder brain.

and to run the website locally you can use:

	$ grunt serve

## Credits

* [Gizra](http://www.gizra.com/) 