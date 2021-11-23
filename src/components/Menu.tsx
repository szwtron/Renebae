import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, cartOutline, cartSharp, closeOutline, closeSharp, heartOutline, heartSharp, homeOutline, homeSharp, logInOutline, logInSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, personOutline, personSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { getAuth } from 'firebase/auth';
import firebaseInit from '../firebase_config';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

let appPages: AppPage[] = [
  {
    title: 'Login',
    url: '/page/Login',
    iosIcon: logInOutline,
    mdIcon: logInSharp
  },
  {
    title: 'Home',
    url: '/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Profile',
    url: '/page/Profile',
    iosIcon: personOutline,
    mdIcon: personSharp
  },
  {
    title: 'Category',
    url: '/page/Categories',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Wishlist',
    url: '/page/Wishlist',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Cart',
    url: '/page/Cart',
    iosIcon: cartOutline,
    mdIcon: cartSharp
  },
  {
    title: 'Logout',
    url: '/page/Logout',
    iosIcon: closeOutline,
    mdIcon: closeSharp
  }
];

const labels = ['NVidia', 'AMD Radeon', 'GeForce', 'Vega', 'MX Series', 'RX Series'];

const Menu: React.FC = () => {
  const location = useLocation();

  const auth = getAuth(firebaseInit);
  const user = auth.currentUser;

  if (user) {
    appPages= [
      {
        title: 'Home',
        url: '/Home',
        iosIcon: homeOutline,
        mdIcon: homeSharp
      },
      {
        title: 'Profile',
        url: '/page/Profile',
        iosIcon: personOutline,
        mdIcon: personSharp
      },
      {
        title: 'Category',
        url: '/page/Categories',
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
      },
      {
        title: 'Wishlist',
        url: '/page/Wishlist',
        iosIcon: heartOutline,
        mdIcon: heartSharp
      },
      {
        title: 'Cart',
        url: '/page/Cart',
        iosIcon: cartOutline,
        mdIcon: cartSharp
      },
      {
        title: 'Logout',
        url: '/page/Logout',
        iosIcon: closeOutline,
        mdIcon: closeSharp
      }
    ];
  } else {
    appPages = [
      {
        title: 'Login',
        url: '/page/Login',
        iosIcon: logInOutline,
        mdIcon: logInSharp
      },
      {
        title: 'Home',
        url: '/Home',
        iosIcon: homeOutline,
        mdIcon: homeSharp
      },
      {
        title: 'Category',
        url: '/page/Categories',
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
      }
    ];
  }

  const renderSideMenu = () => {
    console.log(auth.currentUser);
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Renebae</IonListHeader>
          <IonNote>renebae@umn.ac.id</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
