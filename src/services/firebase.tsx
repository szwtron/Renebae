import { addDoc, collection, doc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
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
        // querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        // console.log('doc:', doc);  
        // console.log("banana" + products);
        // });
        return products;
    }

    public async addData(data: any, collectionName: string) {
        // Create an initial document to update.
        try {
            const docRef= await addDoc(collection(this.db,collectionName), data);
            console.log("Document Data successfully, ", docRef.id);
        } catch (e) {

        }
    }
    public async updateData(collectionName: string, data: any, fieldToBeUpdated: any) {
        // Create an initial document to update.
        const docRef = doc(this.db, collectionName, data[0].id);
        try {
            await updateDoc(docRef, fieldToBeUpdated);
            console.log("Document updated successfully, ", docRef.id);
        } catch (e) {
            console.error("Error updating document: ", e)
        }

        // To update age and favorite color:
        // await updateDoc(docRef, {
        //     "age": 13,
        //     "favorites.color": "Red"
        // });
    }
}