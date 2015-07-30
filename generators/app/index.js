'use strict';

var path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    s = require('underscore.string');

var BaseAppGenerator = yeoman.generators.Base.extend({

  initializing: function init(){
    this.pkg = require('../../package.json');
  },

  prompting: {
    askForProjectName: function ask(){
      var done = this.async();

      console.log(chalk.magenta('Kickin this thing off...'));

      var prompts = [{
        name: 'projectName',
        message: 'Application Name',
        default: this.appname
      },{
        name: 'projectDescription',
        message: 'Project Description',
        default: 'My app is cool, you like it.'
      }];

      this.prompt(prompts, function(props){

        this.projectName = props.projectName;
        this.slugifiedProjectName = s.slugify(props.projectName);
        this.camelizedProjectName = s.camelize(props.projectName, true);
        this.projectDescription = props.projectDescription;

        done();
      }.bind(this));

    }
  },

  writing: function app(){
    this.template('_index.html', 'index.html');
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');

    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.copy('gulpfile.js');


    this.mkdir('assets');

    this.mkdir('modules');
    this.template('modules/app.module.js', 'modules/app.module.js');

    this.directory('modules/core');
  },

  finalizing: function finalizing(){
    this.installDependencies();
  }


});

module.exports = BaseAppGenerator;