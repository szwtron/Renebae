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
  IonImg,
  IonItem,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRouterLink,
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
import { render } from "react-dom";
import Categories from "./Categories";
import { Router } from "workbox-routing";

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
  const [ads, setAds] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string>("");
  let [displayproduct, setDisplayProduct] = useState<Array<any>>([]);
  const searchbar = useRef<HTMLIonSearchbarElement>(null);
  const history = useHistory();
  const auth = getAuth(firebaseInit);
  const user = auth.currentUser;

  useIonViewWillEnter(() => {
    getData();
  });

  async function getData() {
    setBusy(true);
    if (user) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
    try {
      const productFirebase = firebase.getData("product");
      setProduct(await productFirebase);
      const cartFirebase = firebase.getData("cart");
      setCart(await cartFirebase);
      const wishFirebase = firebase.getData("wishlists");
      setWish(await wishFirebase);
      const compareFirebase = firebase.getData("compare");
      setCompare(await compareFirebase);
      const adsFirebase = firebase.getData("ads");
      setAds(await adsFirebase);
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
            toast("Added to cart");
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
              toast("Added to cart");
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
              toast("Added to cart");
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

  const setSearchValue = (e: any) => {
    setSearch(e.target.value!);
  };

  useEffect(() => {
    setDisplayProduct(product);
    if (search && search.trim() !== '') {
      setDisplayProduct(product.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      }));
    }
    console.log(displayproduct);
  }, [search, product]);

  const Search = (key: any) => {
    if(key == "Enter"){
      console.log("Enter key pressed");
      //window.location.href = `/page/Categories`;
      window.location.href = `/page/Categories/${search}`;
      //history.push(`/page/Categories/${search}`);
      //SomeCode
      }
    //render(<Categories />, document.getElementById('root'));
  };

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
              <div className="center-text">
              {ads.filter((ads)=> ads.id == "#1Ads728x80").map((adsPrev)=>{
                if(adsPrev.image.toString() != ""){
                  console.log(adsPrev.image);
                  <img src={adsPrev.image} />
                }else {
                  <><h1>Banner Ads</h1><br /><h1>350 X 90</h1></>
                }
              })}
              <><h1>Banner Ads</h1><br /><h1>728 X 80</h1></>
              </div>

          </IonCardContent>
        </IonCard>

        <IonSearchbar ref={searchbar} debounce={100} placeholder="Search your dream items" onKeyPress={e=> Search(e.key)} onIonInput={setSearchValue}></IonSearchbar>

        <IonCard>
          <IonCardContent>
            <div className="categoryTitle">
              <div className="alignleft">
                <IonText>Gaming</IonText>
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
                {ads.filter((ads)=> ads.id == "#2Ads728x80").map((adsPrev)=>{
                  if(adsPrev.image == ""){
                    <img src={adsPrev.image} />
                  } else {
                    <><h1>Banner Ads</h1><br /><h1>728 X 80</h1></>
                  }
                })}
                <><h1>Banner Ads</h1><br /><h1>728 X 80</h1></>
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
                      {ads.filter((ads)=> ads.id == "#2Ads728x80").map((adsPrev)=>{
                        if(adsPrev.image == ""){
                          <img src={adsPrev.image} />
                        } else {
                          <><h1>Banner Ads</h1><br /><h1>728 X 80</h1></>
                        }
                      })}
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
