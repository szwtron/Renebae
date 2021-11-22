import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonSearchbar, IonSlide, IonSlides, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import './Page.css';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseInit from "../firebase_config";

const Home: React.FC = () => {
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

  //Dummy Data
  const dummyData = [{
    name: "RTX 2060",
    image: "https://firebasestorage.googleapis.com/v0/b/renebae-f7b76.appspot.com/o/download.jpg?alt=media&token=e7f8f42f-0814-4a55-9599-470fe8527fa9",
    price: "5.524.130",
    category: "gaming",
    release: "Q1 2019",
    effectiveSpeed: 88,
    lighting: 114,
    reflection: 117,
    mrender: 133,
    gravity: 100
  }, {
    name: "MX 230",
    image: "https://firebasestorage.googleapis.com/v0/b/renebae-f7b76.appspot.com/o/nvidia_geforce_mx230_chip.jpg?alt=media&token=3b700a7d-69eb-414a-a9e8-053127020ef4",
    price: "1.000.000",
    category: "electronics",
    release: "Q1 2017",
    effectiveSpeed: 40,
    lighting: 80,
    reflection: 100,
    mrender: 90,
    gravity: 100
  }, {
    name: "Quadro RTX 4000",
    image: "https://firebasestorage.googleapis.com/v0/b/renebae-f7b76.appspot.com/o/gigabyte_gigabyte-vga-nvidia-quadro-rtx-4000_full02.jpg?alt=media&token=f24dff28-dd45-4dd9-9ec2-ef35f81a7378",
    price: "5.000.000",
    category: "multimedia",
    release: "Q1 2020",
    effectiveSpeed: 90,
    lighting: 100,
    reflection: 100,
    mrender: 110,
    gravity: 100
  }];
  const addData = async () => {
    try {
      dummyData.forEach(async element => {
        const docRef = await addDoc(collection(db, "product"), element);
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
          <IonTitle>Renebae</IonTitle>
          <IonAvatar className='avatarImage' slot="end">
            <img src="https://avatars3.githubusercontent.com/u/52709818?s=460&u=f9f8b8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8&v=4" />
          </IonAvatar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Renebae</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard color="secondary">
          <IonCardContent>
            <IonText color="light"><div className='center-text'><h1>Banner Ads</h1><br /><h1>728 X 90</h1></div></IonText>
          </IonCardContent>
        </IonCard>

        <IonSearchbar></IonSearchbar>

        <IonCard>
          <IonCardContent>
            <div className='categoryTitle'>
              <div className='alignleft'>
                <IonText>Gaming</IonText>
              </div>
              <div className='alignright'>
                <IonText>View All</IonText>
              </div>
            </div>
            <br/>

            <IonGrid className="ion-no-padding content">
              <IonRow>
                <div className="filter">
                {product.filter(product=>product.category === 'gaming').map(product => (
                  <IonCard className='categoryCard filter-options'>
                    <img className='cardImages' src={product.image} />
                    <IonCardContent>
                      <IonText className="ion-margin">{product.name}</IonText> <br/>

                      {product.price == 0 ?
                        <IonText className="ion-margin"></IonText>
                      :
                        <IonText className="ion-margin">Rp {product.price}</IonText>
                      }
                      <br/>
                      <IonButton className="ion-margin"><IonIcon slot='icon-only' icon={cartOutline} />&nbsp;Buy Now</IonButton>
                    </IonCardContent>
                  </IonCard>
                ))}
                </div>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard color="secondary">
          <IonCardContent>
            <IonText color="light"><div className='center-text'><h1>Banner Ads</h1><br /><h1>728 X 90</h1></div></IonText>
          </IonCardContent>
        </IonCard>

        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol>
              <IonCard color="secondary">
                <IonCardContent>
                  <IonText color="light"><div className='center-text'><h1>Banner Ads</h1><br /><h1>350 X 90</h1></div></IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard color="secondary">
                <IonCardContent>
                  <IonText color="light"><div className='center-text'><h1>Banner Ads</h1><br /><h1>350 X 90</h1></div></IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonCard>
          <IonCardContent>
            <div className='categoryTitle'>
              <div className='alignleft'>
                <IonText>Electronic</IonText>
              </div>
              <div className='alignright'>
                <IonText>View All</IonText>
              </div>
            </div>
            <br/>
            <IonGrid className="ion-no-padding content">
              <IonRow>
                <div className="filter">
                {product.filter(product=>product.category === 'electronic').map(product => (
                  <IonCard className='categoryCard filter-options'>
                    <img className='cardImages' src={product.image} />
                    <IonCardContent>
                      <IonText className="ion-margin">{product.name}</IonText> <br/>

                      {product.price == 0 ?
                        <IonText className="ion-margin"></IonText>
                      :
                        <IonText className="ion-margin">Rp {product.price}</IonText>
                      }
                      <br/>
                      <IonButton className="ion-margin"><IonIcon slot='icon-only' icon={cartOutline} />&nbsp;Buy Now</IonButton>
                    </IonCardContent>
                  </IonCard>
                ))}
                </div>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
