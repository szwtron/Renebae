import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSlide, IonSlides, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { cartOutline, heartOutline, trashBinOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Cart.css';

const Cart: React.FC = () => {
    const [jumlahbarang, setJumlahBarang] = useState<number>(0);
    const auth = getAuth();
    const user = auth.currentUser;
    const history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, (user: any) => {
            if (!user) {
                window.location.href = '/page/Login';
            }
        });
    }, []);


    const plus = async () => {
        let i = jumlahbarang;
        i++;
        setJumlahBarang(i);
    }
    const min = async () => {
        let i = jumlahbarang;
        if (i != 0) {
            i--;
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
                    <IonRow>
                        <IonCol size="5">
                            <IonRow><img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="" /></IonRow>
                            <IonRow><IonCol className="ion-text-center">PS 5</IonCol></IonRow>
                            <IonRow><IonCol className="ion-text-center">Rp. 1.500.000</IonCol></IonRow>
                        </IonCol>
                        <IonCol size="7">
                            <IonRow>
                                <IonCol className="ion-text-center">
                                    <IonButton color="dark" fill="outline" onClick={min} size="small">-</IonButton>
                                </IonCol>
                                <IonCol>
                                    <IonInput className="ion-text-center" type="number" value={jumlahbarang}></IonInput>
                                </IonCol>
                                <IonCol className="ion-text-center">
                                    <IonButton color="dark" fill="outline" onClick={plus} size="small">+</IonButton>
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
                                    <IonButton color="danger" fill="outline" className="removeBtn" expand="block">
                                        <IonIcon icon={trashBinOutline} slot="start" />
                                        Remove
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonGrid>
                    <IonRow>
                        <h5>Cart Summary</h5>
                    </IonRow>
                    <IonRow className="cart-summary">
                        <IonCol>Sub Total</IonCol>
                        <IonCol> Rp. 3.000.000</IonCol>
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
                        <IonCol>Rp. 3.010.000</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" color="medium">Proceed To Checkout</IonButton>
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
