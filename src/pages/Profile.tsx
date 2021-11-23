import { addDoc, collection } from "@firebase/firestore";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonAvatar, IonContent, IonText, IonImg, IonGrid, IonRow, IonCard, IonButton, useIonViewWillEnter } from "@ionic/react";
import { info } from "console";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebaseInit from "../firebase_config";
import { firebaseFunction } from "../services/firebase";
import './Profile.css';


const Profile: React.FC = () => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [userInfo, setUser] = useState<Array<any>>([]);

    const db = getFirestore(firebaseInit);
    const auth = getAuth(firebaseInit);
    const user = auth.currentUser;
    const firebase = new firebaseFunction();
    const history = useHistory();

    useIonViewWillEnter(() => {
        getData();
    });

    const getData = async () => {
        const productFirebase = firebase.getData("user");
        setUser(await productFirebase);
    }

    const dummyData = [{
    uid: user?.uid,
    username: user?.displayName,
    name: "Christian Halim",
    image: "https://firebasestorage.googleapis.com/v0/b/renebae-f7b76.appspot.com/o/Chris%20crop.png?alt=media&token=497301d1-0692-42ec-bfae-c2aceccf09d4",
    email: user?.email,
    photoURL: user?.photoURL,
    phone: user?.phoneNumber,
    birthdate: "17-November-2000",
    address1: "Jl. Kenari No. 7 RT/RW 001/002 Anggut Dalam Bengkulu",
    address2: "Kec. Ratu Samban 38222 Bengkulu"
  }];

  const addData = async () => {
    try {
      dummyData.forEach(async element => {
        const docRef = await addDoc(collection(db, "user"), element);
        console.log("Document written with ID: ", docRef.id);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
      
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    {userInfo.filter(info=>info.uid === user?.uid).map(info => (
                        <IonGrid key={info.uid}>
                            <IonRow>
                                <div className="contentCenter">
                                    <IonAvatar className="profilePicture">
                                        <IonImg src={info.image} />
                                    </IonAvatar>
                                </div>
                            </IonRow>
                            <IonRow>
                                <div className="contentCenter">
                                    <IonText className="centerText"><h1>{info.name}</h1></IonText>
                                </div>
                            </IonRow>
                            <IonRow>
                                <div className="contentCenter">
                                    <IonText className="centerText"><h1>{info.email}</h1></IonText>
                                </div>
                            </IonRow>
                            <IonRow>
                                <div className="contentCenter">
                                    <IonText className="centerText"><h1>{info.birthdate}</h1></IonText>
                                </div>
                            </IonRow>
                            <IonRow>
                                <div className="contentCenter">
                                    <IonText className="centerText"><h1>{info.phone}</h1></IonText>
                                </div>
                            </IonRow>
                            <IonRow>
                                <div className="contentCenter">
                                    <IonText className="centerText"><h1>{info.address1} <br/> {info.address2}</h1></IonText>
                                </div>

                                    
                            </IonRow>
                            <IonRow>
                                <div className="contentCenter">
                                    <IonButton className="editProfileBtn" routerLink="/page/editprofile">Edit Profile</IonButton>
                                </div>
                            </IonRow>
                        </IonGrid>
                    ))}
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Profile;