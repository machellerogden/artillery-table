#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const path = require('path');
const reportJson = require(path.join(process.cwd(), process.argv[2]));
const Table = require('easy-table');
const _ = require('lodash');
const report = _.map(reportJson.intermediate, (item) => {
    const timestamp = item.timestamp;
    const requestsCompleted = item.requestsCompleted;
    return _.assign({
        timestamp,
        requestsCompleted
    }, item.codes, _.mapKeys(item.latency, (v, k) => `latency.${k}`), _.mapKeys(item.rps, (v, k) => `rps.${k}`));
});

console.log(chalk.cyan(Table.print(report)));
