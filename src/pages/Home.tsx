import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonSearchbar, IonSlide, IonSlides, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import './Page.css';
import { addDoc, collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseInit from "../firebase_config";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router';
import { userInfo } from 'os';
import { firebaseFunction } from "../services/firebase";

const Home: React.FC = () => {
  const db = getFirestore(firebaseInit);
  const storage = getStorage(firebaseInit);
  const firebase = new firebaseFunction();
  const [product, setProduct] = useState<Array<any>>([]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [cart, setCart] = useState<Array<any>>([]);
  const [showToast1, setShowToast1] = useState(false);
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
  // const addData = async () => {
  //   try {
  //     dummyData.forEach(async element => {
  //       const docRef = await addDoc(collection(db, "product"), element);
  //       console.log("Document written with ID: ", docRef.id);
  //     });
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  const addToCart = async (idP: string, image: string, name: string, price: string) => {
    //console.log(cart.length)
    let i = 1;
    let qty = 0;
    if (cart.length === 0) {
      var obj = {
        idP: idP,
        name: name,
        image: image,
        price: price,
        qty: 1
      }
      console.log("asd");
      const myJSON = JSON.stringify(obj);
      addData(myJSON);
    } else {
      console.log(cart);
      let count = 0;
      cart.filter(cart => cart.userId === user?.uid).map(cart => {
        if (JSON.parse(cart.items).idP === idP) {
          count++;
        }
      })
      cart.filter(cart => cart.userId === user?.uid).map(cart => {
        if (JSON.parse(cart.items).idP === idP) {
          qty = parseInt(JSON.parse(cart.items).qty);
          qty++;
          console.log("qty : ", qty)
          var obj = {
            idP: JSON.parse(cart.items).idP,
            name: JSON.parse(cart.items).name,
            image: JSON.parse(cart.items).image,
            price: JSON.parse(cart.items).price,
            qty: qty
          }
          const myJSON = JSON.stringify(obj);
          console.log("asd")
          updateData(myJSON, cart.userId, cart.id);
        }
        else if(count == 0){
          obj = {
            idP: idP,
            name: name,
            image: image,
            price: price,
            qty: 1
          }
          console.log("add produk baru");
          const myJSON = JSON.stringify(obj);
          addData(myJSON);
        }
      })
    }
    history.push('/Home')
  }

  const updateData = async (items: string, userId: string, idC: string) => {
    const docRef = doc(db, "cart", idC);
    try {
      await updateDoc(docRef, { items, userId });
      console.log("Document updated successfully, ", docRef.id);
    } catch (e) {
      console.error("Error updating document: ", e)
    }
  }

  const addData = async (myJSON: string) => {
    try {
      const docRef = await addDoc(collection(db, "cart"), {
        userId: user?.uid,
        // iamge: image,
        // name: name,
        // price: price
        items: myJSON
      });
      console.log("Dcocument written with ID: ", docRef.id);
    } catch (e) {
      console.log("Error Adding document", e);
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
        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message="Barang sudah ada dikeranjang anda."
          duration={1000}
        />
        <IonCard color="secondary">
          <IonCardContent>
            <IonText color="light"><div className='center-text'><h1>Banner Ads</h1><br /><h1>728 X 90</h1></div></IonText>
          </IonCardContent>
        </IonCard>

        <IonSearchbar></IonSearchbar>
        <IonButton onClick={() => firebase.deleteData("categories", "CWVwbAKjkn8L8swCkAaQ")}>wee</IonButton>

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
                        <IonButton className="ion-margin" onClick={isSignedIn ? () => addToCart(product.id, product.image, product.name, product.price) : signedOut}><IonIcon slot='icon-only' icon={cartOutline} />&nbsp;Buy Now</IonButton>
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
                        <IonButton className="ion-margin" onClick={isSignedIn ? () => addToCart(product.id, product.image, product.name, product.price) : signedOut}><IonIcon slot='icon-only' icon={cartOutline} />&nbsp;Buy Now</IonButton>
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
