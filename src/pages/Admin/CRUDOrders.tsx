import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonAvatar, IonContent, IonCard, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText, IonImg, useIonViewWillEnter } from "@ionic/react";
import { addOutline, checkmarkOutline, closeOutline, eyeOutline, pencilOutline, trashBinOutline } from "ionicons/icons";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { firebaseFunction } from "../../services/firebase";
import './CRUDProducts.css';

const CRUDOrders: React.FC = () => {
    const firebase = new firebaseFunction();
    const [orders, setOrders] = useState<Array<any>>([]);

    useIonViewWillEnter(() => {
        getData();
    });

    async function getData() {
        const productsFirebase = firebase.getDataOrderBy('orders', 'timestamp', 'desc');
        setOrders(await productsFirebase);
    }

    console.log(orders);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>CRUD Orders</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">CRUD Orders</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonTitle>Orders</IonTitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <div className="table-responsive">
                        <table className="table table-light table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <IonText>#</IonText>
                                    </th>
                                    <th>
                                        <IonText>Order Date</IonText>
                                    </th>
                                    <th>
                                        <IonText>Name</IonText>
                                    </th>
                                    <th>
                                        <IonText>Items</IonText>
                                    </th>
                                    <th>
                                        <IonText>Total Price</IonText>
                                    </th>
                                    <th>
                                        <IonText>Status</IonText>
                                    </th>
                                    <th>
                                        <IonText>Action</IonText>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <IonText>{index + 1}</IonText>
                                            </td>
                                            <td>
                                                <IonText>{order.timestamp.toDate().toDateString()}</IonText>
                                            </td>
                                            <td>
                                                <IonText>{order.users.name}</IonText>
                                            </td>
                                            <td>
                                                <IonText>{order.items.length}</IonText>
                                            </td>
                                            <td>
                                                <IonText>
                                                    <NumberFormat
                                                    thousandsGroupStyle="thousand"
                                                    value={order.total}
                                                    prefix="Rp "
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    displayType="text"
                                                    type="text"
                                                    allowNegative={true} />
                                                </IonText>
                                            </td>
                                            <td>
                                                {order.status === 2 ?
                                                    <IonText color="warning">Processing</IonText>
                                                    : order.status === 1 ? <IonText color="primary">Delivering</IonText>
                                                        : order.status === 0 ? <IonText color="success">Done</IonText>
                                                            : <IonText color="danger">Canceled</IonText>
                                                }
                                            </td>
                                            <td>
                                                <IonRow>
                                                    <IonCol>
                                                        {window.innerWidth < 500 ?
                                                            <IonButton expand="block" color={order.status === 2 ? "warning" : order.status === 1 ? "primary" : order.status === 0 ? "success" : "danger"} disabled={order.status === 2 || order.status === 1 ? false : true}><IonIcon slot='icon-only' icon={checkmarkOutline} /></IonButton>
                                                            : <IonButton expand="block" color={order.status === 2 ? "warning" : order.status === 1 ? "primary" : order.status === 0 ? "success" : "danger"} disabled={order.status === 2 || order.status === 1 ? false : true}><IonIcon slot='icon-only' icon={checkmarkOutline} />{order.status === 2 ? 'Deliver' : order.status === 1 ? 'Done' : order.status === 0 ? 'Finished' : 'Canceled'}</IonButton>
                                                        }
                                                    </IonCol>
                                                    <IonCol>
                                                        {window.innerWidth < 500 ?
                                                            <IonButton expand="block" color="tertiary"><IonIcon slot='icon-only' icon={eyeOutline} /></IonButton>
                                                            : <IonButton expand="block" color="tertiary"><IonIcon slot='icon-only' icon={eyeOutline} />View</IonButton>
                                                        }
                                                    </IonCol>
                                                    <IonCol>
                                                        {window.innerWidth < 500 ?
                                                            <IonButton color="danger"><IonIcon slot='icon-only' icon={closeOutline} /></IonButton>
                                                            : <IonButton color="danger"><IonIcon slot='icon-only' icon={closeOutline} />Cancel</IonButton>
                                                        }
                                                    </IonCol>
                                                </IonRow>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default CRUDOrders;