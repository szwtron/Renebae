import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonAvatar,
  IonContent,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonText,
  IonImg,
  useIonViewWillEnter,
} from "@ionic/react";
import { addOutline, pencilOutline, trashBinOutline } from "ionicons/icons";
import { useState, useEffect } from "react";
import { firebaseFunction } from "../../services/firebase";
import "./CRUDProducts.css";
import { getPlatforms, Platforms } from "@ionic/core";
import { useHistory } from "react-router";
import { getStorage } from "firebase/storage";
import { toast } from "../../toast";

const CRUDProducts: React.FC = () => {
  const [products, setProducts] = useState<Array<any>>([]);
  const firebase = new firebaseFunction();
  const history = useHistory();
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState("");
  const [product, setProduct] = useState<Array<any>>([]);
  const [categoryName, setCategory] = useState<Array<any>>([]);
  const storage = getStorage();

  useIonViewWillEnter(() => {
    getData();
  });

  async function getData() {
    try {
      const productsFirebase = firebase.getData("product");
      setProducts(await productsFirebase);
    } catch (e: any) {
      toast(e.message);
    }
  }

  const deleteProd = async (id: any) => {
    try {
      await firebase.deleteData("product", id);
      getData();
    } catch (e: any) {
      toast(e.message);
    }
    history.push("/page/Admin/Products");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>CRUD Products</IonTitle>
          <IonAvatar className="avatarImage" slot="end">
            <img src="https://avatars3.githubusercontent.com/u/52709818?s=460&u=f9f8b8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8&v=4" />
          </IonAvatar>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CRUD Products</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonTitle>Products</IonTitle>
              </IonCol>
              <IonCol>
                <IonButton
                  expand="block"
                  color="success"
                  routerLink={`/page/addproduct/`}
                >
                  <IonIcon slot="icon-only" icon={addOutline} />
                  Add product
                </IonButton>
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
                    <IonText>Name</IonText>
                  </th>
                  <th>
                    <IonText>Image</IonText>
                  </th>
                  <th>
                    <IonText>Release</IonText>
                  </th>
                  <th>
                    <IonText>Price</IonText>
                  </th>
                  <th>
                    <IonText>Action</IonText>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <IonText>{index + 1}</IonText>
                      </td>
                      <td>
                        <IonText>{product.name}</IonText>
                      </td>
                      <td>
                        <IonImg className="itemImg" src={product.image} />
                      </td>
                      <td>
                        <IonText>{product.release}</IonText>
                      </td>
                      <td>
                        <IonText>Rp {product.price}</IonText>
                      </td>
                      <td>
                        <IonRow>
                          <IonCol>
                            {window.innerWidth < 500 ? (
                              <IonButton
                                color="warning"
                                routerLink={`/page/updateproduct/${product.id}`}
                              >
                                <IonIcon slot="icon-only" icon={pencilOutline} />
                              </IonButton>
                            ) : (
                              <IonButton
                                color="warning"
                                routerLink={`/page/updateproduct/${product.id}`}
                              >
                                <IonIcon slot="icon-only" icon={pencilOutline} />
                                Edit
                              </IonButton>
                            )}
                          </IonCol>
                          <IonCol>
                            {window.innerWidth < 500 ? (
                              <IonButton
                                color="danger"
                                onClick={() => deleteProd(product.id)}
                              >
                                <IonIcon
                                  slot="icon-only"
                                  icon={trashBinOutline}
                                />
                              </IonButton>
                            ) : (
                              <IonButton
                                color="danger"
                                onClick={() => deleteProd(product.id)}
                              >
                                <IonIcon
                                  slot="icon-only"
                                  icon={trashBinOutline}
                                />
                                Delete
                              </IonButton>
                            )}
                          </IonCol>
                        </IonRow>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CRUDProducts;
