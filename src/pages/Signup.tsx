import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonAvatar, IonContent, IonCard, IonGrid, IonText, IonRow, IonCardContent, IonInput, IonItem, IonLabel, IonCardHeader, IonCardTitle, IonCol, IonButton, IonLoading } from "@ionic/react";
import { useState } from "react";
import firebaseInit from "../firebase_config";
import './Login.css';
import { toast } from "../toast";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const Signup: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const auth = getAuth(firebaseInit);

    async function Signup() {
        console.log(username);
        setBusy(true);
        if (password !== cpassword) {
            return toast('Password does not match');
        }
        if (username.trim() === '' || password.trim() === '') {
            return toast('Username and password cannot be empty');
        }

        try {
            const res = await createUserWithEmailAndPassword(auth, username, password)
            console.log(res);
            setBusy(false);
        } catch (error: any) {
            console.log(error);
            toast(error.message);
            setBusy(false);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Sign up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading message="Please wait..." duration={0} isOpen={busy} />
            <IonContent>
                <div className="contentCenter">
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Sign up</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="floating">Username</IonLabel>
                                            <IonInput type="text" onIonChange={(e: any) => setUsername(e.target.value + '@renebae.com')} />
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="floating">Password</IonLabel>
                                            <IonInput type="password" onIonChange={(e: any) => setPassword(e.target.value)} />
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="floating">Confirm Password</IonLabel>
                                            <IonInput type="password" onIonChange={(e: any) => setCpassword(e.target.value)} />
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonButton expand="block" color="tertiary" onClick={Signup}>Sign Up</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Signup;