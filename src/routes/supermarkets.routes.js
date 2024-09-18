import { Router } from "express";
import { createSupermarket, getSupermarkets, getSupermarketById, updateSupermarket, deleteSupermarket } from "../controllers/supermarket.controller.js";

const router = Router();

router.post('/createmarket', createSupermarket);
router.get('/getmarkets', getSupermarkets);
router.get('/getmarketbyid/:id', getSupermarketById);
router.put('/updatemarket/:id', updateSupermarket);
router.delete('/deletemarket/:id', deleteSupermarket);

export default router;

