"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/test', (req, res, next) => {
    res.send('test!');
});
router.post('/test', express_1.default.json(), (req, res, next) => {
    res.send(JSON.stringify(req.body));
});
exports.default = router;
//# sourceMappingURL=app.routing.js.map