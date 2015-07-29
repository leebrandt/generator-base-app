'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var BaseGenerator = module.exports = function BaseGenerator(args, options, config){
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'],
    callback: function () {
      // Emit a new event - dependencies installed
      this.emit('dependenciesInstalled');
    }.bind(this) });
  });

};

BaseGenerator.prototype.askFor = function askFor(){
  var cb = this.async;

  console.log(chalk.magenta('Kickin this thing off...'));

  var prompts = [{
    name: 'appName',
    message: 'Application Name',
    default: 'my-app-name'
  }];

  this.prompt(prompts, function(props){
    
      this.appName = props.appName;
      this.slugifiedAppName = this._.slugify(props.appName);

    cb();
  }).bind(this);
};

BaseGenerator.prototype.app = function app() {
  this.template('_index.html', 'index.html');
  this.template('_bower.json', 'package.json');
  this.template('_package.json', 'package.json');
};