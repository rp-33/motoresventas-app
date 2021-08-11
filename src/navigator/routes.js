import React, { Fragment } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import { Icon, View } from 'native-base';
import color from '../theme/color';
// screen Comprador
import Login from '../views/Login/';
import Signup from '../views/Signup/';
import Forgotpassword from '../views/Forgotpassword';
import Changepassword from '../views/Changepassword';
import Marketplace from '../views/Marketplace';
import Garage from '../views/Garage';
import Favorite from '../views/Favorite';
import BuyerSettings from '../views/BuyerSettings';
import Sellersignup from '../views/Sellersignup';
import ProductDetailsBuyer from '../views/ProductDetailsBuyer';
import Comments from '../views/Comments';
import Business from '../views/Business';
import SplashScreen from '../views/SplashScreen';
import GarageOptions from '../views/GarageOptions';
import AddToGarage from '../views/AddToGarage';
import FilterForWord from '../views/FilterForWord';
import FilterForSerial from '../views/FilterForSerial';
import Purchases from '../views/Purchases';
import BuyerHistory from '../views/BuyerHistory';
// screen Vendedor
import Products from '../views/Products';
import AddProduct from '../views/AddProduct';
import Sales from '../views/Sales';
import Statistics from '../views/Statistics';
import SalesHistory from '../views/SalesHistory';
import SellerSettings from '../views/SellerSettings';
import ShowCars from '../views/ShowCars';
import ProductDetailsSeller from '../views/ProductDetailsSeller';
import QRcodeScanner from '../views/QRcodeScanner';
import QRcode from '../views/QRcode.js';
import SaleConfirmation from '../views/SaleConfirmation';
import ProductDetailsHistory from '../views/ProductDetailsHistory';
import ProductComments from '../views/ProductComments';
import Chat from '../views/Chat';
import Subscription from '../views/Subscription';

const nameIcon = {
  marketplace: 'cart',
  favorite: 'cards-heart',
  settings: 'settings',
  products: 'ballot',
  statistics: 'chart-bar'
}

// Marketplace

const MarketplaceNavigator = createStackNavigator({
    marketplace: {
      screen:Marketplace,
      navigationOptions: {header: null}
    },
    productDetailsBuyer: {
      screen:ProductDetailsBuyer,
      navigationOptions: {header: null}
    },
    purchases: {
      screen: Purchases,
      navigationOptions: {header: null}
    },
    chat:{
      screen: Chat,
      navigationOptions: {header: null}
    },
    showcars: {
      screen:ShowCars,
      navigationOptions: {header: null}
    },
    comments: {
      screen:Comments,
      navigationOptions: {header: null}
    },
    business: {
      screen:Business,
      navigationOptions: {header: null}
    },
    garage: {
      screen:Garage,
      navigationOptions: {header: null}
    },
    garageOptions: {
      screen:GarageOptions,
      navigationOptions: {header: null}
    },
    addToGarage: {
      screen:AddToGarage,
      navigationOptions: {header: null}
    },
    filterForWord: {
      screen:FilterForWord,
      navigationOptions: {header: null}
    },
    filterForSerial: {
      screen:FilterForSerial,
      navigationOptions: {header: null}
    }
},
{
  initialRouteName: 'marketplace',
})

MarketplaceNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) tabBarVisible = false;
  return { tabBarVisible };
};

// Favorites

const FavoriteNavigator = createStackNavigator({
  favorite: {
    screen: Favorite,
    navigationOptions: {header: null}
  },
  purchases: {
    screen: Purchases,
    navigationOptions: {header: null}
  },
  buyerHistory: {
    screen: BuyerHistory,
    navigationOptions: {header: null}
  },
  chat:{
    screen: Chat,
    navigationOptions: {header: null}
  },
  productDetailsHistory: {
    screen: ProductDetailsHistory,
    navigationOptions: {header: null}
  },
  productDetailsBuyer: {
    screen: ProductDetailsBuyer,
    navigationOptions: {header: null}
  },
  comments: {
    screen: Comments,
    navigationOptions: {header: null}
  },
  qrcode: {
    screen: QRcode,
    navigationOptions: {header: null}
  }
},
{
  initialRouteName: 'favorite'
})

FavoriteNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) tabBarVisible = false;
  return { tabBarVisible };
};

// Buyer Settings

const BuyerSettingsNavigator = createStackNavigator({
  buyersettings: {
    screen:BuyerSettings,
    navigationOptions: {header: null}
  },
  sellersignup: {
    screen:Sellersignup,
    navigationOptions: {header: null}
  },
},
{
  initialRouteName: 'buyersettings'
})

BuyerSettingsNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) tabBarVisible = false;
  return { tabBarVisible };
};

// Buyer Dashboard

