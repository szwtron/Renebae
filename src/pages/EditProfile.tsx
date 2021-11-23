import { getAuth } from '@firebase/auth';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import firebaseInit from '../firebase_config';
import { firebaseFunction } from "../services/firebase";
import { useHistory } from 'react-router';
import './Page.css';
import { getMetadata } from '@firebase/storage';

const EditProfile: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [userInfo, setUser] = useState<Array<any>>([]);
  
  const db = getFirestore(firebaseInit);
  const auth = getAuth(firebaseInit);
  const user = auth.currentUser;
  const firebase = new firebaseFunction();
  const history = useHistory();

  const usernameRef = useRef<HTMLIonInputElement>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const nameRef = useRef<HTMLIonInputElement>(null);
  const dateRef = useRef<HTMLIonInputElement>(null);
  const address1Ref = useRef<HTMLIonInputElement>(null);
  const address2Ref = useRef<HTMLIonInputElement>(null);
  const phoneRef = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const userFirebase = firebase.getData("user");
    setUser(await userFirebase);
  };

  const updateData = async () => {
      const field = {
          username: usernameRef.current?.value,
          email: emailRef.current?.value,
          name: nameRef.current?.value,
          birthdate: dateRef.current?.value,
          address1: address1Ref.current?.value,
          address2: address2Ref.current?.value,
          phone: phoneRef.current?.value as number
      }
      userInfo.filter(user => user.uid == user?.uid).map(user => {
        firebase.updateData("user", user.id, field);
      })
      history.push('/Home');
  }

    

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={addData}>wee</IonButton>
        {userInfo.filter(info=>info.uid === user?.uid).map(info => (
            <IonGrid key={info.uid} className="ion-padding">
                <IonRow>
                    <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Username</IonLabel>
                        <IonInput ref={usernameRef} value={info.username} disabled></IonInput>
                    </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput ref={emailRef} value={info.email} disabled></IonInput>
                    </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                    <IonItem>
                        <IonLabel position="floating">Name</IonLabel>
                        <IonInput ref={nameRef} value={info.name}></IonInput>
                    </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                    <IonItem>
                        <IonLabel position="floating">Birthdate</IonLabel>
                        <IonInput ref={dateRef} value={info.birthdate}></IonInput>
                    </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                    <IonItem>
                        <IonLabel position="floating">Address line 1</IonLabel>
                        <IonInput ref={address1Ref} value={info.address1}></IonInput>
                        <IonLabel position="floating">Address line 2</IonLabel>
                        <IonInput ref={address2Ref} value={info.address2}></IonInput>
                    </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                    <IonItem>
                        <IonLabel position="floating">Phone Number</IonLabel>
                        <IonInput ref={phoneRef} value={info.phone}></IonInput>
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

export default EditProfile;
