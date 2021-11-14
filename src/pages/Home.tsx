import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonSearchbar, IonSlide, IonSlides, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import './Page.css';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseInit from "../firebase_config";

const slideOpts = {
  slidesPerView: 2.5,
  spaceBetween: 1,
  breakpoints: {
    1024: {
      slidesPerView: 4.5,
      spaceBetween: 1
    },
    768: {
      slidesPerView: 3.5,
      spaceBetween: 1
    },
    640: {
      slidesPerView: 2.5,
      spaceBetween: 1
    },
    320: {
      slidesPerView: 1.5,
      spaceBetween: 1
    }
  }
}

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
  const addData = async() => {
    try {
      const docRef = await addDoc(collection(db, "product"),{
        name: "RTX 2060",
        image: "https://firebasestorage.googleapis.com/v0/b/renebae-test.appspot.com/o/rtx2060.png?alt=media&token=5fa85bd8-07c3-4daf-b0e8-805f5654428c",
        price: "5,524,130",
        release: "Q1 2019",
        effectiveSpeed: 88,
        lighting: 114,
        reflection: 117,
        mrender: 133,
        gravity: 100
      });
      console.log("Document written with ID: ", docRef.id);
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

            <div className='categoryContent'>
              <IonSlides pager={false} options={slideOpts}>
                {product.map(product => (
                  <IonSlide key={product.id}>
                    <IonCard className='categoryCard'>
                      <img src={product.image} />
                      <IonCardContent>
                        <IonText className="ion-margin">{product.name}</IonText> <br/>

                        {product.price == 0 ?
                          <IonText className="ion-margin"></IonText>
                        :
                          <IonText className="ion-margin">{product.price}</IonText>
                        }
                        <br/>
                        <IonButton className="ion-margin"><IonIcon slot='icon-only' icon={cartOutline} />&nbsp;Buy Now</IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonSlide>
                ))}
              </IonSlides>

              {/* <IonSlides pager={false} options={slideOpts}>
                <IonSlide>
                  <IonCard className='categoryCard'>
                    <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <IonCardContent>
                      <IonText>Test price</IonText><br/>
                      <IonButton><IonIcon slot='icon-only' icon={cartOutline} /> Buy Now</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className='categoryCard'>
                    <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <IonCardContent>
                      <IonText>Test price</IonText><br/>
                      <IonButton><IonIcon slot='icon-only' icon={cartOutline} /> Buy Now</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className='categoryCard'>
                    <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <IonCardContent>
                      <IonText>Test price</IonText><br/>
                      <IonButton><IonIcon slot='icon-only' icon={cartOutline} /> Buy Now</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className='categoryCard'>
                    <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <IonCardContent>
                      <IonText>Test price</IonText><br/>
                      <IonButton><IonIcon slot='icon-only' icon={cartOutline} /> Buy Now</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className='categoryCard'>
                    <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <IonCardContent>
                      <IonText>Test price</IonText><br/>
                      <IonButton><IonIcon slot='icon-only' icon={cartOutline} /> Buy Now</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
              </IonSlides> */}

            </div>
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
            <div className='categoryContent'>
              <IonSlides pager={false} options={slideOpts}>
                <IonSlide>
                  <IonCard className='categoryCard'>
                    <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <IonCardContent>
                      <IonText>Test price</IonText><br/>
                      <IonButton><IonIcon slot='icon-only' icon={cartOutline} /> Buy Now</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className='categoryCard'>
                    <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <IonCardContent>
                      <IonText>Test price</IonText><br/>
                      <IonButton><IonIcon slot='icon-only' icon={cartOutline} /> Buy Now</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className='categoryCard'>
                    <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <IonCardContent>
                      <IonText>Test price</IonText><br/>
                      <IonButton><IonIcon slot='icon-only' icon={cartOutline} /> Buy Now</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className='categoryCard'>
                    <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <IonCardContent>
                      <IonText>Test price</IonText><br/>
                      <IonButton><IonIcon slot='icon-only' icon={cartOutline} /> Buy Now</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
                <IonSlide>
                  <IonCard className='categoryCard'>
                    <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                    <IonCardContent>
                      <IonText>Test price</IonText><br/>
                      <IonButton><IonIcon slot='icon-only' icon={cartOutline} /> Buy Now</IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonSlide>
              </IonSlides>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
