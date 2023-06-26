const currentGitBranch = require('current-git-branch');
let envName = currentGitBranch().replace("env/", "");

require('fs')
    .writeFileSync(".config-env", `REACT_APP_CONFIG_ENV=environments/${envName}`);