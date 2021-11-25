import { getAuth } from "@firebase/auth";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRadio, IonCol, IonGrid, IonRow, IonCard, IonItem, IonButton, useIonViewWillEnter } from "@ionic/react";
import { idCard } from "ionicons/icons";
import { userInfo } from "os";
import { useEffect, useState } from "react";
import firebaseInit from "../firebase_config";
import { firebaseFunction } from "../services/firebase";
import { toast } from "../toast";

const Compare: React.FC = () => {
    const [compare, setCompare] = useState<Array<any>>([]);
    const firebase = new firebaseFunction;
    const auth = getAuth(firebaseInit);
    const user = auth.currentUser;

    useIonViewWillEnter(() => {
        getData();   
    });

    const getData = async () => {
        const compareFirebase = firebase.getData("compare");
        setCompare(await compareFirebase);
        console.log(compare);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Compare</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    {compare.filter(compare=>compare.userId === user?.uid).map(compared => {
                    <IonRow>
                        <IonCol size="1"><h1>{compared.userId}</h1></IonCol>
                        
                        <IonCol>
                            <IonItem className="ion-no-padding">
                                
                                <img src="{dataArray[0].image}"></img>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem className="ion-no-padding">    
                                <img src="{dataArray[1].image}"></img>
                            </IonItem>                        
                        </IonCol>
                        <IonCol className="ion-align-self-center" size="2">
                            <IonButton>Remove</IonButton>
                        </IonCol>
                    </IonRow>
                    })}

                    

                    

                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Compare;