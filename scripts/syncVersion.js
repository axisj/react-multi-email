const path = require('path');
const jsonfile = require('jsonfile');

jsonfile.readFile('./dist/package.json')
    .then(json => {
        console.dir(`update version to "${json.version}"`);

        jsonfile.writeFile('./src/package.json', json, {
                spaces: 2,
                EOL: '\r\n'
            })
            .then(res => {
                console.log('Write complete : src/package.json');
            });

        jsonfile.readFile('./package.json')
            .then(obj => {
                obj.version = json.version;
                jsonfile.writeFile('./package.json', obj, {
                        spaces: 2,
                        EOL: '\r\n'
                    })
                    .then(res => {
                        console.log('Write complete : package.json');
                    });
            });
    })
    .catch((err) => console.error(err));