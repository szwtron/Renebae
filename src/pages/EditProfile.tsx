import { getAuth } from '@firebase/auth';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import firebaseInit from '../firebase_config';
import { firebaseFunction } from "../services/firebase";
import { useHistory } from 'react-router';
import './Page.css';
import { getMetadata } from '@firebase/storage';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { camera } from 'ionicons/icons';
import {base64FromPath} from "@ionic/react-hooks/filesystem";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditProfile: React.FC = () => {
  let [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined;
    preview: string;
  }>();
  const { name } = useParams<{ name: string; }>();
  const [userInfo, setUser] = useState<Array<any>>([]);
  
  const db = getFirestore(firebaseInit);
  const storage = getStorage(firebaseInit);
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

  useIonViewWillEnter(() => {
    getData();
  });

  const getData = async () => {
    const userFirebase = await firebase.getData("user");
    //console.log(userFirebase);
    setUser(userFirebase);
    userInfo.filter(info => info.userId == user?.uid).map(user => {
      setTakenPhoto({
       path: user.image,
       preview: user.blob
     });
    });
    //console.log(takenPhoto?.preview);
  };

  const updateData = async () => {
    const fileName = usernameRef.current?.value + '.jpg';
    const base64Image  = await base64FromPath(takenPhoto!.preview);
    fetch(base64Image)
    .then(async(res) => {
        const parsedBlob = await res.blob();

        //Upload photo to firebase
        const storageRef = ref(storage, fileName);
        uploadBytes(storageRef, parsedBlob).then((snapshot) => {
        console.log('upload file success');

        //Get photo URL
        getDownloadURL(ref(storage, fileName)).then((url)=>{
          const field = {
            username: usernameRef.current?.value,
            email: emailRef.current?.value,
            name: nameRef.current?.value,
            birthdate: dateRef.current?.value,
            address1: address1Ref.current?.value,
            address2: address2Ref.current?.value,
            phone: phoneRef.current?.value as number,
            image: url,
            blob: base64Image
          }

          //Update the data
          userInfo.filter(info => info.userId == user?.uid).map(user => {
            firebase.updateData("user", user.id, field);
          })
          history.push('/page/Profile');
        })
      })
    });
  };

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri, 
        source: CameraSource.Camera,
        quality: 90,
        width: 500
    });
    console.log(photo);

    if(!photo || /*!photo.path ||*/ !photo.webPath){
        return;
    }
    
    setTakenPhoto({
        path: photo.path,
        preview: photo.webPath
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {userInfo.filter(info=>info.uid === user?.uid).map(info => (
            <IonGrid key={info.uid} className="ion-padding">
                <IonRow className="">
                  <IonCol className="ion-text-center">
                    <div className="image-preview">
                        {takenPhoto?.preview == null && <h3>Silahkan tambah profile picture.</h3>}
                        {takenPhoto && <img src={takenPhoto?.preview} alt="Preview"/>}
                    </div>
                    <IonButton fill="clear" onClick={takePhotoHandler}>
                        <IonIcon slot="start" icon={camera}></IonIcon>
                        <IonLabel>Take Photo</IonLabel>
                    </IonButton>
                  </IonCol>
                </IonRow>
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
