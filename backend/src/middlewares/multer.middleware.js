import multer from "multer";

const storage = multer.memoryStorage(); // store image in memory
const upload = multer({ storage });

export default upload;
