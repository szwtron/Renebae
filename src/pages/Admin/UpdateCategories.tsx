import { getAuth } from '@firebase/auth';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import firebaseInit from '../../firebase_config';
import { firebaseFunction } from "../../services/firebase";
import { useHistory } from 'react-router';
import './../Page.css';

const UpdateCategory: React.FC = () => {

  const idcat = useParams<{ id: string; }>().id;
  const [categoryName, setUser] = useState<Array<any>>([]);
  
  const db = getFirestore(firebaseInit);
  const auth = getAuth(firebaseInit);
  const user = auth.currentUser;
  const firebase = new firebaseFunction();
  const history = useHistory();

  const nameRef = useRef<HTMLIonInputElement>(null);


  useEffect(() => {
        async function getData() {
            const categoryFirebase = firebase.getData("categories");
            setUser(await categoryFirebase);
        }
        getData();
    }, []);

    const updateData = async () => {
        const field = {
            name: nameRef.current?.value,
        }
        await firebase.updateData("categories", categoryName, field);
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
            </IonGrid>
        ))}
        <IonButton expand="block" color="medium" onClick={updateData}>Edit</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UpdateCategory;
