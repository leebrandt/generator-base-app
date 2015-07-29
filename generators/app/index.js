'use strict';

var path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    slugify = require('underscore.string/slugify');

var BaseAppGenerator = yeoman.generators.Base.extend({

  init: function init(){
    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../../package.json')));

        // invoke npm install on finish
    this.on('end', function() {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  ask: function ask(){
    var cb = this.async;

    console.log(chalk.magenta('Kickin this thing off...'));

    var prompts = [{
      name: 'appName',
      message: 'Application Name',
      default: 'My Silly Application'
    }];

    this.prompt(prompts, function(props){

      this.appName = props.appName;
      this.slugifiedAppName = slugify(this.appName);

      cb();
    }.bind(this));

  },

  app: function app(){
    this.template('_index.html', 'index.html');
    this.template('_bower.json', 'bower.json');
    this.template('_package.json', 'package.json');
  }


});

module.exports = BaseAppGenerator;