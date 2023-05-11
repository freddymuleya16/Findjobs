import { db } from "_firebase"; import {
    doc,
    collection,
    setDoc,
} from "firebase/firestore";
import multer from "multer";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

async function parseFormData(req, res) {
    const storage = multer.memoryStorage();
    const multerUpload = multer({ storage });
    const multerFile = multerUpload.single('image');
    await new Promise((resolve, reject) => {
        multerFile(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
    return {
        fields: req.body,
        file: req.file
    }
}

// IMPORTANT: Prevents next from trying to parse the form
export const config = {
    api: {
        bodyParser: false,
    },
};

const Handler = async (req, res) => {
    try {
        const result = await parseFormData(req, res);
        result.fields.date = new Date(result.fields.date)
        result.fields.categories = result.fields.categories.split(',')
        result.fields.draft = result.fields.draft.toLowerCase() == 'true'
        result.fields.featured = result.fields.featured.toLowerCase() == 'true'
        console.log(result.fields);
        await uploadProfile(result.fields, result.file)
        res.status(200).json({ success: '/success-page' });
    } catch (error) {
        res.status(500).json({ error })
    }

}
const uploadProfile = async (data, picture) => {

    try {
        console.log(data)
        // Create a reference to Firebase Storage
        const storage = getStorage();

        const fileRef = ref(
            storage,
            `images/${Date.now()}-${picture.originalname}`
        );
        const snapshot = await uploadBytesResumable(fileRef, picture.buffer);

        const pictureRefs = await getDownloadURL(snapshot.ref);

        // Create a reference to Firebase Firestore
        const db_ = db;

        await setDoc(doc(collection(db_, "/content/posts/post")), {
            ...data,
            image: pictureRefs,

        });
    } catch (error) {
        console.error(error);
    }
};
export default Handler;
