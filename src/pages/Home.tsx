import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonSearchbar, IonSlide, IonSlides, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import './Page.css';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseInit from "../firebase_config";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router';
import { firebaseFunction } from "../services/firebase";

const Home: React.FC = () => {
  const db = getFirestore(firebaseInit);
  const storage = getStorage(firebaseInit);
  const firebase = new firebaseFunction();
  const [product, setProduct] = useState<Array<any>>([]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const history = useHistory();
  const auth = getAuth(firebaseInit);
  const user = auth.currentUser;
  //Read data
  //Usage getData:
  // Call function
  useEffect(() => {
    async function getData() {
      const productFirebase = firebase.getData("product");
      setProduct(await productFirebase);
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsSignedIn(true);
        console.log('uid:', uid);
      } else {
        setIsSignedIn(false);
      }
    });
    getData();
  }, []);


  //setProduct(productFirebase.map((doc) => ({...doc.data(), id:doc.id})));
  

    


  // useEffect(() => {
  //   async function getData() {
  //     const querySnapshot = await getDocs(collection(db, "cart"));
  //     console.log('querySnapshot', querySnapshot);
  //     setProduct(querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));

  //     querySnapshot.forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data()}`);
  //       console.log('doc:', doc);  
  //     });
  //   }
  //   getData();
  //   console.log(JSON.parse(product[0].gravity));
  // }, []);

  const json = [
    {"Item Code":"sthing","Product Name":"sthing","Qantity":"1","Unit Price":"0","Item Total":"0"},
    {"Item Code":"sthing","Product Name":"sthing","Qantity":"1","Unit Price":"0","Item Total":"0"},
    {"Item Code":"sthing","Product Name":"sthing","Qantity":"1","Unit Price":"0","Item Total":"0"},
    {"Item Code":"sthing","Product Name":"sthing","Qantity":"1","Unit Price":"0","Item Total":"0"}
  ];

  //Dummy Data
  const dummyData = [{
    name: "Quadro RTX 4000",
    image: "https://firebasestorage.googleapis.com/v0/b/renebae-f7b76.appspot.com/o/gigabyte_gigabyte-vga-nvidia-quadro-rtx-4000_full02.jpg?alt=media&token=f24dff28-dd45-4dd9-9ec2-ef35f81a7378",
    price: "5.000.000",
    category: "multimedia",
    release: "Q1 2020",
    effectiveSpeed: 90,
    lighting: 100,
    reflection: 100,
    mrender: 110,
    gravity: JSON.stringify(json)
  }];

  //data user
  const dummyDataUser = [{
    uid: user?.uid,
    username: "haneure",
    name: "Christian Halim",
    image: "https://firebasestorage.googleapis.com/v0/b/renebae-f7b76.appspot.com/o/Chris%20crop.png?alt=media&token=497301d1-0692-42ec-bfae-c2aceccf09d4",
    email: user?.email,
    photoURL: user?.photoURL,
    phone: user?.phoneNumber,
    birthdate: "17-November-2000",
    address1: "Jl. Kenari No. 7 RT/RW 001/002 Anggut Dalam Bengkulu",
    address2: "Kec. Ratu Samban 38222 Bengkulu"
  }];

  const addData = async () => {
    try {
      dummyDataUser.forEach(async element => {
        const docRef = await addDoc(collection(db, "user"), element);
        console.log("Document written with ID: ", docRef.id);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const signedIn = () => {
    console.log('signedIn');
  }

  const signedOut = () => {
    history.push('/page/Login');
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
        <IonButton onClick={addData}>wee</IonButton>

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
            <br />

            <IonGrid className="ion-no-padding content">
              <IonRow>
                <div className="filter">
                {product.filter(product=>product.category === 'gaming').map(product => (
                  <IonCard key={product.id} className='categoryCard filter-options'>
                    <img className='cardImages' src={product.image} />
                    <IonCardContent>
                      <IonText className="ion-margin">{product.name}</IonText> <br/>

                        {product.price == 0 ?
                          <IonText className="ion-margin"></IonText>
                          :
                          <IonText className="ion-margin">Rp {product.price}</IonText>
                        }
                        <br />
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
            <br />
            <IonGrid className="ion-no-padding content">
              <IonRow>
                <div className="filter">
                {product.filter(product=>product.category === 'electronic').map(product => (
                  <IonCard key={product.id} className='categoryCard filter-options'>
                    <img className='cardImages' src={product.image} />
                    <IonCardContent>
                      <IonText className="ion-margin">{product.name}</IonText> <br/>

                        {product.price == 0 ?
                          <IonText className="ion-margin"></IonText>
                          :
                          <IonText className="ion-margin">Rp {product.price}</IonText>
                        }
                        <br />
                        <IonButton className="ion-margin" onClick={isSignedIn ? signedIn : signedOut}><IonIcon slot='icon-only' icon={cartOutline} />&nbsp;Buy Now</IonButton>
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