const BuyerDashboard = createBottomTabNavigator({
    marketplace:{
      screen:MarketplaceNavigator
    },
    favorite:{
      screen:FavoriteNavigator
    },
    settings:{
      screen:BuyerSettingsNavigator
    }
},
{
    initialRouteName:'marketplace',
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return {
        tabBarIcon: ({tintColor})=>(
            <Icon 
                style={{color:tintColor,fontSize:35}} 
                type="MaterialCommunityIcons" 
                name={nameIcon[routeName]} 
            />
        )
      }
    },
    backBehavior:'initialRoute',
    tabBarOptions: {
      showLabel:false,
      activeTintColor:'black',
      inactiveTintColor:color.secondary,
    },    
    tabBarComponent: props => (
      <Fragment>
          <View style={{borderTopWidth:1,borderTopColor:color.secondary}} />
          <BottomTabBar {...props} style={{marginTop:3,borderTopWidth:0}} />
      </Fragment>
    ),
})

// Products

const ProductsNavigator = createStackNavigator({
  products: {
    screen:Products,
    navigationOptions: {header: null}
  },
  addproduct: {
    screen:AddProduct,
    navigationOptions: {header: null}
  },
  subscription: {
    screen:Subscription,
    navigationOptions: {header: null}
  },
  showcars: {
    screen:ShowCars,
    navigationOptions: {header: null}
  },
  garageOptions: {
    screen:GarageOptions,
    navigationOptions: {header: null}
  },
  productDetailsSeller: {
    screen:ProductDetailsSeller,
    navigationOptions: {header: null}
  },
  comments: {
    screen:ProductComments,
    navigationOptions: {header: null}
  },
},
{
  initialRouteName: 'products'
});

ProductsNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) tabBarVisible = false;
  return { tabBarVisible };
};

// Statistics

const SalesNavigator = createStackNavigator({
  statistics: {
    screen:Statistics,
    navigationOptions: {header: null}
  },
  sales: {
    screen:Sales,
    navigationOptions: {header: null}
  },
  chat:{
    screen: Chat,
    navigationOptions: {header: null}
  },
  productDetailsSeller: {
    screen:ProductDetailsSeller,
    navigationOptions: {header: null}
  },
  salesHistory: {
    screen:SalesHistory,
    navigationOptions: {header: null}
  },
  productDetailsHistory: {
    screen: ProductDetailsHistory,
    navigationOptions: {header: null}
  },
  qrScanner: {
    screen:QRcodeScanner,
    navigationOptions: {header: null}
  },
  saleConfimation: {
    screen:SaleConfirmation,
    navigationOptions: {header: null}
  }
},
{
  initialRouteName: 'statistics'
})

SalesNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) tabBarVisible = false;
  return { tabBarVisible };
};

// Seller Settings

const SellerSettingsNavigator = createStackNavigator({
  sellersettings: {
    screen:SellerSettings,
    navigationOptions: {header: null}
  }
},
{
  initialRouteName: 'sellersettings'
})

SellerSettingsNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) tabBarVisible = false;
  return { tabBarVisible };
};

// Seller Dashboard

const SellerDashboard = createBottomTabNavigator({
    products:{
      screen:ProductsNavigator
    },
    statistics:{
      screen:SalesNavigator
    },
    settings:{
      screen:SellerSettingsNavigator
    }
},
{
    initialRouteName:'products',
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      return {
        tabBarIcon: ({tintColor})=>(
            <Icon 
                style={{color:tintColor,fontSize:35}} 
                type="MaterialCommunityIcons" 
                name={nameIcon[routeName]} 
            />
        )
      }
    },
    backBehavior:'initialRoute',
    tabBarOptions: {
      showLabel:false,
      activeTintColor:'black',
      inactiveTintColor:color.secondary,
    },    
    tabBarComponent: props => (
      <Fragment>
          <View style={{borderTopWidth:1,borderTopColor:color.secondary}} />
          <BottomTabBar {...props} style={{marginTop:3,borderTopWidth:0}} />
      </Fragment>
    ),
});

// Login

const LoginNavigator = createStackNavigator({
  login: {
    screen:Login,
    navigationOptions: {header: null}
  },
  signup: {
    screen:Signup,
    navigationOptions: {header: null}
  },
  forgotpassword: {
    screen:Forgotpassword,
    navigationOptions: {header: null}
  },
  changepassword: {
    screen:Changepassword,
    navigationOptions: {header: null}
  }
},
{
  initialRouteName: 'login'
})

// Main Navigation

const RootNavigator = createSwitchNavigator({
    Splash: {
      screen: SplashScreen,
      navigationOptions: {header: null}
    },
    LoginNavigator: {
        screen: LoginNavigator,
        navigationOptions: {header: null}
    },
    BuyerDashboard : {
        screen: BuyerDashboard,
        navigationOptions: {header: null }
    },
    SellerDashboard: {
        screen: SellerDashboard,
        navigationOptions: {header: null }
    }
},
{
    initialRouteName: 'Splash'
})

export { RootNavigator };