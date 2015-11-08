'use strict';

const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');

let templateCache = {};

const options = {
  templates: './views/email'
};

// load and compile all the email templates
function loadTemplates() {
  let templates = fs.readdirSync(options.templates);
  templates.forEach(function(template) {
    let templateName = template.split('.')[0];
    templateCache[templateName] = hbs.compile(fs.readFileSync(options.templates + '/' + template).toString());
  });
};

function compileTemplate(view, data) {
  return templateCache[view](data);
}

module.exports =  {
  loadTemplates: loadTemplates,
  compileTemplate: compileTemplate
};
