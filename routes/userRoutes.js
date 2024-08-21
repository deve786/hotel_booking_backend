const express = require('express');
const { getAllUsers, deleteUser, getSingleUser, updateUserDetails } = require('../controllers/userController');

const router = express.Router();

router.get('/all', getAllUsers);
router.get('/single/:id', getSingleUser);
router.put('/update/:id', updateUserDetails);
router.delete('/delete-user/:id', deleteUser);

module.exports = router;
