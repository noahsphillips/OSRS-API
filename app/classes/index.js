let fs = require('fs'),
    path = require('path'),
    classes = {},
    name;

fs.readdirSync(__dirname).filter((file) => {
    return file !== path.basename(__filename)
}).forEach((file) => {
    name = path.parse(file).name;
    name[name] = require(`./${name}`);
});

module.exports = classes;