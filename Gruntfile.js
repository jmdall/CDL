// Generated on 2013-11-17 using generator-jekyllrb 0.4.1
'use strict';

// Require libraries for the CDL task.
var _ = require('underscore');
var he = require('he');

// Directory reference:
//   css: css
//   compass: _scss
//   javascript: js
//   images: img
//   fonts: fonts

module.exports = function (grunt) {
  // Show elapsed time after tasks run.
  require('time-grunt')(grunt);
  // Load all Grunt tasks.
  require('load-grunt-tasks')(grunt);

  // Register npm task.
  grunt.loadNpmTasks('grunt-convert');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.initConfig({
    // Configurable paths.
    yeoman: {
      app: 'app',
      dist: 'dist',
      brain: 'brain',
      template: 'template'
    },
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/_scss/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer:server']
      },
      autoprefixer: {
        files: ['<%= yeoman.app %>/css/**/*.css'],
        tasks: ['copy:stageCss', 'autoprefixer:server']
      },
      jekyll: {
        files: [
          '<%= yeoman.app %>/**/*.index.html',
          '_config.yml',
          '_config.build.yml',
          '!<%= yeoman.app %>/_bower_components',
          '<%= yeoman.template %>/**/*',
          '<%= yeoman.template %>/_layouts/*'
        ],
        tasks: [
          'cdlPrepare',
          'convert:json2yaml',
          'generate',
          'copy:cdl',
          'clean:brain',
          'jekyll:server'
        ]
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.html',
          '.tmp/css/**/*.css',
          '{.tmp,<%= yeoman.app %>}/<%= js %>/**/*.js',
          '<%= yeoman.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '.jekyll',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: [
            '<%= yeoman.dist %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            '.jekyll',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!<%= yeoman.dist %>/.git*',
            '<%= yeoman.app %>/pages',
            '<%= yeoman.app %>/data'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll',
        '<%= yeoman.app %>/pages',
        '<%= yeoman.app %>/data'
      ],
      brain: [
        '<%= yeoman.app %>/data/.tmp'
      ]
    },
    compass: {
      options: {
        // If you're using global Sass gems, require them here.
        // require: ['singularity', 'jacket'],
        bundleExec: true,
        sassDir: '<%= yeoman.app %>/_scss',
        cssDir: '.tmp/css',
        imagesDir: '<%= yeoman.app %>/img',
        javascriptsDir: '<%= yeoman.app %>/js',
        fontsDir: '<%= yeoman.app %>/fonts',
        importPath: '<%= yeoman.app %>/_bower_components',
        httpFontsPath: '/fonts',
        relativeAssets: false,
        httpImagesPath: '/img',
        httpGeneratedImagesPath: '/img/generated',
        outputStyle: 'expanded',
        raw: 'extensions_dir = "<%= yeoman.app %>/_bower_components"\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/img/generated'
        }
      },
      server: {
        options: {
          debugInfo: true,
          generatedImagesDir: '.tmp/img/generated'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/css',
          src: '**/*.css',
          dest: '<%= yeoman.dist %>/css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '.tmp/css',
          src: '**/*.css',
          dest: '.tmp/css'
        }]
      }
    },
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config.build.yml',
        src: '<%= yeoman.app %>'
      },
      dist: {
        options: {
          dest: '<%= yeoman.dist %>'
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    // UseminPrepare will only scan a single page for usemin blocks. If you
    // use usemin blocks that aren't in index.html, create a usemin manifest
    // page (hackery!) and point this task there.
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: ['<%= yeoman.dist %>/index.html']
    },
    usemin: {
      options: {
        basedir: '<%= yeoman.dist %>',
        dirs: ['<%= yeoman.dist %>/**/*']
      },
      html: ['<%= yeoman.dist %>/*.html'],
      css: ['<%= yeoman.dist %>/css/**/*.css']
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {},
    // Usemin adds files to cssmin
    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.{jpg,jpeg,png}',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          src: [
            // Jekyll processes and moves HTML and text files
            // Usemin moves CSS and javascript inside of Usemin blocks
            // Copy moves asset files and directories
            'images/**/*',
            'fonts/**/*',
            // Like Jekyll, exclude files & folders prefixed with an underscore
            '!**/_*{,/**}',
            // Explicitly add any files your site needs for distribution here
            //'_bower_components/jquery/jquery.js',
            //'favicon.ico',
            //'apple-touch*.png'
            'data/**/*',
            'pages/**/*.{jpg,png,gif,jpeg,webp,tiff,mp3,wav,avi,mp4}'
          ],
          dest: '<%= yeoman.dist %>'
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          src: [
            '_bower_components/q/q.js',
            '_bower_components/d3/d3.min.js',
            '_bower_components/underscore/underscore-min.js',
            'js/cdl.js',
            '_bower_components/jquery/jquery.min.js',
            '_bower_components/jquery-fittext.js/jquery.fittext.js',
            '_bower_components/bootstrap-sass/dist/js/bootstrap.min.js',
            'js/page.js'
          ],
          dest: '<%= yeoman.dist %>'
        }]
      },
      // Copy CSS into .tmp directory for Autoprefixer processing
      stageCss: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/css',
          src: '**/*.css',
          dest: '.tmp/css'
        }]
      },
      cssNotUsemin: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.tmp',
          src: '**/*.css',
          dest: '<%= yeoman.dist %>'
        }]
      },
      cdl: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'brain/files',
          src: '**/*.{jpg,png,gif,jpeg,webp,tiff,mp3,wav,avi,mp4}',
          dest: '<%= yeoman.app %>/pages'
        }]
      }
    },
    rev: {
      options: {
        length: 4
      },
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/js/**/*.js',
            '<%= yeoman.dist %>/css/**/*.css',
            '<%= yeoman.dist %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%= yeoman.dist %>/fonts/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/js/**/*.js',
        'test/spec/**/*.js',
        '!<%= yeoman.app %>/js/vendor/**/*'
      ]
    },
    csscss: {
      options: {
        bundleExec: true,
        minMatch: 2,
        ignoreSassMixins: false,
        compass: true,
        colorize: true,
        shorthand: false,
        verbose: true
      },
      check: {
        src: ['<%= yeoman.app %>/css/**/*.css',
          '<%= yeoman.app %>/_scss/**/*.scss']
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: [
          '<%= yeoman.app %>}/css/**/*.css',
          '<%= yeoman.app %>}/_scss/**/*.scss'
        ]
      }
    },
    concurrent: {
      server: [
        'compass:server',
        'copy:stageCss',
        'jekyll:server'
      ],
      dist: [
        'compass:dist',
        'copy:dist'
      ]
    },
    convert: {
      xml2json: {
        options: {
          explicitArray: false
        },
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.brain %>/',
            src: ['**/*.xml'],
            dest: '<%= yeoman.app %>/data/',
            ext: '.json'
          }
        ]
      },
      json2yaml: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/data/.tmp/',
            src: ['**/*.json'],
            dest: '<%= yeoman.app %>/data/.tmp/',
            ext: '.yml'
          }
        ]
      }
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    },
    'CDL': {
      src: '<%= yeoman.app %>/data/brain.json',
      dest: '<%= yeoman.app %>/data/tree.json',
      tmp: '<%= yeoman.app %>/data/.tmp/'
    },
    'generate': {
      src: '<%= yeoman.app %>/data/tree.json',
      dest: '<%= yeoman.app %>/pages/',
      template: 'pageFull'
    }
  });

  grunt.registerTask('CDL', function() {
    var src = {},
        dest = {};

    // Data Information.
    var nodesIndexed = [],
      nodes = {},
      nodesLinks = [],
      nodesEntries = [],
      nodesAttachments = [],
      firstNode,
      tree = {};

    src.path = grunt.config.get('CDL.src');
    dest.path = grunt.config.get('CDL.dest');

    /**
     * Prepare collection of nodes indexed, that will use to parse and generate the tree.
     */
    function prepareData() {
      // Prepare raw data in thoughts, and "guid" of the root node.
      firstNode =  src.data.BrainData.Source.homeThoughtGuid;
      nodes = src.data.BrainData.Thoughts.Thought;
      nodesLinks = src.data.BrainData.Links.Link;
      nodesEntries = src.data.BrainData.Entries.Entry;
      nodesAttachments = src.data.BrainData.Attachments.Attachment;

      // Remove properties not necessary data from Node and links.
      _.each(nodes, function(thought, index) {
        nodes[index] = _.pick(thought, 'guid', 'name');
      });
      _.each(nodesLinks, function(link, index) {
        nodesLinks[index] = _.pick(link, 'guid', 'idA', 'idB', 'dir', 'linkTypeID', 'isBackward');
      });
      _.each(nodesEntries, function(entry, index) {
        nodesEntries[index] = _.pick(entry, 'guid', 'EntryObjects', 'body', 'format');
      });
      _.each(nodesAttachments, function(item, index) {
        nodesAttachments[index] = _.omit(item, 'creationDateTime', 'modificationDateTime');
      });

      // Index the nodes of thought by guid.
      nodesIndexed = _.indexBy(nodes, 'guid');
      // Index entries.
      _.each(nodesEntries, function(entry) {
        entry.objectID = entry.EntryObjects.EntryObject.objectID;
      });
      nodesEntries = _.indexBy(nodesEntries, 'objectID');
      // Index attachments.
      nodesAttachments = _.groupBy(nodesAttachments, function(item) {
        return item.objectID;
      });

      // Prepare the root of the tree.
      nodes = _.without(nodes, nodesIndexed[firstNode]);
      nodes.unshift(nodesIndexed[firstNode]);

      // Refresh nodesIndexed.
      nodesIndexed = _.indexBy(nodes, 'guid');
    }

    /**
     * Get first node of the array order by node.chronologicaltId.
     *
     * @param nodes
     * @returns {*}
     */
    function getFirst(nodes) {
      return _.min(nodes, function(node) {
        return node.chronologicalId;
      });
    }

    /**
     * From an array of nodes node.type: 'chronological', Reorder these in order chronological. Where the children nodes are
     * the next event in order, this repeat for each node.
     *
     * param nodes
     * @returns {*}
     */
    function reorderChronological(nodes) {
      var node;

      // Get the first node and an array without the node.
      node = getFirst(nodes);
      nodes = _.without(nodes, node);
      if (nodes.length > 0) {
        node.children = _.union(node.children, [reorderChronological(nodes)]);
      }

      return node;
    }

     /**
     * Set the content data and properties according the type of node.
     *
     * @param node
     */
    function setNodeContent(node) {
      var regexChronological = /:\d+:/,
          regexBastard = /:_:/,
          regexId = /:/,
          regexContent = /(&lt;body&gt;)((\n.*)*)(&lt;\/body&gt;)/,
          regexCleaner,
          rawName;

      // Init regex for content.
      regexCleaner = [
        {
          regex: /class=".*?"+/,
          phrase: ''
        },
        {
          regex: /style=".*?"+/,
          phrase: ''
        },
        {
          regex: /"/,
          phrase: '&quot;'
        }
      ];

       /**
        * Clean the content extracted with an array of regular expressions and phrases.
        *
        * @param data
        * @param regex
        * @param phrase
        *
        * @returns {string}
        */
      function cleanContent(data, regex, phrase) {
        data = data.replace(regex, phrase);
        if (data.match(regex)) {
          data = cleanContent(data, regex, phrase);
        }
        return data;
      }

      // Add "node.name" to escape HTML entities in YAML.
      rawName = he.decode(node.name);
      node.name = rawName;

      // Add entry content to the node.
      node.data = '';
      if (nodesEntries[node.guid] && nodesEntries[node.guid].body) {
        // Extract the content from body.
        node.data = he.decode(nodesEntries[node.guid].body.match(regexContent)[2]);

        // Clean content.
        regexCleaner.forEach(function(element) {
          node.data = cleanContent(node.data, element.regex, element.phrase);
        });
      }

      // Add attachments.
      node.attachments = [];
      if (nodesAttachments[node.guid]) {
        node.attachments = nodesAttachments[node.guid];
      }

      // Categorize child.
      if (node.name.match(regexChronological)) {
        // Chronological childs.
        node.type = 'chronological';
        node.chronologicalId = rawName.split(regexId)[1];
        node.chronologicalName = rawName.split(regexChronological)[1].trim();
      }
      else if (node.name.match(regexBastard)) {
        // Bastard childs.
        node.type = 'bastard';
        node.bastardName = rawName.split(regexBastard)[1].trim();
      }
      else {
        node.type = 'default';
      }
    }

    /**
     * Reorder the childs properties according dir: (Brain direction), type: chronological, bastard and default.
     * Return a collection of childs categorized and organized.
     *
     * @param childs
     * @param parent
     * @returns {*}
     */
    function parseChilds(childs, parent) {
      var childsOrdered = [],
        chronologicalChilds;


      // Parse child.
      _.each(childs, function(child) {

        // Set node information of child node.
        child.node = {};

        child.node.children = [];
        if (child.dir === '1') {
          child.node = nodesIndexed[child.idB];
        }
        else if (child.dir === '2') {
          child.node = nodesIndexed[child.idA];
        }

        // Parse the content and set the classification of the node.
        setNodeContent(child.node, parent);

        // Set parent guid.
        child.node.parent = parent;
        child.node.hasChronologicalChildren = false;

        // Look up for more generations of childrens.
        child.node.children = getChilds(child.node);

        // Check if have chronological children, and set it.
        if (child.node.type !== 'chronological' && _.where(child.node.children, {type: 'chronological'}).length) {
          child.node.hasChronologicalChildren = true;
        }

        childsOrdered.push(child.node);
      });

      // @todo: check formation of chronological nodes, with sibling not chronological. Issue #21
      chronologicalChilds = _.where(childsOrdered, {type: 'chronological'});

      if (chronologicalChilds.length) {
        // Reorder chronological childs.
        childsOrdered = _.union(_.difference(childsOrdered, chronologicalChilds),  reorderChronological(chronologicalChilds));
      }

      // Join childs classified.
      return childsOrdered;
    }


    /**
     * Get childs of the node.
     *
     * @param node
     * @returns {*}
     */
    function getChilds(node) {
      var childsOrdered = [],
          childs = [];

      childs = _.union( _.where(nodesLinks, {idA: node.guid, dir: '1'}), _.where(nodesLinks, {idB: node.guid, dir: '2'}) );

      if (childs.length) {
        childsOrdered = parseChilds(childs, node.guid);
      }

      return childsOrdered;
    }


     /**
     * Parse JSON to structure d3 layout.
     * Create json d3 tree layout structure.
     * https://github.com/mbostock/d3/wiki/Tree-Layout
     *
     * @returns {*}
     */
    function generateTreeData() {

      prepareData();

      // Look up the node and position into the array.
      tree = nodesIndexed[firstNode];
      tree.children = [];

      tree.children = getChilds(tree);

      return tree;
    }

    // Prepare JSON.
    if (grunt.file.exists(src.path)) {
      src.data = grunt.file.readJSON(src.path);
      grunt.log.ok('Loaded source file: ' + src.path);
    }
    else {
      grunt.fail.fatal('File ' + src.path + ' does not exist.');
    }

    // Generate data.
    dest.data = generateTreeData();

    // Save the JSON into a new file.
    grunt.file.write(dest.path, JSON.stringify(dest.data, null, ' '));
    grunt.log.ok('File: ' + dest.path + ' generated.');
  });

  grunt.registerTask('cdlPrepare', function() {
    var tree, treePrepared;

    /**
     * Helper to return a string list of siblings of a specific chronological node.
     *
     * @param node
     * @returns {*}
     */
    function getSiblings(node) {
      var siblings = [];

      /**
       * Filter siblings node from the parent of the first chronological node.
       *
       * @param {*}
       *  Nodes object.
       * @param string
       *  Parent node.guid.
       */
      function filterSiblingsByParent(nodes, parentGuid) {
        _.each(nodes, function(node) {
            // Check for children.
          filterSiblingsByParent(_.where(node.children, {type: 'chronological'}), parentGuid);
        });

        siblings = _.union(siblings, _.where(nodes, {parent: parentGuid}));
      }

      // Get chronological siblings.
      filterSiblingsByParent(_.where(node.children, {type: 'chronological'}), node.guid);


      // Pick the necessary properties for siblings.
      _.each(siblings, function(sibling, index) {
        siblings[index] = _.pick(sibling, 'guid', 'chronologicalId', 'chronologicalName', 'data', 'attachments');
      });

      return siblings.reverse();
    }

    /**
     * Convert the attachments object in a simple format to handle it in the YAML template.
     *
     * @param attachments
     * @returns {*}
     */
    function convertAttachments(attachments) {
      var item;
      var regexYoutube = /http:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)(\w*)(&(amp;)?[\w\?=]*)?/;
      var attachmentsParsed = {
        images: [],
        media: [],
        pages: [],
        youtube: []
      };

      _.each(attachments, function(attachment) {
        item = {
          name: attachment.name,
          src: attachment.location
        };

        // Attachments type file (media or images ).
        if (attachment.attachmentType === '1') {
          if (attachment.format === '.jpg' || attachment.format === '.png') {
            // Sanitize url.
            item.src = item.src.replace(/\\/, '/');
            attachmentsParsed.images.push(item);
          }
          else if (attachment.format === '.mp3') {
            attachmentsParsed.media.push(item);
          }
        }
        // Attachments type url (regular links or youtube links).
        else if (attachment.attachmentType === '3' ) {
          // Check if the link is a youtube's link and prepare properties with video id.
          if (regexYoutube.test(attachment.location)) {
            item.id = attachment.location.match(regexYoutube)[1];
            attachmentsParsed.youtube.push(item);
          }
          // A regular link.
          else {
            attachmentsParsed.pages.push(item);
          }
        }

      });

      return attachmentsParsed;
    }

    /**
     * Generate JSON files of jekyll pages.
     *
     * @param nodes
     */
    function extractDataPage(nodes) {
      // Write files JSON.
      _.each(nodes, function(node) {
        // Prepare the data, going through the tree from the deepest node to the root.
        if (node.children) {
          extractDataPage(node.children);
        }

        // Pick node selected properties.
        node = _.pick(node, 'guid', 'name', 'data', 'attachments', 'siblings');

        // Generate the json file, to bind in the each Jekyll pages, is related with the node.guid.
        grunt.file.write(grunt.config.get('CDL.tmp') + node.guid + '.json', JSON.stringify(node, null, ' '));
        grunt.log.ok('Data object ' + node.guid + ' prepared.');
      });
    }

    function prepareData(nodes) {
      // Prepare object to binding with the template system.
      _.each(nodes, function(node, index) {
        // Begin with the last child.
        if (node.children) {
          nodes[index].children = prepareData(node.children);
        }

        // Set name according node type.
        nodes[index].name = (node.type === 'chronological') ? node.chronologicalName : (node.type === 'bastard') ? node.bastardName : node.name;

        // Modify definition of the object attachments.
        if (node.attachments) {
          nodes[index].attachments = convertAttachments(node.attachments);
        }
      });

      // Get siblings.
      _.each(nodes, function(node, index) {
        nodes[index].siblings = [];
        if (node.type !== 'chronological' && node.hasChronologicalChildren) {
          nodes[index].siblings = getSiblings(node);
        }
      });

      return nodes;
    }

    // Init generation.
    if (grunt.file.exists(grunt.config.get('generate.src'))) {
      // Load work data.
      tree = grunt.file.readJSON(grunt.config.get('generate.src'));
      grunt.log.ok('Load source file: ' + grunt.config.get('generate.src'));

      // Prepare data to Jekyll pages.
      treePrepared = [];
      treePrepared = prepareData([tree]);
      extractDataPage(treePrepared);
    }
    else {
      grunt.fail.fatal('File ' + grunt.config.get('generate.src') + ' does not exist.');
    }
  });

  grunt.registerTask('generate', function () {
    var tree;

    /**
     * Return the template content in a string object.
     *
     * @param name
     *  Could be the name of the file with or without the extension.
     * @returns {*}
     */
    function getTemplate(name) {
      var template;

      name = (name.match(/.html/)) ? 'template/' + name : 'template/' + name + '.html';

      if (grunt.file.exists(name)) {
        // Load template data.
        template = grunt.file.read(name);
      }
      else {
        grunt.fail.fatal('File ' + name + ' does not exist.');
      }

      return template;
    }

    /**
     * Generate the static html file based in a YAML template and the node information. The name of the file is
     * [node.guid].html.
     *
     * @param node
     */
    function generateStaticHtml(node) {
      var template, yamlData, page;

      // Prepare template, filename and data will be write in the yaml page.
      template = getTemplate(grunt.config.get('generate.template'));

      // Read the specific YAML data fragment.
      yamlData = {yaml: grunt.file.read(grunt.config.get('CDL.tmp') + node.guid + '.yml')};

      // Replace dynamic values in the template.
      page = grunt.template.process(template, {data: yamlData});

      // Write the file.
      grunt.file.write(grunt.config.get('generate.dest') + node.guid + '/index.html', page);
      grunt.log.ok(grunt.config.get('generate.dest') + node.guid + '/index.html saved.');
    }

    /**
     * Generate jekyll page for each node.
     *
     * @param nodes
     */
    function generate(nodes) {
      _.each(nodes, function(node) {
        // Generate first the children info.
        generate(node.children);

        // Generate the node info.
        if (node.type !== 'chronological') {
          generateStaticHtml(node);
        }
      });
    }

    // Init generation.
    if (grunt.file.exists(grunt.config.get('generate.src'))) {
      // Load work data.
      tree = grunt.file.readJSON(grunt.config.get('generate.src'));
      grunt.log.ok('Loaded source file: ' + grunt.config.get('generate.src'));
      generate([tree]);
    }
    else {
      grunt.fail.fatal('File ' + grunt.config.get('generate.src') + ' does not exist.');
    }

  });

  // Define Tasks
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'convert:xml2json',
      'CDL',
      'cdlPrepare',
      'convert:json2yaml',
      'generate',
      'copy:cdl',
      'clean:brain',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  // No real tests yet. Add your own.
  grunt.registerTask('test', [
    //   'clean:server',
    //   'concurrent:test',
    //   'connect:test'
  ]);

  grunt.registerTask('check', [
    'clean:server',
    'jekyll:check',
    'compass:server',
    'jshint:all',
    'csscss:check',
    'csslint:check'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'convert:xml2json',
    'CDL',
    'cdlPrepare',
    'convert:json2yaml',
    'generate',
    'copy:cdl',
    'jekyll:dist',
    'clean:brain',
    'concurrent:dist',
    'copy:cssNotUsemin'
// @todo Need to realize the configuration of useminPrepare and usemin.
//    'useminPrepare',
//    'concat',
//    'autoprefixer:dist',
//    'cssmin',
//    'uglify',
//    'imagemin',
//    'svgmin',
//    'rev',
//    'usemin'
  ]);

  grunt.registerTask('default', [
    'check',
    'test',
    'build'
  ]);
};