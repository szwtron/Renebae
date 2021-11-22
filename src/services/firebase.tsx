import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseInit from "../firebase_config";

export class firebaseFunction {
    db = getFirestore(firebaseInit);
    storage = getStorage(firebaseInit);

    public async getData(collectionName: string) {
        let products: any[];
        let i = 0;
        const querySnapshot = await getDocs(collection(this.db, collectionName));
        console.log('querySnapshot', querySnapshot);
        products = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}))
        
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log('doc:', doc);  
        console.log("banana" + products);
        });
        return products;
    }

    public async addData(data: any, collectionName: string) {
        try {
            data.forEach(async (element: any) => {
              const docRef = await addDoc(collection(this.db, collectionName), element);
              console.log("Document written with ID: ", docRef.id);
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
}