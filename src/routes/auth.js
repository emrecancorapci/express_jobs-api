import Express from 'express';
import { login, register } from '../controllers/auth.js';

const router = Express.Router();

router.post('/Register', register);
router.post('/Login', login);

export default router;
