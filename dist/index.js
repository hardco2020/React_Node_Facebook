"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = express_1.default();
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, `./environments/${process.env.NODE_ENV}.env`) });
app.get('/', (req, res, next) => {
    res.send('test!');
});
app.listen(process.env.PORT, () => console.log(`http server is running at port ${process.env.PORT}.`));
//# sourceMappingURL=index.js.map