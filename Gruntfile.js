'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    // Metadata. Use this to tweak your paths if you want something different.
    meta: {
      bower: 'public/bower_components',
      less: 'public/less',
      css: 'public/css',
      fonts: 'public/fonts',
      jsSrc: 'public/js/src',
      jsDist: 'public/js/dist',
      img: 'public/img',
      dist: 'dist',
      config: 'config',
      modules: 'modules'
    },
    // Browserify. One of Angularify corner stones.
    browserify: {
      index: {
        files: {
          '<%= meta.jsDist %>/index.js': '<%= meta.jsSrc %>/index.js'
        }
      }
    },
    // Some clean up tasks.
    // clean:build - Remove build files.
    // clean:dist - Remove build and dist files.
    // clean:all - Clean all generated and downloaded files. if you run this
    //           you will need to run again npm install and bower install.
    clean: {
      build: ['<%= meta.jsDist %>', '<%= meta.css %>', '<%= meta.fonts %>'],
      dist: ['<%= clean.build %>', '<%= meta.dist %>'],
      all: ['<%= clean.dist %>', 'node_modules', '<%= meta.bower %>']
    },
    // Concatenate task.
    // This one is used to concatenate all our external (bower) dependencies.
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      libs: {
        files: {
          '<%= meta.jsDist %>/libs.js': [
            '<%= meta.bower %>/lodash/dist/lodash.js',
            '<%= meta.bower %>/angular/angular.js',
            '<%= meta.bower %>/angular-bootstrap/ui-bootstrap-tpls.js',
            '<%= meta.bower %>/angular-ui-router/release/angular-ui-router.js',
            '<%= meta.bower %>/restangular/dist/restangular.js',
            '<%= meta.bower %>/alertify.js/lib/alertify.js'
          ]
        }
      },
      libsMin: {
        files: {
          '<%= meta.jsDist %>/libs.js': [
            '<%= meta.bower %>/lodash/dist/lodash.min.js',
            '<%= meta.bower %>/angular/angular.min.js',
            '<%= meta.bower %>/angular-bootstrap/ui-bootstrap-tpls.min.js',
            '<%= meta.bower %>/angular-ui-router/release/angular-ui-router.min.js',
            '<%= meta.bower %>/restangular/dist/restangular.min.js',
            '<%= meta.bower %>/alertify.js/lib/alertify.min.js'
          ]
        }
      }
    },
    // Concurrent tasks.
    // This task is used to run our build, watcher and local server concurrently.
    concurrent: {
      development: {
        tasks: ['development', 'watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    // Copy task.
    // Copy static files where and when required.
    copy: {
      fonts: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: ['<%= meta.bower %>/bootstrap/fonts/**'],
        dest: '<%= meta.fonts %>/'
      },
      dist: {
        expand: true,
        src: ['app.js', 'index.js', '<%= meta.config %>/**/*', '<%= meta.modules %>/**/*', '<%= meta.css %>/**/*', '<%= meta.fonts %>/**/*', '<%= meta.img %>/**/*', '<%= meta.jsDist %>/**/*', 'package.json', 'views/**/*'],
        dest: '<%= meta.dist %>/'
      }
    },
    // JSHint.
    // Make sure all the code is JSHinted always.
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      browser: {
        src: '<%= meta.jsSrc %>/**/*.js'
      }
    },
    // LESS
    // Compile LESS files when required.
    less: {
      development: {
        options: {
          paths: [
            '<%= meta.bower %>',
            '<%= meta.less %>'
          ]
        },
        files: {
          '<%= meta.css %>/styles.css': '<%= meta.less %>/styles.less'
        }
      },
      dist: {
        options: {
          paths: [
            '<%= meta.bower %>',
            '<%= meta.less %>'
          ],
          compress: false,
          optimization: 2,
          sourceMap: true,
          sourceMapFilename: '<%= meta.css %>/styles.css.map',
          sourceMapBasepath: '<%= meta.css %>/'
        },
        files: {
          '<%= meta.css %>/styles.css': '<%= meta.less %>/styles.less'
        }
      }
    },
    // NodeMon task.
    // Run express and reload it when needed.
    nodemon: {
      development: {
        script: 'index.js'
      }
    },
    // Uglify task.
    // Minify JS code for production environment.
    uglify: {
      index: {
        files: {
          '<%= meta.jsDist %>/index.js': '<%= meta.jsDist %>/index.js'
        }
      }
    },
    // Watch tasks.
    // Watch for changes and trigger tasks based on them.
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      less: {
        files: ['<%= meta.less %>/**/*.less'],
        tasks: ['less:development'],
        options: {
          livereload: true
        }
      },
      javascript: {
        files: ['<%= jshint.browser.src %>', '<%= meta.jsSrc %>/**/*.html'],
        tasks: ['jshint:browser', 'browserify:index'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Load Grunt tasks.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  // Local tasks.
  grunt.registerTask('default', ['concurrent:development']);
  grunt.registerTask('development', ['clean:build', 'concat:libs', 'browserify', 'less:development', 'copy:fonts']);
  grunt.registerTask('build', ['clean:build', 'concat:libsMin', 'browserify', 'uglify', 'less:dist', 'copy:fonts']);
  grunt.registerTask('dist', ['build', 'copy:dist']);
};
