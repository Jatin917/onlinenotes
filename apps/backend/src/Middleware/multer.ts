import multer from 'multer';

// Configure Multer to store PDF files in memory
const storage = multer.memoryStorage();
const fileFilter = (req:any, file:any, cb:any) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept only PDFs
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

export const upload = multer({ storage, fileFilter });

