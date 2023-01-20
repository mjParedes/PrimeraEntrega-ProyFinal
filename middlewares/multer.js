import multer from 'multer'
import { __dirname } from '../utils.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random())
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage })