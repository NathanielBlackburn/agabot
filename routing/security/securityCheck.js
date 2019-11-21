module.exports = {

    conduct: (request, response, config) => {
        const json = request.body;
        if (!json || !json.token || json.token !== config.hangoutsApiSecret) {
            response.status(403).end();
            return false;
        } else {
            return true;
        }
    }

};
