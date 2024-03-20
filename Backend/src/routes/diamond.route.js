import express from 'express';
import diamondController from '../controllers/diamond.controller.js';

const router = express.Router();

router.post('/create', diamondController.createDiamond);

router.get('/show/:id', diamondController.showDetail);
router.get('/', diamondController.getDiamonds);

router.delete('/delete/:id', diamondController.deleteDiamond);

router.put('/:id', diamondController.updateDiamond);

export default router;
