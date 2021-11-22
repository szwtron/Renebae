import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSlide, IonSlides, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { cartOutline, heartOutline, logoWindows, trashBinOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebaseInit from "../firebase_config";
import './Cart.css';

const Cart: React.FC = () => {
    const db = getFirestore(firebaseInit);
    const [jumlahbarang, setJumlahBarang] = useState<number>(0);
    const auth = getAuth();
    const user = auth.currentUser;
    const [cart, setCart] = useState<Array<any>>([]);
    const history = useHistory();
    let subTotal = 0;

    {
        cart.filter(cart => cart.userId === user?.uid).map(cart => {
            var string = JSON.parse(cart.items).price;
            string = string.replaceAll('.', '');
            subTotal += (parseInt(string) * parseInt(JSON.parse(cart.items).qty));
            //console.log(subTotal);
        })
    };
    let grandTotal = 0;
    grandTotal = subTotal + 10000;

    useEffect(() => {
        onAuthStateChanged(auth, (user: any) => {
            if (!user) {
                window.location.href = '/page/Login';
            }
        });
        async function getData() {
            const querySnapshot = await getDocs(collection(db, "cart"));
            // console.log('querySnapshot', querySnapshot);
            setCart(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getData();
    });
    
    async function deleteFromCart(idC: string) {
        await deleteDoc(doc(db, "cart", idC));
        //window.location.href = '/page/Cart';
    }
    //plus minus qty belom
    const plus = async (i: number) => {
        i++;
        console.log(i);
        setJumlahBarang(i);
        return i;
    }
    const min = async (i: number) => {
        if (i != 0) {
            i--;
            console.log(i);
            setJumlahBarang(i);
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
                    <IonRow><h3>Shopping Cart</h3></IonRow>
                    {cart && cart.filter(cart => cart.userId === user?.uid).map(cart => (
                        <IonRow key={cart.id}>
                            <IonCol size="5">
                                <IonRow><img src={JSON.parse(cart.items).image} alt="" /></IonRow>
                                <IonRow><IonCol className="ion-text-center">{JSON.parse(cart.items).name}</IonCol></IonRow>
                                <IonRow><IonCol className="ion-text-center">Rp. {JSON.parse(cart.items).price}</IonCol></IonRow>
                            </IonCol>
                            <IonCol size="7">
                                <IonRow>
                                    <IonCol className="ion-text-center">
                                        <IonButton color="dark" fill="outline" onClick={() => min(JSON.parse(cart.items).qty)} size="small">-</IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonInput className="ion-text-center" type="number" value={JSON.parse(cart.items).qty}></IonInput>
                                    </IonCol>
                                    <IonCol className="ion-text-center">
                                        <IonButton color="dark" fill="outline" onClick={() => plus(JSON.parse(cart.items).qty)} size="small">+</IonButton>
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
                                        <IonButton onClick={() => deleteFromCart(cart.id)} color="danger" fill="outline" className="removeBtn" expand="block">
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
                        <IonCol>Rp. {subTotal}</IonCol>
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
                        <IonCol>Rp. {grandTotal}</IonCol>
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
