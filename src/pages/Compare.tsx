import { getAuth } from "@firebase/auth";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonRadio,
  IonCol,
  IonGrid,
  IonRow,
  IonCard,
  IonItem,
  IonButton,
  useIonViewWillEnter,
  IonLoading,
} from "@ionic/react";
import { idCard } from "ionicons/icons";
import { userInfo } from "os";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebaseInit from "../firebase_config";
import { cartFunction } from "../services/cart";
import { firebaseFunction } from "../services/firebase";
import { toast } from "../toast";
import "./Compare.css";

const Compare: React.FC = () => {
  const [compare, setCompare] = useState<Array<any>>([]);
  const [busy, setBusy] = useState<boolean>(false);
  const firebase = new firebaseFunction();
  const auth = getAuth(firebaseInit);
  const user = auth.currentUser;
  const compares = new cartFunction();
  const history = useHistory();
  let compareArray: Array<any> = [];
  let dataArray: Array<any> = [];
  let compareId = "";

  useIonViewWillEnter(() => {
    getData();
  });

  async function getData() {
    setBusy(true);
    try {
      const compareFirebase = await firebase.getData("compare");
      setCompare(compareFirebase);
    } catch (error: any) {
      toast(error.message);
    }
    setBusy(false);
  }

  compare
    .filter((compare) => compare.userId === user?.uid)
    .map((compare) => {
      compareId = compare.id;
      compareArray = compare.items;
      compareArray.forEach((e) => {
        dataArray.push(e);
      });
    });

  const removeCompare = () => {
    try {
      compare
        .filter((compare) => compare.userId === user?.uid)
        .map((compare) => {
          compareId = compare.id;
        });

      compares.updateData([], user?.uid, compareId, "compare");
      getData();
    } catch (e: any) {
      toast(e.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Compare</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonContent>
        {dataArray.length === 0 ? (
          <IonRow>
            <IonCol>
              <h5>Tidak ditemukan barang untuk di compare</h5>
            </IonCol>
          </IonRow>
        ) : (
          <div className="table-responsive">
            <table className="table table-light table-borderless">
              <tbody>
                <tr>
                  <td></td>
                  <td>
                    <div className="compareImageContainer">
                      <img
                        className="image-size"
                        src={dataArray[0].image}
                      ></img>
                    </div>
                  </td>
                  <td className="txt-center">
                    <p>VS</p>
                  </td>
                  <td>
                    <div className="compareImageContainer">
                      <img
                        className="image-size"
                        src={dataArray[1].image}
                      ></img>
                    </div>
                  </td>
                  <td className="ion-align-self-center txt-center">
                    <IonButton onClick={removeCompare} color="danger">
                      Remove
                    </IonButton>
                  </td>
                </tr>
                <tr>
                  <td>Nama</td>
                  <td className="txt-center">{dataArray[0].name}</td>
                  <td></td>
                  <td className="txt-center">{dataArray[1].name}</td>
                  <td></td>
                </tr>
                <tr className="table-secondary">
                  <td>Effective Speed</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Effective 3D Speed</td>
                  <td className="txt-center">{dataArray[0].effectiveSpeed}</td>
                  <td></td>
                  <td className="txt-center">{dataArray[1].effectiveSpeed}</td>
                  <td></td>
                </tr>
                <tr className="table-secondary">
                  <td>Average Score (FPS)</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Lighting</td>
                  <td className="txt-center">{dataArray[0].lighting}</td>
                  <td></td>
                  <td className="txt-center">{dataArray[1].lighting}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Reflection</td>
                  <td className="txt-center">{dataArray[0].reflection}</td>
                  <td></td>
                  <td className="txt-center">{dataArray[1].reflection}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>MRender</td>
                  <td className="txt-center">{dataArray[0].mrender}</td>
                  <td></td>
                  <td className="txt-center">{dataArray[1].mrender}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Gravity</td>
                  <td className="txt-center">{dataArray[0].gravity}</td>
                  <td></td>
                  <td className="txt-center">{dataArray[1].gravity}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Compare;
