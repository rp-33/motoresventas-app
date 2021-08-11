import React from 'react';
import {
	View,
	StyleSheet,
	Text
} from 'react-native';
import {Icon} from 'native-base';
import {dateFormat} from '../../utils/date';
import themeColor from '../../theme/color';

const ChatBubble = ({message,myUser})=>{


	const icon = (status)=>{
		switch (status) {
			case 'not-send':
				return 'clock-outline';
			case 'sent':
				return 'check'
			case 'seen':
				return 'check'
			default:
				return 'alert-circle-outline'
		}//['not-send','sent','seen','error']
	}

	const iconColor = (status)=>{
		switch (status) {
			case 'error':
				return 'red';
			case 'seen':
				return 'green';
			default:
				return themeColor.secondary;
		}//['not-send','sent','received','seen','error']
	}


	return(
		<View 
			style={[
				styles.ctn,
				{justifyContent : (myUser == message.emitter) ? 'flex-end' : 'flex-start'}
			]}
		>
			<View
				style={[
					styles.ctnText,
					myUser == message.emitter ? styles.ctnTextMyUser : styles.ctnTextOther
				]}
			>

				<Text style={{fontSize:15}}>{message.text}</Text>
				<View style={[styles.time,{justifyContent : (myUser == message.emitter) ? 'flex-end' : 'flex-start'}]}>
					<Text style={styles.textTime}>{dateFormat(message.date)}</Text>
					<Icon 
                        name={icon(message.status)}
                       	type='MaterialCommunityIcons'
                        style={{fontSize:12,color:iconColor(message.status),marginLeft:5}}
               	    />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	ctn:{
		marginVertical:7,
		marginHorizontal:15,
		flexDirection:'row',
	},
	ctnText:{
		width : 'auto',
		paddingVertical:7,
		paddingHorizontal:10,
		shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 1.25,
		shadowRadius: 3.84,
		elevation: 1,
	},
	ctnTextMyUser:{
		borderBottomRightRadius:1,
		borderBottomLeftRadius:20,
		borderTopRightRadius:20,
		borderTopLeftRadius:20,
		backgroundColor:'white',
	},
	ctnTextOther:{
		borderBottomRightRadius:20,
		borderBottomLeftRadius:1,
		borderTopRightRadius:20,
		borderTopLeftRadius:20,
		backgroundColor:'#D7E7E9',
	},
	time:{
		flexDirection:'row',
		alignItems:'flex-end',
	},
	textTime:{
		color:themeColor.secondary
	}
})

export default ChatBubble;