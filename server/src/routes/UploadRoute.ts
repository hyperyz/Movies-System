import Express from 'express';
import multer from "multer"
import path from 'path';
import { ResponseHelper } from './ResponseHelper';
const router = Express.Router();


const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/upload'),
    filename: (req, file, cb) => {
        //文件名用时间戳
        const time = new Date().getTime()
        const extname = path.extname(file.originalname)
        //设置文件全称
        cb(null, `${time}${extname}`)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB，控制文件上传尺寸
    },
    fileFilter: (req, file, cb) => {
        // 限制上传文件类型
        const extname = path.extname(file.originalname)
        if (extname === '.jpg' || extname === '.png' || extname === '.gif') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
}).single('imgfile')

router.post('/', (req, res) => {
    upload(req, res, err => {
        if (err) {
            ResponseHelper.sendError(err.message, res)
        } else {
            const url = `/upload/${req.file?.filename}`
            ResponseHelper.sendData(url, res)
        }
    })
})

export default router;