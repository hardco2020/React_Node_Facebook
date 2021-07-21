import { App } from './app';
import { JWTException } from './exceptions/jwt.exception';
import { DefaultException } from './exceptions/default.exception';
import { ResponseErrorException } from './exceptions/response-error.exception';
const bootstrap = () => {
    const app = new App();
    app.setException(ResponseErrorException);
    app.setException(JWTException);
    app.setException(DefaultException);
    app.launchDatabase();       
    app.bootstrap();
};

bootstrap();

// import express, { Request, Response,NextFunction } from 'express';
// import path from 'path';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import appRoute from './app/app.routing'; //使用其中export出的route
// import helmet from 'helmet';
// import { Database } from './database';

// const app = express();

// // 動態選擇環境變數的檔案
// dotenv.config({ path: path.resolve(__dirname, `./environments/${ process.env.NODE_ENV }.env`) });

// app.get('/', (req, res, next) => {
//     res.send('Hello, World!!');
// });


// //加入路由
// app.use('/test', appRoute);

// //跨網域請求同意
// app.use(cors());

// //資安
// app.use(helmet.hidePoweredBy());

// //資料庫連線
// Database.connect();

// //錯誤處理
// app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
//     res.status(500).json({ message: err.message || err });
// });
// app.listen(process.env.PORT, () => console.log(`http server is running at port ${ process.env.PORT }.`));