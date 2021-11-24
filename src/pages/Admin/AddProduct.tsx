import { getAuth } from '@firebase/auth';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import firebaseInit from '../../firebase_config';
import { firebaseFunction } from "../../services/firebase";
import { useHistory } from 'react-router';
import './../Page.css';
import { compassSharp } from 'ionicons/icons';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';

const AddProduct: React.FC = () => {
    let [takenPhoto, setTakenPhoto] = useState<{
        preview: string;
    }>();
  
  const db = getFirestore(firebaseInit);
  const auth = getAuth(firebaseInit);
  const user = auth.currentUser;
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState('');
  const firebase = new firebaseFunction();
  const [product, setProduct] = useState<Array<any>>([]);
  const [categoryName, setCategory] = useState<Array<any>>([]);
  const history = useHistory();
  const storage = getStorage();

  const nameRef = useRef<HTMLIonInputElement>(null);
  const categoryRef = useRef<HTMLIonSelectElement>(null);
  const speedRef = useRef<HTMLIonInputElement>(null);
  const gravityRef = useRef<HTMLIonInputElement>(null);
  const lightingRef = useRef<HTMLIonInputElement>(null);
  const mrenderRef = useRef<HTMLIonInputElement>(null);
  const priceRef = useRef<HTMLIonInputElement>(null);
  const reflectionRef = useRef<HTMLIonInputElement>(null);
  const releaseRef = useRef<HTMLIonInputElement>(null);

  const [newName, setName] = useState('');

    const createUrl = async () => {
        console.log(fileName);
        if(fileName === '' || file === null){
            addDataProduct(takenPhoto!.preview);
        }else{
            const storageRef = ref(storage, fileName);
            uploadBytes(storageRef, file as Blob).then(() => {
                console.log('Uploaded');
                getDownloadURL(ref(storage, fileName)).then((url) => {
                    addDataProduct(url);
                });
            }).catch(error => {
                console.log(error);
            });
        }   
    }


    useEffect(() => {
        async function getData() {
            const productFirebase = await firebase.getData("product");
            setProduct(productFirebase);
            const categoryFirebase = firebase.getData("categories");
            setCategory(await categoryFirebase);
        }
        getData();
    }, []);

    // const updateData = async () => {
    //     const field = {
    //         name: nameRef.current?.value,
    //     }
    //     await firebase.updateData("categories", categoryName, field);
    //     history.push('/page/Admin/Categories');
    // }

    const addDataProduct = async (url: string) => {
        const field = {
            name : nameRef.current?.value,
            category : categoryRef.current?.value,
            effectiveSpeed : speedRef.current?.value,
            gravity : gravityRef.current?.value,
            image : url,
            lighting : lightingRef.current?.value,
            mrender : mrenderRef.current?.value,
            price : priceRef.current?.value,
            reflection : reflectionRef.current?.value,
            release : releaseRef.current?.value,
        }
        try{
            console.log("add category baru");
            const myJSON = JSON.stringify(field);
            console.log(myJSON);
            await firebase.addData(field, "product");
        }catch(error){
            console.log(error);
        }
        
        history.push('/page/Admin/Products');
    }

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target!.files![0]);
        setFileName(event.target!.files![0].name);
    };

    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>
            <IonTitle>Category</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
            <IonToolbar>
                <IonTitle size="large">Add Product</IonTitle>
            </IonToolbar>
            </IonHeader>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Name</IonLabel>
                            <IonInput type="text" ref={nameRef}></IonInput>
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Category</IonLabel>
                            <IonSelect placeholder="Select One" ref={categoryRef}>
                            {categoryName.map(cat => (
                                <IonSelectOption key={cat.id}>{cat.name}</IonSelectOption>
                            ))}
                            </IonSelect>
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Price</IonLabel>
                            <IonInput type="text" ref={priceRef}></IonInput>
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Gravity</IonLabel>
                            <IonInput type="number" ref={gravityRef}></IonInput>
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Effective Speed</IonLabel>
                            <IonInput type="number" ref={speedRef}></IonInput>
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Ligthing</IonLabel>
                            <IonInput type="number" ref={lightingRef}></IonInput>
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">mRender</IonLabel>
                            <IonInput type="number" ref={mrenderRef}></IonInput>
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Reflection</IonLabel>
                            <IonInput type="number" ref={reflectionRef}></IonInput>
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel position="stacked">Release</IonLabel>
                            <IonInput type="text" ref={releaseRef}></IonInput>
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonItem>
                            <IonLabel>Image</IonLabel>
                            <input type="file" onChange={fileChangeHandler} />
                        </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonButton expand="block" color="medium" onClick={() => createUrl()}>Edit</IonButton>
                </IonGrid>
        </IonContent>
        </IonPage>
    );
};

export default AddProduct;
