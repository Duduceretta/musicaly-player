/*
 * grunt-velocity.js
 * https://github.com/lorrylockie/grunt-velocity.js
 *
 * Copyright (c) 2013 lorrylockie
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({


    // Configuration to be run (and then tested).
    velocity_js: {

      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!',
          g_data_file:"test/globaldata.json"
        },
        files: {
          'xxx': ['test/fixtures/ex.vm']
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');



  grunt.registerTask('default', ['velocity_js']);

};
