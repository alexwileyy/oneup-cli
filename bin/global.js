#!/usr/bin/env node

// Import modules
const createComponent = require('../lib/new-component');
const createStyle = require('../lib/new-style');

// Definitions for command line arguments
const optionDefinitions = [
    { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'src', type: String, multiple: true, defaultOption: true },
    { name: 'type', alias: 't', type: String }
  ]

const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)

const { type } = options;

switch (type.toUpperCase()) {
    case "COMPONENT":
        createComponent.createComponent();
    case "STYLE":
        console.log("Creating a new global style");
}