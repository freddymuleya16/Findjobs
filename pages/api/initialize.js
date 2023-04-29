import { db } from '_firebase';
import {  doc, setDoc } from 'firebase/firestore';
export default async function handler(req, res) {
    
    try {
        const post = {
            "title": "Error 404",
            "layout": "404",
            "content": "## Page Not Found"
            }
            
            
            
        await setDoc(doc(db, 'content', '403'), post);
    
        res.status(200).send('Blog content added successfully!');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error adding blog content');
      }
  }
  