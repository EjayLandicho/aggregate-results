'use strict';

const fs = require('fs');
var now = new Date();
var jsonfile_name = './aggregate-results' + now.getTime() + '.json'
const data = {
    "passed": 0,
    "total": 0,
    "failed": 1,
    "skipped": 0,
    "name": null,
    "tests": []
};

const dir = `${__dirname}/results/`;
fs.readdir(dir, (err, files) => {
    return new Promise((resolve, reject) => {
        if (err) reject(err);
        files.forEach(file => {
           console.log(file);
           let content = require(`${dir}${file}`);
           data['passed'] += content.passed;
           data['total'] += content.total;
           data['skipped'] += content.skipped;
           data['name'] = content.fixtures[0].meta.feature;
           data['tests'] = data['tests'].concat(content.fixtures[0].tests);
        });
        resolve(data);
    }).then(data => {
        fs.writeFileSync(jsonfile_name, JSON.stringify(data, null, 4));
    });
})