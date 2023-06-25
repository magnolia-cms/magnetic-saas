let envName = process.env.BRANCH.replace("env/", "");

require('fs')
    .writeFileSync(".config-env", `REACT_APP_CONFIG_ENV=environments/${envName}`);
