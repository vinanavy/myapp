/* eslint-disable max-len */
/* eslint-disable new-cap */
const router = require('express').Router();
const {checkToken} = require('../validations/token.validations');
const {addUserValidation} = require('../validations/user.validations');
const {
  getAll,
  getById,
  insertUser,
  removeUser,
} = require('../controllers/user.controllers');

router.get('/', checkToken, getAll);
router.get('/:id', checkToken, getById);
router.post('/', addUserValidation, insertUser);
router.delete('/:id', checkToken, removeUser);

module.exports = router;
