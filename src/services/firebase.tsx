import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import firebaseInit from "../firebase_config";
export class firebaseFunction {
    db = getFirestore(firebaseInit);
    storage = getStorage(firebaseInit);

    public async getData(collectionName: string) {
        let products: any[];
        let i = 0;
        const querySnapshot = await getDocs(collection(this.db, collectionName));
        console.log('querySnapshot', querySnapshot);
        products = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        return products;
    };

    public async addData(data: any, collectionName: string) {
        // Create an initial document to update.
        try {
            const docRef= await addDoc(collection(this.db,collectionName), data);
            console.log("Document Added successfully, ", docRef.id);
        } catch (e) {
            console.log("Error updating document: ", e);    
        }
    }

    public async updateData(collectionName: string, id: any, fieldToBeUpdated: any) {
        const docRef = doc(this.db, collectionName, id);
        try {
            await updateDoc(docRef, fieldToBeUpdated);
            console.log("Document updated successfully, ", id);
        } catch (e) {
            console.error("Error updating document: ", e)
        }
    }

    public async deleteData(collectionName: string, idDoc: any) {
        try {
            await deleteDoc(doc(this.db, collectionName, idDoc));
            console.log("Document deleted successfully, ");
        } catch (e) {
            console.error("Error updating document: ", e)
        }
    }
}