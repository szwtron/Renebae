import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonMenuButton, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSlide, IonSlides, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { car, cartOutline, heartOutline, logoWindows, trashBinOutline } from 'ionicons/icons';
import { JSXElementConstructor, Key, ReactChild, ReactElement, ReactFragment, ReactNodeArray, ReactPortal, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseInit from "../firebase_config";
import './Cart.css';
import { cartFunction } from '../services/cart';
import { firebaseFunction } from '../services/firebase';
import NumberFormat from 'react-number-format';
import { async } from '@firebase/util';

const Cart: React.FC = () => {
    const db = getFirestore(firebaseInit);
    const [jumlahbarang, setJumlahBarang] = useState<number>(0);
    const [product, setProduct] = useState<Array<any>>([]);
    const [busy, setBusy] = useState<boolean>(false);
    const firebase = new firebaseFunction();
    const storage = getStorage(firebaseInit);
    const carts = new cartFunction();
    const auth = getAuth();
    const user = auth.currentUser;
    const [cart, setCart] = useState<Array<any>>([]);
    const history = useHistory();
    let cartArray: Array<any> = [];
    let dataArray: Array<any> = [];
    let updatedDataArray: Array<any> = [];
    let filteredDataArray: Array<string> = [];
    let cartId = '';
    let subTotal = 0;
    useEffect(() => {
        onAuthStateChanged(auth, (user: any) => {
            if (!user) {
                window.location.href = '/page/Login';
            }
        });
        getData();
    }, []);

    async function getData() {
        const productFirebase = firebase.getData("cart");
        setCart(await productFirebase);
    }
    // useEffect(() => {
    //     async function getData() {
    //         const productFirebase = firebase.getData("cart");
    //         setProduct(await productFirebase);
    //     }
    //     getData();
    // }, []);

    //buat ngeprint cartnya
    cart.filter(cart => cart.userId === user?.uid).map(cart => {
        console.log(cart.userId)
        console.log(user?.uid)
        cartId = cart.id;
        console.log(cart.items)
        cartArray = (cart.items);
        cartArray.forEach(e => {
            console.log("asd");
            subTotal += (parseInt(e.price) * parseInt(e.qty));
            console.log(subTotal);
            dataArray.push(e);
        });
    })

    console.log(dataArray);
    const deleteFromCart = (idP: string) => {
        cart.filter(cart => cart.userId === user?.uid).map(cart => {
            console.log(filteredDataArray);
            cartId = cart.id;
            cartArray = dataArray.filter(e => e.idP !== idP)
            console.log(dataArray.filter(e => e.idP !== idP));
            console.log(cartArray);

        })
        cartArray.forEach(e => {
            filteredDataArray.push(e)
        });
        console.log(filteredDataArray);

        carts.updateData(filteredDataArray, user?.uid, cartId);
        getData();
    }


    let grandTotal = 0;
    grandTotal = subTotal + 10000;
    const  plusmin =  ( idP: string, plusmin: string)=>{
        
        let index = 0;
        let count = 0;
        let qty = 0;
        cart.filter(cart => cart.userId === user?.uid).map(cart => {
            cartId = cart.id;
            dataArray = (cart.items);
            console.log(dataArray);
            if (plusmin === "plus") {
                dataArray.forEach((e: any) => {
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
                });
                carts.updateData(updatedDataArray, user?.uid, cartId);
            }
            else if (plusmin === "min") {
                dataArray.forEach((e: any) => {
                    if (e.idP === idP) {
                        qty = e.qty;
                        qty--;
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
                });
                carts.updateData(updatedDataArray, user?.uid, cartId);
            }
        })
        getData();

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
            <IonLoading message="Please wait..." duration={3000} isOpen={busy} />

            <IonContent fullscreen className="ion-padding">
                <IonGrid>
                    <IonRow><h3>Shopping Cart</h3></IonRow>
                    {dataArray.length === 0 && (
                        <IonRow>
                            <IonCol>
                                <h5>Keranjang Belanja anda masih kosong</h5>
                            </IonCol>
                        </IonRow>
                    )}
                    {dataArray && dataArray.map((dataArray: { idP: string; image: string | undefined; name: null | string | undefined; price: string | undefined; qty: number; }) => (
                        <IonRow key={dataArray.idP}>
                            <IonCol size="5">
                                <IonRow><img src={dataArray.image} alt="" /></IonRow>
                                <IonRow><IonCol className="ion-text-center">{dataArray.name}</IonCol></IonRow>
                                <IonRow><IonCol className="ion-text-center">Rp. {dataArray.price}</IonCol></IonRow>
                            </IonCol>
                            <IonCol size="7">
                                <IonRow>
                                    <IonCol className="ion-text-center">
                                        <IonButton color="dark" fill="outline" onClick={() => plusmin( dataArray.idP, "min")} size="small" >-</IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput className="ion-text-center" type="number" value={dataArray.qty} disabled></IonInput>
                                    </IonCol>
                                    <IonCol className="ion-text-center">
                                        <IonButton color="dark" fill="outline" onClick={() => plusmin( dataArray.idP, "plus")} size="small">+</IonButton>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonButton color="success" fill="outline" className="moveToBtn" expand="block">
                                            <IonIcon icon={heartOutline} slot="start" />
                                            Move to Wishlist
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonButton onClick={() => deleteFromCart(dataArray.idP)} color="danger" fill="outline" className="removeBtn" expand="block">
                                            <IonIcon icon={trashBinOutline} slot="start" />
                                            Remove
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    ))}
                </IonGrid>

                <IonGrid>
                    <IonRow>
                        <h5>Cart Summary</h5>
                    </IonRow>
                    <IonRow className="cart-summary">
                        <IonCol>Sub Total</IonCol>
                        <IonCol>
                            <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={subTotal}
                                prefix="Rp. "
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true} />
                        </IonCol>
                    </IonRow>
                    <IonRow className="cart-summary">
                        <IonCol>Shipping</IonCol>
                        <IonCol>Rp. 10.000</IonCol>
                    </IonRow>
                    <IonRow className="cart-summary">
                        <IonCol>Tax 0%</IonCol>
                        <IonCol>Rp. 0.00</IonCol>
                    </IonRow>
                    <hr color='light' />
                    <IonRow className="cart-summary">
                        <IonCol>Grand Total</IonCol>
                        <IonCol>
                            <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={grandTotal}
                                prefix="Rp. "
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true} />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton routerLink="/page/Cart/Checkout" expand="block" color="medium">Proceed To Checkout</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonInput className="coupon" placeholder=" Apply coupon code here"></IonInput>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonButton expand="block" color="medium">Apply Coupon</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Cart;
