const moduleAlias = require('module-alias');

module.exports = (path) => {
    const debug = (process.env.NODE_ENV || 'development') == 'development';
    let rootPath = path;
    if (!debug) {
        rootPath = '/home/pafnucep/agabot';
    }
    moduleAlias.addAliases({
        '@root': rootPath,
        '@routing': `${rootPath}/routing`,
        '@controllers': `${rootPath}/routing/controllers`,
        '@responses': `${rootPath}/routing/responses`,
        '@models': `${rootPath}/models`,
        '@services': `${rootPath}/services`,
        '@repositories': `${rootPath}/repositories`,
        "@tools": `${rootPath}/tools`,
        '@security': `${rootPath}/routing/security`,
        '@tests': `${rootPath}/tests`,
        '@ffp': `${rootPath}/lib/ffp`,
        '@data': `${rootPath}/data`,
        '@plugins': `${rootPath}/plugins`
    });
};
