import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonAvatar, IonContent, IonText, IonImg, IonGrid, IonRow, IonCard, IonButton } from "@ionic/react";
import './Profile.css';


const Profile: React.FC = () => {
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
                    <IonGrid>
                        <IonRow>
                            <div className="contentCenter">
                                <IonAvatar className="profilePicture">
                                    <IonImg src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" />
                                </IonAvatar>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div className="contentCenter">
                                <IonText className="centerText"><h1>Username</h1></IonText>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div className="contentCenter">
                                <IonText className="centerText"><h1>Email</h1></IonText>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div className="contentCenter">
                                <IonText className="centerText"><h1>BirthDate</h1></IonText>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div className="contentCenter">
                                <IonText className="centerText"><h1>Address</h1></IonText>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div className="contentCenter">
                                <IonText className="centerText"><h1>PhoneNumber</h1></IonText>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div className="contentCenter">
                                <IonButton className="editProfileBtn" href="/editprofile">Edit Profile</IonButton>
                            </div>
                        </IonRow>
                    </IonGrid>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Profile;