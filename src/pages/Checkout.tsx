import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSlide, IonSlides, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import './Checkout.css';

const slideOpts = {
    slidesPerView: 3.5,
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

const Checkout: React.FC = () => {

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
                <h3>Checkout</h3>
                <h6>Billing Address</h6>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Company Name</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">First Name</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Email</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Street Address</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">City</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Country</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Postal Code</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
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
                </IonGrid>
                <hr />
                <IonGrid>
                    <IonRow>
                        Choose Payment methods:
                    </IonRow>
                    <IonRow className="payment-method">
                        <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
                            <IonSegmentButton value="friends">
                                <img width="100px" src="https://cdn.sindonews.net/dyn/620/content/2014/02/26/35/839402/hZszf7PH6B.jpg" alt="" />
                            </IonSegmentButton>
                            <IonSegmentButton value="enemies">
                                <img width="100px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" alt="" />
                            </IonSegmentButton>
                        </IonSegment>
                    </IonRow>
                </IonGrid>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Nama Lengkap</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">Cardholder Name</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">End Date</IonLabel>
                                <IonInput type="date"></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="stacked">CVV</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonButton expand="block" color="medium">Pay</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Checkout;
