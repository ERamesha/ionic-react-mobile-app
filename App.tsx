import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import HomeScreen from './pages/HomeScreen';
import Admin from './pages/Admin';
import Master from './pages/Master';
import MainWarehouse from './pages/MainWarehouse';
import Warehouse from './pages/Warehouse';
import DeliveryChallan from './pages/DeliveryChallan';
import ReceivingChallan from './pages/ReceivingChallan';


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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true}  />
        <Route path="/homescreen" component={HomeScreen} exact={true} />
        <Route path="/admin" component={Admin} exact={true} />
        <Route path="/master" component={Master} exact={true} />
        <Route path="/mainwarehouse" component={MainWarehouse} exact={true} />
        <Route path="/warehouse" component={Warehouse} exact={true} />
        <Route path="/deliverychallan" component={DeliveryChallan} exact={true} />
        <Route path="/receivingchallan" component={ReceivingChallan} exact={true} />
        <Route path="/notifications" component={Notifications} exact={true} />
        <Route path="/settings" component={Settings} exact={true} />
        <Route exact path='/'><Redirect  to="/home" /></Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);


export default App;
