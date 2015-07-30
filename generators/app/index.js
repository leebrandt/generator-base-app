'use strict';

var path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk');

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
      }];

      this.prompt(prompts, function(props){

        this.projectName = props.projectName;

        done();
      }.bind(this));

    }
  },

  writing: function app(){
    this.template('_index.html', 'index.html');
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
  },

  finalizing: function finalizing(){
    this.installDependencies();
  }


});

module.exports = BaseAppGenerator;