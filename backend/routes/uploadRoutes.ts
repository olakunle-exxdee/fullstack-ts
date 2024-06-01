import path from 'path';
import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, 'uploads/');
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
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
  fileFilter: function (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
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
