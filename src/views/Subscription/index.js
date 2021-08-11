import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Container, Content } from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import { BASICO, PREMIUN } from '../../constants/subscriptions';
import Option from './Option';
import { withSubscription } from '../../hoc/withSubscription';

class Subscription extends Component {
    handleBack = () => this.props.navigation.goBack();
   
    render() {
        return (
            <Container style={{paddingVertical:5}}>
                <HeadBack 
                    handleBack={this.handleBack}
                    title='Suscripciones'
                />
                <Content>
                    <Option 
                        type={BASICO.value}
                        handleChoose={() => this.props.handleChoose(BASICO)}
                    />
                    <Option 
                        type={PREMIUN.value}
                        handleChoose={() => this.props.handleChoose(PREMIUN)}
                    />
                </Content>
            </Container>
        );
    }
};

Subscription.proptypes = {
    handleChoose: Proptypes.func.isRequired
};

export default withSubscription(Subscription);
