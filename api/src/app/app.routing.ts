import express,{Request, Response,NextFunction} from 'express';
import { UserModel } from '../models/user';

const router = express.Router();

router.get('/test', (req, res, next) => {
    res.send('test!');
});
router.post('/test', express.json(), (req, res, next) => {
    res.send(JSON.stringify(req.body));
  });

//----------------------------------測試crud
//exrpess.json(使用body_parser)
//errorHandler
//利用async處理避免call-back-hell
const errorHandler = (func: (req: Request, res: Response, next: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => func(req, res, next).catch(next);

router.post('/user', express.json(), errorHandler(async (req, res, next) => {
    const { username, email } = req.body;
    const user = new UserModel({ username, email });
    const data = await user.save();
    res.send(data);
}));

// router.patch('/users/:id', express.json(), errorHandler(async (req, res, next) => {
//     await UserModel.updateOne({ _id: req.params.id }, { username: req.body.username }, { runValidators: true });
//     res.send('成功');
//     //Update沒有拿取更新的值的功能，所以無法將新的值傳值回去給使用者
// }));
//find並update
router.patch('/users/:id', express.json(), errorHandler(async (req, res, next) => {
    // const options: QueryFindOneAndUpdateOptions = {
    //   new: true,
    //   runValidators: true
    // }; queryfindone...undefined不知道為什麼
    const document = await UserModel.findByIdAndUpdate(req.params.id, { username: req.body.username }, {
        new: true,
        runValidators: true
      });
    res.send(document);
}));

router.delete('/users/:id', errorHandler(async (req, res, next) => {
    await UserModel.findByIdAndRemove(req.params.id);
    res.send('刪除成功');
}));
//--------------------------------------在error handler裡面套用async可以在後續使用await?
router.get('/users', errorHandler(async (req, res, next) => {
    //const documents = await UserModel.find({ username: req.query.username });//query username 讀取網址?號後的變數
    const documents = await UserModel.findOne({ username: req.query.username });//query username 讀取網址?號後的變數
    res.send(documents);
}));//find = mongoose用法 如果不帶username條件的話會將documents都讀取
 //username 對應資料庫內的key值
 //利用findone減輕伺服器負擔


//測試錯誤回報
router.get('/data/error', (req, res, next) => {
// Fake API
const getProfile = new Promise((resolve, reject) => {
    setTimeout(() => resolve({ name: 'HAO', age: 22 }), 100);
});
const getFriends = new Promise((resolve, reject) => {
    setTimeout(() => resolve([]), 120);
});
const errorRequest = new Promise((resolve, reject) => {
    setTimeout(() => reject('Oops!'), 2000);
});
getProfile
.then(profile => getFriends)
.then(friends => errorRequest)
.then(() => res.send('GoGoGo!'))
.catch(err => next(err));

});
export default router;