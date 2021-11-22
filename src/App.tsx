import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/Home';
import Checkout from './pages/Checkout'
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/Home" />
            </Route>
            <Route path="/page/Profile" exact={true}>
              <Profile />
            </Route>
            <Route path="/page/test" exact={true}>
              <Page />
            </Route>
            <Route path="/Home" exact={true}>
              <Home />
            </Route>
            <Route path="/page/Cart" exact={true}>
              <Cart />
            </Route>
            <Route path="/page/Cart/Checkout" exact={true}>
              <Checkout />
            </Route>
            <Route path="/page/Categories" exact={true}>
              <Categories />
            </Route>
            <Route path="/page/Login" exact={true}>
              <Login />
            </Route>
            <Route path="/page/Signup" exact={true}>
              <Signup />
            </Route>
            <Route path="/page/Logout" exact={true}>
              <Logout />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
