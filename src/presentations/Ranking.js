import React from 'react'
import { View } from 'react-native';
import {
    Icon
} from 'native-base';
import PropTypes from 'prop-types';
import color from '../theme/color';

const Ranking = ({ range, propstyle })=>{

	const rating = (range)=>{
		let stars = [];
    	for(var i = 0; i < 5; i++) {
    		if(i<range){
    			if(i===0) {
                    stars.push(<Icon key={i} name="ios-star" type='Ionicons' style={{color:color.primary,marginLeft:3,fontSize:15}}/>);
                } else {
                    stars.push(<Icon key={i} name="ios-star" type='Ionicons' style={{color:color.primary,marginRight:3,fontSize:15}} />);
                }
    		}else{
    			if(i===0) {
                    stars.push(<Icon key={i} name="ios-star" type='Ionicons' style={{marginLeft:3,fontSize:15}} />);
                } else {
                    stars.push(<Icon key={i} name="ios-star" type='Ionicons' style={{marginRight:3,fontSize:15}} />);
                }
    		}
    	}

    	return stars;   
	}

	return(
		<View style={[{flexDirection:'row'}, propstyle]}>
			{rating(range)}
		</View>
	)
	
};

Ranking.proptypes = {
	range: PropTypes.number.isRequired,
	propstyle: PropTypes.object
};

export default Ranking;