import { addDoc, collection, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
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
        let docId: string = "";
        // Create an initial document to update.

        //query where id input == id field yang ingin diubah
        const q = query(collection(this.db, collectionName), where("id", "==", id));

        //get docs ini buat ambil id document sesuai hasil query
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            
            //ini doc id nya
            docId = doc.id;
        });

        const docRef = doc(this.db, collectionName, docId.toString());
        try {
            await updateDoc(docRef, fieldToBeUpdated);
            console.log("Document updated successfully, ", docRef.id);
        } catch (e) {
            console.error("Error updating document: ", e)
        }
    }
}