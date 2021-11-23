import { IonAvatar, IonButton, IonButtons, IonCard, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { addOutline, pencilOutline, trashBinOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { firebaseFunction } from "../../services/firebase";

const CRUDCategories : React.FC = () => {
    const firebase = new firebaseFunction();
    const [categories, setCategories] = useState<Array<any>>([]);

    useEffect(() => {
        async function getData() {
            const categoriesFirebase = firebase.getData("categories");
            setCategories(await categoriesFirebase);
        }
        getData();
    }, []);

    console.log(categories);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>CRUD Categories</IonTitle>
                    <IonAvatar className='avatarImage' slot="end">
                        <img src="https://avatars3.githubusercontent.com/u/52709818?s=460&u=f9f8b8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8&v=4" />
                    </IonAvatar>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">CRUD Categories</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonTitle>Categories</IonTitle>
                            </IonCol>
                            <IonCol>
                                <IonButton expand="block" color="success"><IonIcon slot='icon-only' icon={addOutline} />Add Category</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <table className="table table-light table-striped table-hover table-responsive">
                        <thead>
                            <tr>
                                <th>
                                    <IonText>#</IonText>
                                </th>
                                <th>
                                    <IonText>Name</IonText>
                                </th>
                                <th>
                                    <IonText>Action</IonText>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <IonText>{index+1}</IonText>
                                        </td>
                                        <td>
                                            <IonText>{category.name}</IonText>
                                        </td>
                                        <td>
                                            <IonRow>
                                                <IonCol>
                                                    { window.innerWidth < 500 ? <IonButton color="warning"><IonIcon slot='icon-only' icon={pencilOutline} /></IonButton> : <IonButton color="warning"><IonIcon slot='icon-only' icon={pencilOutline} />Edit</IonButton>}
                                                </IonCol>
                                                <IonCol>
                                                    { window.innerWidth < 500 ? <IonButton color="danger"><IonIcon slot='icon-only' icon={trashBinOutline} /></IonButton> : <IonButton color="danger"><IonIcon slot='icon-only' icon={trashBinOutline} />Delete</IonButton>}
                                                </IonCol>
                                            </IonRow>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default CRUDCategories;