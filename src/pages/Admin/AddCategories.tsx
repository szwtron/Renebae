import { getAuth } from '@firebase/auth';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import firebaseInit from '../../firebase_config';
import { firebaseFunction } from "../../services/firebase";
import { useHistory } from 'react-router';
import './../Page.css';
import { compassSharp } from 'ionicons/icons';
import { toast } from '../../toast';

const AddCategory: React.FC = () => {

  const [categoryName, setCategory] = useState<Array<any>>([]);
  const firebase = new firebaseFunction();
  const history = useHistory();
  const [newName, setName] = useState(null);

  useIonViewWillEnter(() => {
    getData();
  });

  async function getData() {
    try{
      const categoryFirebase = firebase.getData("categories");
      setCategory(await categoryFirebase);
    }catch(e){
      console.log(e);
    }
  }

  const resetForm  = () => {
    setName(null);
  }

  const addDataToCat = async () => {
    if(newName === null){
      return toast('All field must be filled');
    }
    var obj = {
      name: newName
    }
    try{
      console.log("add category baru");
      const myJSON = JSON.stringify(obj);
      console.log(myJSON);
      await firebase.addData(obj, "categories");
    }catch(e){
      console.log(e);
    }
    resetForm();
    history.push('/page/Admin/Categories');
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
            <IonTitle size="large">Add Category</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow>
            <IonCol>
            <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput value={newName} onIonChange={(e: any) => setName(e.target.value)} required></IonInput>
            </IonItem>
            </IonCol>
        </IonRow>
        <IonButton expand="block" color="medium" onClick={addDataToCat}>Add</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddCategory;
