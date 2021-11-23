import { getAuth } from '@firebase/auth';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import firebaseInit from '../../firebase_config';
import { firebaseFunction } from "../../services/firebase";
import { useHistory } from 'react-router';
import './../Page.css';
import { compassSharp } from 'ionicons/icons';

const AddCategory: React.FC = () => {

  const namecat = useParams<{ name: string; }>().name;
  const [categoryName, setUser] = useState<Array<any>>([]);
  
  const db = getFirestore(firebaseInit);
  const auth = getAuth(firebaseInit);
  const user = auth.currentUser;
  const firebase = new firebaseFunction();
  const history = useHistory();

  const nameRef = useRef<HTMLIonInputElement>(null);
  const [newName, setName] = useState('');


  useEffect(() => {
        async function getData() {
            const categoryFirebase = firebase.getData("categories");
            setUser(await categoryFirebase);
        }
        getData();
    }, []);

    // const updateData = async () => {
    //     const field = {
    //         name: nameRef.current?.value,
    //     }
    //     await firebase.updateData("categories", categoryName, field);
    //     history.push('/page/Admin/Categories');
    // }

    const addDataToCat = async () => {
        var obj = {
            name: newName
        }
        console.log("add category baru");
        const myJSON = JSON.stringify(obj);
        console.log(myJSON);
        await firebase.addData(obj, "categories");
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Add Category</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{namecat}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow>
            <IonCol>
            <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput onIonChange={(e: any) => setName(e.target.value)}></IonInput>
            </IonItem>
            </IonCol>
        </IonRow>
        <IonButton expand="block" color="medium" onClick={addDataToCat}>Add</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddCategory;
