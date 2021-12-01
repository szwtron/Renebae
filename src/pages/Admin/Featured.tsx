import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonAvatar, IonLoading, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { useState } from "react";

const Featured: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Renebae</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading message="Please wait..." duration={0} isOpen={busy} />
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Featured</IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>ads</IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Featured