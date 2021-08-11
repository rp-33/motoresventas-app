import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native';
import Ranking from './Ranking';
import PropTypes from 'prop-types';
import { dateFormat } from '../utils/date';

const Comment = ({ comment }) => (
	<View style={styles.content}>
		<View style={styles.contentAvatar} >
			<Image style={styles.avatar} source={{uri:comment.user.avatar}} />
		</View>
		<View style={{flex:1}}>
			<View style={styles.contentTopBody}>
				<Ranking range={comment.rating} />
				<Text>{dateFormat(comment.date,'L')}</Text>
			</View>
			<View style={{paddingLeft:20}}>
				<Text style={{fontWeight:'bold',textTransform:'capitalize'}}>{comment.user.displayName}</Text>
				<Text>{comment.text}</Text>
			</View>
		</View>
	</View>
);

Comment.proptypes = {
	comment: PropTypes.shape({
		user : PropTypes.shape({
			avatar: PropTypes.string,
			displayName: PropTypes.string
		}),
		text : PropTypes.string,
		rating :PropTypes.number,
		date : PropTypes.number,
	})
}

const styles = StyleSheet.create({
	content:{
		flexDirection:'row',
		paddingTop:10,
		paddingHorizontal:10,
		paddingBottom:10
	},
	contentAvatar: {
		backgroundColor:'#D9D5DC',
		width:60,
		height:60,
		borderRadius:30
	},
	avatar:{
		width:'100%',
		height:'100%',
		borderRadius:30
	},
	contentTopBody:{
		flexDirection:'row',
		justifyContent:'space-between',
		paddingLeft:15
	}
})

export default Comment;
