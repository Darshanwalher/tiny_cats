import { Router } from 'express';
import { testMcpController } from '../controllers/test-mcp.controller.ts';

const router = Router();

router.post('/test-mcp', testMcpController);


export default router;