import path from 'path';
import express, { Request, Response } from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
function checkFileType(file: any, cb: any) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Images only'));
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
router.post('/', upload.single('image'), (req: Request, res: Response) => {
  res.send({
    message: 'Image uploaded',
    image: `/${req?.file?.path}`,
  });
});

export default router;
