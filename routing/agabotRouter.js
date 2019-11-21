const express = require('express');
const router = express.Router();

const SpaceAdditionController = require('@controllers/spaceAdditionController');
const SpaceMessageController = require('@controllers/spaceMessageController');

router.post('/', (request, responseHandler) => {
  if (request.body.type == 'ADDED_TO_SPACE') {
    const spaceAdditionController = new SpaceAdditionController(request, responseHandler);
    spaceAdditionController.respond();
  } else if (request.body.type == 'MESSAGE') {
    const spaceMessageController = new SpaceMessageController(request, responseHandler);
    spaceMessageController.respond();
  } else {
    responseHandler.status(204).end();
  }
});

module.exports = router;
