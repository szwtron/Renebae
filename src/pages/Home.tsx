import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSlide,
  IonSlides,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { cartOutline, gitCompareOutline, heartOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import "./Home.css";
import "./Page.css";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseInit from "../firebase_config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router";
import { userInfo } from "os";
import { firebaseFunction } from "../services/firebase";
import { cartFunction } from "../services/cart";
import { toast } from "../toast";

const Home: React.FC = () => {
  const db = getFirestore(firebaseInit);
  const firebase = new firebaseFunction();
  const carts = new cartFunction();
  const [busy, setBusy] = useState<boolean>(false);
  const [wish, setWish] = useState<Array<any>>([]);
  const [product, setProduct] = useState<Array<any>>([]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [cart, setCart] = useState<Array<any>>([]);
  const [compare, setCompare] = useState<Array<any>>([]);
  const history = useHistory();
  const auth = getAuth(firebaseInit);
  const user = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);

  useIonViewWillEnter(() => {
    getData();
  });

  async function getData() {
    setBusy(true);
    try {
      const productFirebase = firebase.getData("product");
      setProduct(await productFirebase);
      const cartFirebase = firebase.getData("cart");
      setCart(await cartFirebase);
      const wishFirebase = firebase.getData("wishlists");
      setWish(await wishFirebase);
      const compareFirebase = firebase.getData("compare");
      setCompare(await compareFirebase);
    } catch (e: any) {
      toast(e.message);
    }
    setBusy(false);
  }

  const signedOut = () => {
    history.push("/page/Login");
  };

  async function addToCart(
    idP: string,
    image: string,
    name: string,
    price: string
  ) {
    setBusy(true);
    let i = 1;
    let qty = 0;
    let dataArray: Array<any> = [];
    let updatedDataArray: Array<any> = [];
    let count = 0;

    let cartId: string;
    try {
      cart
        .filter((cart) => cart.userId === user?.uid)
        .map((cart) => {
          cartId = cart.id;
          dataArray = cart.items;
          if (dataArray.length == 0) {
            var obj = {
              idP: idP,
              name: name,
              image: image,
              price: price,
              qty: 1,
            };
            dataArray.push(obj);
            carts.updateData(dataArray, user?.uid, cartId, "cart");
            count = 2;
          } else {
            dataArray.forEach((e: any) => {
              if (e.idP === idP) {
                count = 1;
              }
            });
          }
        });

      cart
        .filter((cart) => cart.userId === user?.uid)
        .map((cart) => {
          cartId = cart.id;
          dataArray = cart.items;
          dataArray.forEach((e: any) => {
            if (count == 1) {
              if (e.idP === idP) {
                qty = e.qty;
                qty++;
                var obj = {
                  idP: e.idP,
                  name: e.name,
                  image: e.image,
                  price: e.price,
                  qty: qty,
                };
                updatedDataArray.push(obj);
              } else {
                qty = e.qty;
                obj = {
                  idP: e.idP,
                  name: e.name,
                  image: e.image,
                  price: e.price,
                  qty: qty,
                };
                updatedDataArray.push(obj);
              }
              carts.updateData(updatedDataArray, user?.uid, cartId, "cart");
            } else if (count == 0) {
              obj = {
                idP: idP,
                name: name,
                image: image,
                price: price,
                qty: 1,
              };
              dataArray.push(obj);
              carts.updateData(dataArray, user?.uid, cartId, "cart");
              count = 3;
            }
          });
        });
      getData();
    } catch (e: any) {
      toast(e);
    }
  }

  async function addToWishlist(
    idP: string,
    image: string,
    name: string,
    price: number
  ) {
    setBusy(true);
    let i = 1;
    let qty = 0;
    let wishArray: Array<any> = [];
    let updatedWishArray: Array<any> = [];
    let wishId = "";
    let count = 0;
    let cartId: string;
    try {
      wish
        .filter((wish) => wish.userId === user?.uid)
        .map((wish) => {
          wishId = wish.id;
          wishArray = wish.items;
          if (wishArray.length == 0) {
            var obj = {
              idP: idP,
              name: name,
              image: image,
              price: price,
            };
            wishArray.push(obj);

            carts.updateData(wishArray, user?.uid, wishId, "wishlists");
            count = 1;
            toast("Item added to wishlist");
          } else {
            wishArray.forEach((e: any) => {
              if (e.idP === idP) {
                count = 1;
                toast("Item already listed");
              }
            });
          }
        });

      wish
        .filter((wish) => wish.userId === user?.uid)
        .map((wish) => {
          wishArray = wish.items;
          if (count !== 1) {
            var obj = {
              idP: idP,
              name: name,
              image: image,
              price: price,
            };
            wishArray.push(obj);
            carts.updateData(wishArray, user?.uid, wishId, "wishlists");
            toast("Item added to wishlist");
          }
        });
    } catch (e: any) {
      toast(e);
    }
    getData();
  }

  async function updateCompare(
    items: Array<any>,
    userId: any,
    compareId: string
  ) {
    setBusy(true);
    const docRef = doc(db, "compare", compareId);
    try {
      await updateDoc(docRef, { items, userId });
      toast("Item added to compare");
    } catch (e: any) {
      toast(e);
    }
    setBusy(false);
  }

  async function addToCompare(idP: string) {
    setBusy(true);
    let i = 1;
    let qty = 0;
    let dataArray: Array<any> = [];
    let updatedDataArray: Array<any> = [];
    let count = 0;

    let compareId: string;
    try {
      compare
        .filter((compare) => compare.userId === user?.uid)
        .map((compare) => {
          compareId = compare.id;
          dataArray = compare.items;
          if (dataArray.length == 0) {
            product
              .filter((product) => product.id === idP)
              .map((product) => {
                var obj = {
                  idP: idP,
                  name: product.name,
                  effectiveSpeed: product.effectiveSpeed,
                  lighting: product.lighting,
                  reflection: product.reflection,
                  mrender: product.mrender,
                  gravity: product.gravity,
                  image: product.image,
                };
                dataArray.push(obj);
                updateCompare(dataArray, user?.uid, compareId);
                toast("Item added to compare slot 1");
              });
          } else if (dataArray.length == 1) {
            product
              .filter((product) => product.id === idP)
              .map((product) => {
                var obj = {
                  idP: idP,
                  name: product.name,
                  effectiveSpeed: product.effectiveSpeed,
                  lighting: product.lighting,
                  reflection: product.reflection,
                  mrender: product.mrender,
                  gravity: product.gravity,
                  image: product.image,
                };
                dataArray.push(obj);
                updateCompare(dataArray, user?.uid, compareId);
              });
            toast("Item added to compare slot 2");
          } else {
            toast("Compare slot is full");
          }
        });
      getData();
    } catch (e: any) {
      toast(e);
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
          <IonAvatar className="avatarImage" slot="end">
            <img src="https://avatars3.githubusercontent.com/u/52709818?s=460&u=f9f8b8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8&v=4" />
          </IonAvatar>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Renebae</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard color="secondary">
          <IonCardContent>
            <IonText color="light">
              <div className="center-text">
                <h1>Banner Ads</h1>
                <br />
                <h1>728 X 90</h1>
              </div>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonSearchbar></IonSearchbar>

        <IonCard>
          <IonCardContent>
            <div className="categoryTitle">
              <div className="alignleft">
                <IonText>Gaming</IonText>
              </div>
              <div className="alignright">
                <IonText>View All</IonText>
              </div>
            </div>
            <br />

            <IonGrid className="ion-no-padding content">
              <IonRow>
                <div className="filter">
                  {product
                    .filter((product) => product.category === "gaming")
                    .map((product) => (
                      <IonCard
                        key={product.id}
                        className="categoryCard filter-options"
                      >
                        <IonFabButton
                          color="danger"
                          onClick={
                            isSignedIn
                              ? () =>
                                  addToWishlist(
                                    product.id,
                                    product.image,
                                    product.name,
                                    product.price
                                  )
                              : signedOut
                          }
                          size="small"
                          className="wishlist-button"
                        >
                          <IonIcon
                            className="wishlist-icon"
                            icon={heartOutline}
                          ></IonIcon>
                        </IonFabButton>
                        <IonFabButton
                          onClick={
                            isSignedIn
                              ? () => addToCompare(product.id)
                              : signedOut
                          }
                          size="small"
                          className="compare-button"
                        >
                          <IonIcon
                            className="compare-icon"
                            icon={gitCompareOutline}
                          ></IonIcon>
                        </IonFabButton>
                        <img className="cardImages" src={product.image} />
                        <IonCardContent>
                          <IonText className="ion-margin">
                            {product.name}
                          </IonText>{" "}
                          <br />
                          {product.price == 0 ? (
                            <IonText className="ion-margin"></IonText>
                          ) : (
                            <IonText className="ion-margin">
                              Rp {product.price}
                            </IonText>
                          )}
                          <br />
                          <IonButton
                            className="ion-margin"
                            onClick={
                              isSignedIn
                                ? () =>
                                    addToCart(
                                      product.id,
                                      product.image,
                                      product.name,
                                      product.price
                                    )
                                : signedOut
                            }
                          >
                            <IonIcon slot="icon-only" icon={cartOutline} />
                            &nbsp;Buy Now
                          </IonButton>
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
            <IonText color="light">
              <div className="center-text">
                <h1>Banner Ads</h1>
                <br />
                <h1>728 X 90</h1>
              </div>
            </IonText>
          </IonCardContent>
        </IonCard>

        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol>
              <IonCard color="secondary">
                <IonCardContent>
                  <IonText color="light">
                    <div className="center-text">
                      <h1>Banner Ads</h1>
                      <br />
                      <h1>350 X 90</h1>
                    </div>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard color="secondary">
                <IonCardContent>
                  <IonText color="light">
                    <div className="center-text">
                      <h1>Banner Ads</h1>
                      <br />
                      <h1>350 X 90</h1>
                    </div>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonCard>
          <IonCardContent>
            <div className="categoryTitle">
              <div className="alignleft">
                <IonText>Electronic</IonText>
              </div>
              <div className="alignright">
                <IonText>View All</IonText>
              </div>
            </div>
            <br />
            <IonGrid className="ion-no-padding content">
              <IonRow>
                <div className="filter">
                  {product
                    .filter((product) => product.category === "electronic")
                    .map((product) => (
                      <IonCard
                        key={product.id}
                        className="categoryCard filter-options"
                      >
                        <IonFabButton
                          color="danger"
                          onClick={
                            isSignedIn
                              ? () =>
                                  addToWishlist(
                                    product.id,
                                    product.image,
                                    product.name,
                                    product.price
                                  )
                              : signedOut
                          }
                          size="small"
                          className="wishlist-button"
                        >
                          <IonIcon
                            className="wishlist-icon"
                            icon={heartOutline}
                          ></IonIcon>
                        </IonFabButton>
                        <IonFabButton
                          onClick={
                            isSignedIn
                              ? () => addToCompare(product.id)
                              : signedOut
                          }
                          size="small"
                          className="compare-button"
                        >
                          <IonIcon
                            className="compare-icon"
                            icon={gitCompareOutline}
                          ></IonIcon>
                        </IonFabButton>
                        <img className="cardImages" src={product.image} />
                        <IonCardContent>
                          <IonText className="ion-margin">
                            {product.name}
                          </IonText>{" "}
                          <br />
                          {product.price == 0 ? (
                            <IonText className="ion-margin"></IonText>
                          ) : (
                            <IonText className="ion-margin">
                              Rp {product.price}
                            </IonText>
                          )}
                          <br />
                          <IonButton
                            className="ion-margin"
                            onClick={
                              isSignedIn
                                ? () =>
                                    addToCart(
                                      product.id,
                                      product.image,
                                      product.name,
                                      product.price
                                    )
                                : signedOut
                            }
                          >
                            <IonIcon slot="icon-only" icon={cartOutline} />
                            &nbsp;Buy Now
                          </IonButton>
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
