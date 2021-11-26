import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonSlide, IonSlides, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { cartOutline, closeCircleOutline, heartOutline } from 'ionicons/icons';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseInit from "../firebase_config";
import './Categories.css';
import { useState, useEffect } from 'react';
import { firebaseFunction } from '../services/firebase';
import { cartFunction } from '../services/cart';
import { useHistory } from 'react-router';
import { getAuth } from 'firebase/auth';
import { toast } from '../toast';

const Categories: React.FC = () => {
    const firebase = new firebaseFunction();
    const carts = new cartFunction();
    const [busy, setBusy] = useState<Boolean>(false);
    const [wish, setWish] = useState<Array<any>>([]);
    const [product, setProduct] = useState<Array<any>>([]);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [cart, setCart] = useState<Array<any>>([]);
    const history = useHistory();
    const auth = getAuth(firebaseInit);
    const user = auth.currentUser;


    useIonViewWillEnter(() => {
        getData();
    })

    async function getData() {
        try {
            const productFirebase = firebase.getData("product");
            setProduct(await productFirebase);
            const cartFirebase = firebase.getData("cart");
            setCart(await cartFirebase);
            const wishFirebase = firebase.getData("wishlists");
            setWish(await wishFirebase);
        }
        catch (e: any) {
            toast(e.message);
        }

    }

    async function addToWishlist(idP: string, image: string, name: string, price: number) {
        let i = 1;
        let qty = 0;
        let wishArray: Array<any> = [];
        let updatedWishArray: Array<any> = [];
        let wishId = '';
        let count = 0;
        console.log(cart);
        setBusy(true);
        let cartId: string;
        try {
            wish.filter(wish => wish.userId === user?.uid).map(wish => {
                wishId = wish.id;
                wishArray = (wish.items);
                console.log(wishArray);
                if (wishArray.length == 0) {
                    var obj = {
                        idP: idP,
                        name: name,
                        image: image,
                        price: price,
                    }
                    wishArray.push(obj);
                    console.log(wishArray);
                    console.log("asd111");

                    carts.updateData(wishArray, user?.uid, wishId, "wishlists");
                    count = 1;
                    console.log("succes");
                }
                else {
                    wishArray.forEach((e: any) => {
                        if (e.idP === idP) {
                            count = 1;
                            toast("Item already listed");
                        }
                    });
                }
            })

            wish.filter(wish => wish.userId === user?.uid).map(wish => {
                console.log(count)
                wishArray = (wish.items);
                    if (count !== 1) {
                        var obj = {
                            idP: idP,
                            name: name,
                            image: image,
                            price: price,
                        }
                        console.log("asd111");
                        wishArray.push(obj);
                        console.log(wishArray);
                        carts.updateData(wishArray, user?.uid, wishId, "wishlists");
                    }
            })
            setBusy(false);
        }
        catch (e: any) {
            toast(e);
        }
        getData();
    }
    async function addToCart(idP: string, image: string, name: string, price: string) {
        let i = 1;
        let qty = 0;
        let dataArray: Array<any> = [];
        let updatedDataArray: Array<any> = [];
        let count = 0;
        console.log(cart);

        let cartId: string;
        try {
            cart.filter(cart => cart.userId === user?.uid).map(cart => {
                cartId = cart.id;
                dataArray = (cart.items);
                console.log(dataArray);
                if (dataArray.length == 0) {
                    var obj = {
                        idP: idP,
                        name: name,
                        image: image,
                        price: price,
                        qty: 1
                    }
                    dataArray.push(obj);
                    console.log(dataArray);
                    carts.updateData(dataArray, user?.uid, cartId, "cart");
                    count = 2;
                    console.log("succes");
                }
                else {
                    dataArray.forEach((e: any) => {
                        if (e.idP === idP) {
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
                        if (e.idP === idP) {
                            qty = e.qty;
                            qty++;
                            var obj = {
                                idP: e.idP,
                                name: e.name,
                                image: e.image,
                                price: e.price,
                                qty: qty
                            }
                            updatedDataArray.push(obj);
                        }
                        else {
                            qty = e.qty;
                            obj = {
                                idP: e.idP,
                                name: e.name,
                                image: e.image,
                                price: e.price,
                                qty: qty
                            }
                            updatedDataArray.push(obj);
                        }
                        console.log(updatedDataArray);
                        carts.updateData(updatedDataArray, user?.uid, cartId, "cart");
                    }
                    else if (count == 0) {
                        obj = {
                            idP: idP,
                            name: name,
                            image: image,
                            price: price,
                            qty: 1
                        }
                        dataArray.push(obj);
                        console.log(dataArray);
                        carts.updateData(dataArray, user?.uid, cartId, "cart");
                        count = 3;
                    }
                });
            })
            getData();
        }
        catch (e: any) {
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
                                    <IonFabButton color="danger" onClick={ () => addToWishlist(product.id, product.image, product.name, product.price)} size="small" className="wishlist-button">
                                        <IonIcon className="wishlist-icon" icon={heartOutline} ></IonIcon>
                                    </IonFabButton>
                                    <img className="img-item" src={product.image} />
                                    <IonCardTitle className="center-txt">{product.name}</IonCardTitle>
                                    <IonCardContent className="center-txt font-size20">
                                        {product.price == 0 ?
                                            <div>
                                                <IonText className="ion-margin"></IonText>
                                                <br /><IonButton className="center-txt" color="danger"><IonIcon icon={closeCircleOutline} />Out of Stock</IonButton>
                                            </div>
                                            :
                                            <div>
                                                <IonText className="ion-margin">Rp {product.price}</IonText>
                                                <br /><IonButton className="center-txt"><IonIcon icon={cartOutline} />Add to Cart</IonButton>
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