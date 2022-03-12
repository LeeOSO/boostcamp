import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Text
} from 'react-native';

import { connect } from 'react-redux';

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 100,
                    backgroundColor: '#b8b8b8b3'
                }}>
                    <ActivityIndicator
                        animating={this.props.isLoading}
                        color={this.props.color ? this.props.color : '#000'}
                        size='large' />
                    <Text>{this.props.loadingText}</Text>
                </View>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        loadingText: state.loadingText
    };
};

export default connect(mapStateToProps)(Loading);