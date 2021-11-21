import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonAvatar, IonContent, IonCard, IonGrid, IonText, IonRow, IonCardContent, IonInput, IonItem, IonLabel, IonCardHeader, IonCardTitle, IonCol, IonButton } from "@ionic/react";
import './Login.css';

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div className="contentCenter">
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Login</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="floating">Username</IonLabel>
                                            <IonInput type="password"/>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="floating">Password</IonLabel>
                                            <IonInput type="password"/>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="5">
                                        <IonButton expand="block">Login</IonButton>
                                    </IonCol>
                                    <IonCol size="2">
                                    </IonCol>
                                    <IonCol size="5">
                                        <IonButton expand="block" color="tertiary">Sign Up</IonButton>
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

export default Login;