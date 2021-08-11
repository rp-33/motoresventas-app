import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
	BackHandler
} from 'react-native';
import { NavigationActions} from "react-navigation";
import {AppNavigator} from './navigator/';
import 'react-native-gesture-handler';
import notification from './services/notification';

class App extends Component{

	componentDidMount(){
		this.backHandler =  BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
		notification.listener(this.props.handleNotificationNavigate);
	}

	componentWillUnmount(){
		this.backHandler.remove();
	}

	handleBackPress = () => {
		const { nav } = this.props;
    	if (nav.index === 0) {		
      		return false;
    	}
    	this.props.handleNavigation();
		return true;
	}
	  
    render(){
		return (
			<AppNavigator />
		)
	}
}

const mapStateToProps = state => ({
	nav: state.navState
});

const mapDispatchToProps = dispatch =>{
	return{
		handleNavigation(){
			dispatch(NavigationActions.back());
		},
		handleNotificationNavigate(router){
			dispatch(NavigationActions.navigate({routeName:router}));
		},
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
