

module.exports = app => {
    const utils = {}

    utils.haveWhere = (query, conditional) => {
        if (query.toLowerCase().includes('where')){
            return conditional = ' and ';
        }else{
            return conditional = ' where ';
        };
    }

    return utils;
}