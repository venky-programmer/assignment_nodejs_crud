import express from 'express';
import customerController from '../controller/customerController.js'
const router = express.Router();

//  GET Requests
router.get('/', customerController.renderPage);
router.get('/add_customer', customerController.addRenderPage);
router.get('/update_customer/:id', customerController.updateRenderPage);

//  POST Requests
router.post('/', customerController.findCustomer);
router.post('/add_customer', customerController.addCustomer);
router.post('/update_customer/:id', customerController.updateCustomer);
router.post('/:id', customerController.deleteCustomer);

export default router