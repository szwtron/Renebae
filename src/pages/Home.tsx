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
import { cartFunction } from '../services/cart';

const Home: React.FC = () => {
  const db = getFirestore(firebaseInit);
  const storage = getStorage(firebaseInit);
  const firebase = new firebaseFunction();
  const carts = new cartFunction();
  const [product, setProduct] = useState<Array<any>>([]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [cart, setCart] = useState<Array<any>>([]);
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
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
      const cartFirebase = firebase.getData("cart");
      setCart(await cartFirebase);
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
  },[]);

  const json = [
    { "Item Code": "sthing", "Product Name": "sthing", "Qantity": "1", "Unit Price": "0", "Item Total": "0" },
    { "Item Code": "sthing", "Product Name": "sthing", "Qantity": "1", "Unit Price": "0", "Item Total": "0" },
    { "Item Code": "sthing", "Product Name": "sthing", "Qantity": "1", "Unit Price": "0", "Item Total": "0" },
    { "Item Code": "sthing", "Product Name": "sthing", "Qantity": "1", "Unit Price": "0", "Item Total": "0" }
  ];

  const signedOut = () => {
    history.push('/page/Login');
  }

  async function addToCart(idP: string, image: string, name: string, price: string) {
    //console.log(cart.length)
    let i = 1;
    let qty = 0;
    let dataArray: Array<string>=[];
    let updatedDataArray: Array<string> = [];
    let count = 0;
    console.log(cart);
    let cartId: string;
    // cart.filter(cart => cart.userId === user?.uid).map(cart => {
    //   dataArray = (cart.items);
    //   let iter=0;
    //   console.log(dataArray)
    //   dataArray.forEach((e: any) => {
    //     console.log(JSON.parse(e).idP)
    //     i++;
    //     console.log(i)
    //     console.log(idP)
    //     if (JSON.parse(e).idP != idP) {
    //       var obj = {
    //         idP: idP,
    //         name: name,
    //         image: image,
    //         price: price,
    //         qty: 1
    //       }
    //       const myJSON = JSON.stringify(obj);
    //       dataArray.push(myJSON);
    //       count=1;
    //       console.log(dataArray);
    //       //carts.updateData(dataArray, user?.uid, cartId);
    //     }
    //   });

    cart.filter(cart => cart.userId === user?.uid).map(cart => {
      cartId = cart.id;
      dataArray = (cart.items);
      if(dataArray.length==0){
        var obj = {
          idP: idP,
          name: name,
          image: image,
          price: price,
          qty: 1
        }
        const myJSON = JSON.stringify(obj);
        dataArray.push(myJSON);
        console.log(dataArray);
        carts.updateData(dataArray, user?.uid, cartId);
        count=2; 
        console.log("succes");
      }
      else{
        dataArray.forEach((e: any) => {
          if (JSON.parse(e).idP === idP) {
            count = 1;
          }
        });
      }
    })

    cart.filter(cart => cart.userId === user?.uid).map(cart => {
      cartId = cart.id;
      dataArray = (cart.items);
      dataArray.forEach((e: any) => {
        if (count == 1) {
          if (JSON.parse(e).idP === idP) {
            qty = JSON.parse(e).qty;
            qty++;
            var obj = {
              idP: JSON.parse(e).idP,
              name: JSON.parse(e).name,
              image: JSON.parse(e).image,
              price: JSON.parse(e).price,
              qty: qty
            }
            const myJSON = JSON.stringify(obj);
            updatedDataArray.push(myJSON);
          }
          else {
            qty = JSON.parse(e).qty;
            obj = {
              idP: JSON.parse(e).idP,
              name: JSON.parse(e).name,
              image: JSON.parse(e).image,
              price: JSON.parse(e).price,
              qty: qty
            }
            const myJSON = JSON.stringify(obj);
            updatedDataArray.push(myJSON);
          }
          console.log(updatedDataArray);
          carts.updateData(updatedDataArray, user?.uid, cartId);
        }
        else if(count == 0) {
           obj = {
            idP: idP,
            name: name,
            image: image,
            price: price,
            qty: 1
          }
          const myJSON = JSON.stringify(obj);
          dataArray.push(myJSON);
          console.log(dataArray);
          carts.updateData(dataArray, user?.uid, cartId);
          count = 3;
        }
      });
    })

    // dataArray.forEach((e: any) => {
    //   if(count == 0){
    //     if (JSON.parse(e).idP === idP) {
    //       qty = JSON.parse(e).qty;
    //       qty++;
    //       var obj = {
    //         idP: JSON.parse(e).idP,
    //         name: JSON.parse(e).name,
    //         image: JSON.parse(e).image,
    //         price: JSON.parse(e).price,
    //         qty: qty
    //       }
    //       const myJSON = JSON.stringify(obj);
    //       updatedDataArray.push(myJSON);
    //     }
    //     else {
    //       qty = JSON.parse(e).qty;
    //       obj = {
    //         idP: JSON.parse(e).idP,
    //         name: JSON.parse(e).name,
    //         image: JSON.parse(e).image,
    //         price: JSON.parse(e).price,
    //         qty: qty
    //       }
    //       const myJSON = JSON.stringify(obj);
    //       updatedDataArray.push(myJSON);
    //     }
    //     console.log(updatedDataArray);
    //   }
    //   cartId = cart.id;
    // });

    // carts.updateData(updatedDataArray, user?.uid, cartId);
    // })

    //history.push('/Home')
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
            <br />

            <IonGrid className="ion-no-padding content">
              <IonRow>
                <div className="filter">
                  {product.filter(product => product.category === 'multimedia').map(product => (
                    <IonCard key={product.id} className='categoryCard filter-options'>
                      <img className='cardImages' src={product.image} />
                      <IonCardContent>
                        <IonText className="ion-margin">{product.name}</IonText> <br />

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
                  {product.filter(product => product.category === 'electronic').map(product => (
                    <IonCard key={product.id} className='categoryCard filter-options'>
                      <img className='cardImages' src={product.image} />
                      <IonCardContent>
                        <IonText className="ion-margin">{product.name}</IonText> <br />

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
