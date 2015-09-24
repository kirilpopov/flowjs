module.exports = function(grunt) {
  

var sourceFolder = 'library';
var jsSourceFolder = sourceFolder + "/js";
var jsSources = sourceFolder + '/js/*.js'
var tsSources = sourceFolder + '/*.ts'
var test_server_port = 8000

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), // the package file to use
    
    ts: {
      default: {
        src: [tsSources],                               // The source typescript files, http://gruntjs.com/configuring-tasks#files
        outDir: jsSourceFolder,                    
        options: {
          compile: true,                              // perform compilation. [true (default) | false]
          comments: false,                            // same as !removeComments. [true | false (default)]
          target: 'es3',                              // target javascript language. [es3 | es5 (grunt-ts default) | es6]
          module: 'commonjs',                         // target javascript module style. [amd (default) | commonjs]
          sourceMap: true,                            // generate a source map for every output js file. [true (default) | false]                             
          }
      }            
    },
    
     //Runs a task whenever some of the source files change
     watch: {
            files: [tsSources],
            tasks: ['build']
     },
        
        //Downloads dependencies
     connect: {
            server: {
                options: {
                    port: test_server_port,
                    hostname: '*'
                        //			keepalive:true
                }
            }
        },
        
    exorcise: {
            bundle: {
                options: {},
                files: {
                    "target/<%= pkg.name %>.min.map": ["target/<%= pkg.name %>.min.js"],
                }
            }
        },

    browserify: {
			beautiful:{
				options: {
					browserifyOptions: {
						debug: true
					},
					//banner: init_code,
					//transform:[['browserify-versionify', {global:true}]]
				},
				files: {
				"target/<%= pkg.name %>.js": [jsSources]
				}
			},
			ugly:{
				options: {
					browserifyOptions: {
						debug: true
					},
					//banner: init_code,
					//transform:['browserify-versionify', ['uglifyify', {global:true}]]
				},
				files: {
				"target/<%= pkg.name %>.min.js": [jsSources]
				}
			}
     }
     
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-exorcise');
	  grunt.loadNpmTasks('grunt-contrib-clean')    
    grunt.loadNpmTasks("grunt-ts");
    
    
    grunt.registerTask('build', ["ts", 'browserify', "exorcise"]);
    grunt.registerTask('default', ['clean', 'build','test']);
    grunt.registerTask('dev', ['build', 'connect', 'watch']);
    grunt.registerTask('test', ['jshint', 'connect', 'qunit']);
};
