import messaging from '@react-native-firebase/messaging';
import {saveTokenPush} from './api';
import { NavigationActions } from 'react-navigation';
import {Alert} from 'react-native';

class Notification{

	checkPermission = async(isAuthenticated)=>{	
		const enabled = await messaging().hasPermission();
    	if (enabled) 
    	{
      		this.getToken();
    	} else {
      		this.requestPermission();
   		}
	}

	getToken =async()=>{
		const fcmToken = await messaging().getToken();
      	if (fcmToken) 
      	{
        	saveTokenPush(fcmToken);
      	}
	}

	requestPermission =async()=>{
		const settings = await messaging().requestPermission();
 		if (settings) 
 		{
    		this.getToken();
  		}
	}

	listener = (navigation)=>{
		messaging().setBackgroundMessageHandler(async remoteMessage => {
  			navigation('sales');//callback para navegar a la vista
		});
	}

}

export default new Notification;