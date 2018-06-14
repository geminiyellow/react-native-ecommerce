
import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

import styles from './styles';
import Color from '../../styles/Color';
import { numberWithCommas } from '../../utilities/Functions';

import { CreateAdCoverPhoto } from '../CreateAdCoverPhoto';
import { CategorySelector } from '../CategorySelector';

const {
    container,
    textInputTextStyle,
    textInputPlaceHolderStyle,
    textInputTitleStyle,
    separatorStyle
} = styles;

//Title, category, condition, location, price, description

export class NewAdForm extends Component {

    renderImageView = () => {
        return (
            <TouchableOpacity
                onPress={() => null}
            >
                <CreateAdCoverPhoto
                    imageURL='https://firebasestorage.googleapis.com/v0/b/innernepal-dca5b.appspot.com/o/fashion.jpg?alt=media&token=3426181c-22fa-43f1-aac3-177b20676bb5'
                />
            </TouchableOpacity>
        );
    }

    renderSeparator = () => {
        return <View style={separatorStyle} />
    }

    renderPriceTextInput = () => {
        // const { productPrice, onProductPriceInput } = this.props;

        return (
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={textInputTitleStyle}>Price</Text>
                <TextInput
                    style={textInputTextStyle}
                    placeholderTextColor={Color.placeholderWhite}
                    keyboardType="numeric"
                    placeholder="₹ (Price)"
                    autoFocus={false}
                    clearButtonMode="always"
                    multiline={false}
                    maxLength={13}
                    //  onChangeText={(text) => onProductPriceInput(text.replace(/[^0-9]/g, ''))}
                    // value={`₹ ${numberWithCommas(2000)}`}
                    underlineColorAndroid="transparent"
                />
            </View>
        );
    }

    renderTitleTextInput = () => {
        //const { productTitle, setProductTitle } = this.props;
        return (
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={textInputTitleStyle}>Title</Text>
                <TextInput
                    style={textInputTextStyle}
                    placeholderTextColor={Color.placeholderWhite}
                    // onChangeText={setProductTitle}
                    placeholder="Enter Title"
                    clearButtonMode="always"
                    multiline={false}
                    maxLength={50}
                    keyboardType="default"
                    autoFocus={false}
                    value={null}
                    underlineColorAndroid="transparent"
                />
            </View>
        );
    }

    renderProductCondition = () => {
        //const { selectedProductCondition, setProductConditionUsed, setProductConditionNew } = this.props;

        return (
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={textInputTitleStyle}>Condition</Text>
                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                    onPress={() => null}
                >
                    <Text style={textInputPlaceHolderStyle}>Select Condition</Text>
                    <Icon
                        name="chevron-thin-right"
                        size={20}
                        type="entypo"
                        color={Color.placeholderWhite}
                    //onPress={}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderProductDescription = () => {
        return (
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={textInputTitleStyle}>Details</Text>
                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                    onPress={() => null}
                >
                    <Text style={textInputPlaceHolderStyle}>Enter Details</Text>
                    <Icon
                        name="chevron-thin-right"
                        size={20}
                        type="entypo"
                        color={Color.placeholderWhite}
                    //onPress={}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderProductCategory = () => {
        return (
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={textInputTitleStyle}>Category</Text>
                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                    onPress={() => null}
                >
                    <Text style={textInputPlaceHolderStyle}>Select Category</Text>
                    <Icon
                        name="chevron-thin-right"
                        size={20}
                        type="entypo"
                        color={Color.placeholderWhite}
                    //onPress={}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={container}>
                {this.renderImageView()}
                <View style={{ padding: 20 }}>
                    {this.renderPriceTextInput()}
                    {this.renderSeparator()}
                    {this.renderTitleTextInput()}
                    {this.renderSeparator()}
                    {this.renderProductCondition()}
                    {this.renderSeparator()}
                    {this.renderProductDescription()}
                    {this.renderSeparator()}
                    {this.renderProductCategory()}
                    {this.renderSeparator()}
                </View>
            </ScrollView>
        );
    }
}

NewAdForm.propTypes = {

}
