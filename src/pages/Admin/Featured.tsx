import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonAvatar, IonLoading, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { firebaseFunction } from "../../services/firebase";
import { toast } from "../../toast";

const Featured: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false);
    const [featured, setFeatured] = useState<Array<any>>([]);
    const firebase = new firebaseFunction();
    useIonViewWillEnter(() => {
        getData();
    });

    async function getData() {
        setBusy(true);
        try {
            const featuredFirebase = firebase.getData("featured");
            setFeatured(await featuredFirebase);
        } catch (e: any) {
            toast(e.message);
        }
        setBusy(false);
    }

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