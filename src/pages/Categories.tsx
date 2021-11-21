import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonSlide, IonSlides, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { cartOutline, closeCircleOutline } from 'ionicons/icons';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseInit from "../firebase_config";
import './Categories.css';
import { useState, useEffect } from 'react';

const Categories: React.FC = () => {
    const db = getFirestore(firebaseInit);
    const storage = getStorage(firebaseInit);
    const [product, setProduct] = useState<Array<any>>([]);

    //Read data
    useEffect(() => {
      async function getData() {
        const querySnapshot = await getDocs(collection(db, "product"));
        console.log('querySnapshot', querySnapshot);
        setProduct(querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));

        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          console.log('doc:', doc);
        });
      }
      getData();
    }, []);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Renebae</IonTitle>
                    <IonAvatar className='avatarImage' slot="end">
                        <img src="https://avatars3.githubusercontent.com/u/52709818?s=460&u=f9f8b8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8&v=4" />
                    </IonAvatar>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <IonGrid>
                {/* <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar> */}
                {/* <IonSelect value={gender} placeholder="Select One" onIonChange={e => setGender(e.detail.value)}>
                    <IonSelectOption value="female">Female</IonSelectOption>
                    <IonSelectOption value="male">Male</IonSelectOption>
                </IonSelect> */}

                    <IonSearchbar placeholder="Contoh: PS5, PS6, PS7"></IonSearchbar>
                    <IonSelect placeholder="Select One">
                        <IonSelectOption value="technology">Technology</IonSelectOption>
                        <IonSelectOption value="outfit">Outfit</IonSelectOption>
                    </IonSelect>
                    <IonRow>
                        {product.map(product => (
                            <IonCol size='6'>
                                <IonCard>
                                    <img className="img-item" src={product.image}/>
                                    <IonCardTitle className="center-txt">{product.name}</IonCardTitle>
                                    <IonCardContent className="center-txt font-size20">
                                    {product.price == 0 ?
                                        <div>
                                            <IonText className="ion-margin"></IonText>
                                            <br/><IonButton className="center-txt" color="danger"><IonIcon icon={closeCircleOutline}/>Out of Stock</IonButton>
                                        </div>
                                    :
                                        <div>
                                            <IonText className="ion-margin">Rp {product.price}</IonText>
                                            <br/><IonButton className="center-txt"><IonIcon icon={cartOutline}/>Add to Cart</IonButton>
                                        </div>
                                    }
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Categories;