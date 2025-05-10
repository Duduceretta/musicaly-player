/*
 * grunt-velocity.js
 * https://github.com/lorrylockie/grunt-velocity.js
 *
 * Copyright (c) 2013 lorrylockie
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var velocity = require('velocityjs');
    var path = require('path');

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('velocity_js', 'Your task description goes here.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            // Concat specified files.
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                    // Read file source.
                    var string = grunt.file.read(filepath);
                    // Read json context
                    var jsonPath = filepath.replace('.vm', '') + ".json";
                    var isJsonPath = grunt.file.exists(jsonPath);
                    var json = isJsonPath ? grunt.file.readJSON(jsonPath) : {};


                    return velocity.render(string, json, {
                        parse: function (fname) {
                            fname = path.normalize(path.dirname(filepath) + "\\" + fname);
                            var jsonPath = fname.replace('.vm', '') + ".json";
                            var isJsonPath = grunt.file.exists(jsonPath);
                            var json = jsonPath ? grunt.file.readJSON(jsonPath) : {};
                            fname = grunt.file.read(fname);
                            return velocity.render(fname, json);
                        }
                    });

                }).join(grunt.util.normalizelf(options.separator));

            // Handle options.
            src += options.punctuation;

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};
