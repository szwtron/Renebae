import { getStorage, ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonAvatar, IonLoading, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, useIonViewWillEnter, IonCardContent, IonSelect, IonSelectOption, IonText, IonInput, IonLabel, IonItem, IonButton } from "@ionic/react";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { firebaseFunction } from "../../services/firebase";
import { toast } from "../../toast";

const Featured: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false);
    const [featured, setFeatured] = useState<Array<any>>([]);
    const [featured1, setFeatured1] = useState<Array<any>>([]);
    const [ads, setAds] = useState<Array<any>>([]);
    let [adsPreview, setAdsPreview] = useState<{
        url: string;
    }>();
    const [file, setFile] = useState<File>();
    const [fileName, setFileName] = useState("");

    const [categoryName, setCategory] = useState<Array<any>>([]);
    const firebase = new firebaseFunction();
    const categoryRef = useRef<HTMLIonSelectElement>(null);
    const category2Ref = useRef<HTMLIonSelectElement>(null);
    const storage = getStorage();
    const history = useHistory();

    useIonViewWillEnter(() => {
        getData();
    });

    async function getData() {
        setBusy(true);
        try {
            const categoryFirebase = firebase.getData("categories");
            setCategory(await categoryFirebase);
            const featuredFirebase = firebase.getData("featured");
            setFeatured(await featuredFirebase);
            const adsFirebase = firebase.getData("ads");
            setAds(await adsFirebase);
            console.log(ads);
        } catch (e: any) {
            toast(e.message);
        }
        setBusy(false);
    }

    function updateFeaturedCategories() {
        const category1 = categoryRef.current!.value;
        const category2 = category2Ref.current!.value;
        const field = {
            first: category1,
            second: category2
        }
        setBusy(true);
        try {
            firebase.updateData("featured", "4dsi3AkHQDjDo7JLHKEQ", field);
            getData();
        } catch (e: any) {
            toast(e.message);
        }
        setBusy(false);
    }

    const createUrl = async (fileName: string, banner: string) => {
        setBusy(true);
        setFileName(fileName);
        try {
            const storageRef = ref(storage, fileName);
            uploadBytes(storageRef, file as Blob).then((snapshot) => {
                getDownloadURL(ref(storage, fileName)).then((url) => {
                    updateData(url, banner);
                    toast("Banner updated successfully");
                    console.log(url);
                });
              })
              .catch((error) => {});
        } catch (e) {}
        setBusy(false);
    };

    const updateData = async (url: string, banner: string) => {
        const field = {
        image: url
        };
        try {
        await firebase.updateData("ads", banner, field);
        } catch (e) {}
        history.push("/page/Admin/featured");
    };

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target!.files![0]);
        console.log(file);
      };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>Renebae</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading message="Please wait..." duration={0} isOpen={busy} />
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Featured Categories</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonRow>
                                        {featured.map((item: any, index: number) => {
                                            return(
                                                <IonCol sizeSm="12" sizeMd="6">
                                                    <IonSelect ref={categoryRef} value={item.first} onIonChange={() => updateFeaturedCategories()}>
                                                    {categoryName.map((cat) => (
                                                        <IonSelectOption>{cat.name}</IonSelectOption>
                                                    ))}
                                                    </IonSelect>
                                                    <IonSelect ref={category2Ref} value={item.second} onIonChange={() => updateFeaturedCategories()}>
                                                    {categoryName.map((cat) => (
                                                        <IonSelectOption>{cat.name}</IonSelectOption>
                                                    ))}
                                                    </IonSelect>
                                                </IonCol>
                                            )
                                        })}
                                </IonRow>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                        <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        <h1>Banner Ads 728 x 80 #1</h1>
                                        <IonItem>
                                            <div className="image-preview">
                                            {ads.filter((ads)=> ads.id == "#1Ads728x80").map((adsPrev)=>{
                                                <img src={adsPrev.image} alt="Preview" />
                                            })}
                                            </div>
                                            <input type="file" onChange={fileChangeHandler} />
                                            <IonButton
                                                expand="block"
                                                color="medium"
                                                onClick={() => createUrl("#1Ads728x80", "#1Ads728x80")}>
                                                Upload
                                            </IonButton>
                                        </IonItem>
                                    </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        <h1>Banner Ads 728 x 80 #2</h1>
                                        <IonItem>
                                            <div className="image-preview">
                                            {ads.filter((ads)=> ads.id == "#2Ads728x80").map((adsPrev)=>{
                                                <img src={adsPrev.image} alt="Preview" />
                                            })}
                                            </div>
                                            <input type="file" onChange={fileChangeHandler} />
                                            <IonButton
                                                expand="block"
                                                color="medium"
                                                onClick={() => createUrl("#2Ads728x80", "#2Ads728x80")}>
                                                Upload
                                            </IonButton>
                                        </IonItem>
                                    </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        <h1>Banner Ads 350 x 90 #1</h1>
                                        <IonItem>
                                            <div className="image-preview">
                                            {ads.filter((ads)=> ads.id == "#1Ads350x90").map((adsPrev)=>{
                                                <img src={adsPrev.image} alt="Preview" />
                                            })}
                                            </div>
                                            <input type="file" onChange={fileChangeHandler} />
                                            <IonButton
                                                expand="block"
                                                color="medium"
                                                onClick={() => createUrl("#1Ads350x90", "#1Ads350x90")}>
                                                Upload
                                            </IonButton>
                                        </IonItem>
                                    </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        <h1>Banner Ads 350 x 90 #2</h1>
                                        <IonItem>
                                            <div className="image-preview">
                                            {ads.filter((ads)=> ads.id == "#2Ads350x90").map((adsPrev)=>{
                                                <img src={adsPrev.image} alt="Preview" />
                                            })}
                                            </div>
                                            <input type="file" onChange={fileChangeHandler} />
                                            <IonButton
                                                expand="block"
                                                color="medium"
                                                onClick={() => createUrl("#2Ads350x90", "#2Ads350x90")}>
                                                Upload
                                            </IonButton>
                                        </IonItem>
                                    </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Featured