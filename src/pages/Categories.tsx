import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonSlide, IonSlides, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import './Categories.css';

const Categories: React.FC = () => {
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
                        <IonCol>
                            <IonCard>
                                <img className="img-item" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                                <IonCardTitle className="center-txt">PS5</IonCardTitle>
                                <IonCardContent className="center-txt font-size20">
                                    Rp.90000-100000<br/>
                                    <IonButton className="center-txt"><IonIcon icon={cartOutline}/>Add to Cart</IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard>
                                <img className="img-item" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                                <IonCardTitle className="center-txt">PS5</IonCardTitle>
                                <IonCardContent className="center-txt font-size20">
                                    Rp.90000-100000<br/>
                                    <IonButton className="center-txt"><IonIcon icon={cartOutline}/>Add to Cart</IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <img className="img-item" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                                <IonCardTitle className="center-txt">PS5</IonCardTitle>
                                <IonCardContent className="center-txt font-size20">
                                    Rp.90000-100000<br/>
                                    <IonButton className="center-txt"><IonIcon icon={cartOutline}/>Add to Cart</IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard>
                                <img className="img-item" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                                <IonCardTitle className="center-txt">PS5</IonCardTitle>
                                <IonCardContent className="center-txt font-size20">
                                    Rp.90000-100000<br/>
                                    <IonButton className="center-txt"><IonIcon icon={cartOutline}/>Add to Cart</IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <img className="img-item" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                                <IonCardTitle className="center-txt">PS5</IonCardTitle>
                                <IonCardContent className="center-txt font-size20">
                                    Rp.90000-100000<br/>
                                    <IonButton className="center-txt"><IonIcon icon={cartOutline}/>Add to Cart</IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard>
                                <img className="img-item" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                                <IonCardTitle className="center-txt">PS5</IonCardTitle>
                                <IonCardContent className="center-txt font-size20">
                                    Rp.90000-100000<br/>
                                    <IonButton className="center-txt"><IonIcon icon={cartOutline}/>Add to Cart</IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <img className="img-item" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                                <IonCardTitle className="center-txt">PS5</IonCardTitle>
                                <IonCardContent className="center-txt font-size20">
                                    Rp.90000-100000<br/>
                                    <IonButton className="center-txt"><IonIcon icon={cartOutline}/>Add to Cart</IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard>
                                <img className="img-item" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                                <IonCardTitle className="center-txt">PS5</IonCardTitle>
                                <IonCardContent className="center-txt font-size20">
                                    Rp.90000-100000<br/>
                                    <IonButton className="center-txt"><IonIcon icon={cartOutline}/>Add to Cart</IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Categories;