import { getAuth } from '@firebase/auth';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { doc, getFirestore, writeBatch } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import firebaseInit from '../../firebase_config';
import { firebaseFunction } from "../../services/firebase";
import { useHistory } from 'react-router';
import './../Page.css';
import { onAuthStateChanged } from 'firebase/auth';

const UpdateCategory: React.FC = () => {

  const idcat = useParams<{ id: string; }>().id;
  const [categoryName, setUser] = useState<Array<any>>([]);
  const db = getFirestore(firebaseInit);
  const batch = writeBatch(db);
  const auth = getAuth(firebaseInit);
  const user = auth.currentUser;
  const firebase = new firebaseFunction();
  const history = useHistory();
  const [product, setProduct] = useState<Array<any>>([]);

  const nameRef = useRef<HTMLIonInputElement>(null);

  useIonViewWillEnter(() => {
        getData();
  });

  async function getData() {
    const categoryFirebase = firebase.getData("categories");
    setUser(await categoryFirebase);
    const productFirebase = firebase.getData("product");
    setProduct(await productFirebase);
  }

  const updateData = async (oldName: string) => {
      const field = {
          name: nameRef.current?.value,
      }
      //await firebase.updateData("categories", idcat, field);
      const catRef = doc(db, "categories", idcat);
      batch.update(catRef, field);

      {product.filter(product=>product.category === oldName).map(product => {
          //updateProduct(product.id)
          const data = {
            category: nameRef.current?.value,
          }
          const prodRef = doc(db, "product", product.id);
          batch.update(prodRef, data);
      })}
      await batch.commit();
      history.push('/page/Admin/Categories');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Category</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{idcat}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {categoryName.filter(cat=>cat.id === idcat).map(cat => (
            <IonGrid key={cat.name} className="ion-padding">
                <IonRow>
                    <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Name</IonLabel>
                        <IonInput ref={nameRef} value={cat.name}></IonInput>
                    </IonItem>
                    </IonCol>
                </IonRow>
                <IonButton expand="block" color="medium" onClick={() => updateData(cat.name)}>Edit</IonButton>
            </IonGrid>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default UpdateCategory;