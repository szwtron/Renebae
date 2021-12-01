import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonAvatar, IonLoading, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, useIonViewWillEnter, IonCardContent, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { useRef, useState } from "react";
import { firebaseFunction } from "../../services/firebase";
import { toast } from "../../toast";

const Featured: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false);
    const [featured, setFeatured] = useState<Array<any>>([]);
    const [featured1, setFeatured1] = useState<Array<any>>([]);

    const [categoryName, setCategory] = useState<Array<any>>([]);
    const firebase = new firebaseFunction();
    const categoryRef = useRef<HTMLIonSelectElement>(null);
    const category2Ref = useRef<HTMLIonSelectElement>(null);

    useIonViewWillEnter(() => {
        getData();
    });

    async function getData() {
        setBusy(true);
        try {
            const categoryFirebase = firebase.getData("categories");
            setCategory(await categoryFirebase);
            const featuredFirebase = firebase.getData("featured");
            setFeatured(await featuredFirebase);
        } catch (e: any) {
            toast(e.message);
        }
        setBusy(false);
    }

    function updateFeaturedCategories() {
        const category1 = categoryRef.current!.value;
        const category2 = category2Ref.current!.value;
        const field = {
            first: category1,
            second: category2
        }
        setBusy(true);
        try {
            firebase.updateData("featured", "4dsi3AkHQDjDo7JLHKEQ", field);
            getData();
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
                                    <IonCardTitle>Featured Categories</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonRow>
                                        {featured.map((item: any, index: number) => {
                                            return(
                                                <IonCol sizeSm="12" sizeMd="6">
                                                    <IonSelect ref={categoryRef} value={item.first} onIonChange={() => updateFeaturedCategories()}>
                                                    {categoryName.map((cat) => (
                                                        <IonSelectOption>{cat.name}</IonSelectOption>
                                                    ))}
                                                    </IonSelect>
                                                    <IonSelect ref={category2Ref} value={item.second} onIonChange={() => updateFeaturedCategories()}>
                                                    {categoryName.map((cat) => (
                                                        <IonSelectOption>{cat.name}</IonSelectOption>
                                                    ))}
                                                    </IonSelect>
                                                </IonCol>
                                            )
                                        })}
                                </IonRow>
                                </IonCardContent>
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