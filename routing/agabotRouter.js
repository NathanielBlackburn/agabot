const express = require('express');
const router = express.Router();

const SpaceAdditionController = require('@controllers/spaceAdditionController/spaceAdditionController');
const SpaceMessageController = require('@controllers/spaceMessageController/spaceMessageController');

router.post('/', (request, responseHandler) => {
  if (request.body.type == 'ADDED_TO_SPACE') {
    (new SpaceAdditionController(request, responseHandler)).respond();
  } else if (request.body.type == 'MESSAGE') {
    (new SpaceMessageController(request, responseHandler)).respond();
  } else {
    responseHandler.status(204).end();
  }
});

module.exports = router;
