
import React, { Component } from 'react';
import {
    Image,
    View,
    TextInput,
    Text, Button,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { numberWithCommas } from '../../utilities/Functions';
import Color from '../../styles/Color';

import { ConditionSelector } from '../../component/ConditionSelector';
import { LocationSelector } from '../../component/LocationSelector';

const {
    container,
    imageViewStyle,
    semiTransparentViewStyle,
    textInputPriceStyle,
    textInputTitleStyle,
    backButtonsContainer
} = styles;

export class CreateAdSteps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1, // 1: Price, 2: Title: 3: Details 4: Location
        }
    }

    onPressBackButton = () => {
        const { step } = this.state;

        this.setState({
            step: (step - 1)
        });
    }

    onPressNextButton = () => {
        const { step } = this.state;

        this.setState({
            step: step + 1
        });

        if ((step + 1) === 5) {
            this.props.changeStateOfSelectLocationModalView();
        }
    }

    renderNextButton = () => {
        const { step } = this.state;

        return (
            <View style={backButtonsContainer}>
                <Text style={{ color: '#ffffff', padding: 25, backgroundColor: 'transparent', fontSize: 18 }}
                    onPress={this.onPressBackButton}
                >
                    {step === 1 ? '' : 'Back'}
                </Text>
                <Text style={{ color: '#ffffff', padding: 25, backgroundColor: 'transparent', fontSize: 18 }}
                    onPress={this.onPressNextButton}
                >
                    {step === 5 ? 'Done' : 'Next'}
                </Text>
            </View>
        );
    }

    renderPriceTextInput = () => {
        const { productPrice, onProductPriceInput } = this.props;

        return (
            <TextInput
                style={textInputPriceStyle}
                keyboardType='numeric'
                placeholder='₹ (Price)'
                placeholderTextColor={Color.lightWhite}
                autoFocus={true}
                multiline={false}
                maxLength={10}
                onChangeText={(text) => onProductPriceInput(text.replace(/[^0-9]/g, ''))}
                value={productPrice}
            />
        );
    }

    renderTitleTextInput = () => {
        return (
            <TextInput
                style={textInputTitleStyle}
                // onChangeText={(text) => this.setState({ text })}
                placeholder="Product Title"
                clearButtonMode='always'
                placeholderTextColor={Color.lightWhite}
                multiline={false}
                maxLength={50}
                autoFocus={true}
            // value={this.state.text}
            />
        );
    }

    renderDescriptionTextInput = () => {
        return (
            <TextInput
                style={textInputTitleStyle}
                // onChangeText={(text) => this.setState({ text })}
                placeholder="Product Description"
                clearButtonMode='always'
                placeholderTextColor='#FFFFFF'
                multiline={true}
                maxLength={500}
                numberOfLines={4}
                autoFocus={true}
            // value={this.state.text}
            />
        );
    }

    renderProductCondition = () => {
        const { selectedProductCondition, setProductConditionUsed, setProductConditionNew } = this.props;

        return (
            <ConditionSelector
                selectedItem={selectedProductCondition}
                setProductConditionUsed={setProductConditionUsed}
                setProductConditionNew={setProductConditionNew}
            />
        );
    }

    renderProductLocation = () => {
        const {
            changeStateOfSelectLocationModalView,
            isSelectLocationModalViewVisible,
            selectedLocation,
            updateSelectedLocations,
            createAdStatusDone
        } = this.props;

        return (
            <LocationSelector
                isSelectLocationModalViewVisible={isSelectLocationModalViewVisible}
                changeStateOfSelectLocationModalView={changeStateOfSelectLocationModalView}
                selectedLocation={selectedLocation}
                updateSelectedLocations={updateSelectedLocations}
                createAdStatusDone={createAdStatusDone}
            />
        );
    }

    renderDynamicView = () => {
        switch (this.state.step) {
            case 1:
                return this.renderPriceTextInput();
            case 2:
                return this.renderTitleTextInput();
            case 3:
                return this.renderDescriptionTextInput();
            case 4:
                return this.renderProductCondition();
            case 5:
                return this.renderProductLocation();
        }
    }

    render() {
        const { imageURL } = this.props;
        const { step } = this.state;

        return (
            <View style={container}>
                <Image
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/innernepal-dca5b.appspot.com/o/showcaseImages%2Fshowcase_macbook_air.jpeg?alt=media&token=98f2f5dd-0d02-4365-b92d-f91a06bedb64' }}
                    style={imageViewStyle}
                />
                <View style={semiTransparentViewStyle} />
                {this.renderNextButton()}
                {this.renderDynamicView()}
            </View >
        );
    }
}

CreateAdSteps.propTypes = {
    productPrice: PropTypes.string,
    onProductPriceInput: PropTypes.func,
    selectedProductCondition: PropTypes.string,
    setProductConditionUsed: PropTypes.func,
    setProductConditionNew: PropTypes.func,

    isSelectLocationModalViewVisible: PropTypes.bool,
    changeStateOfSelectLocationModalView: PropTypes.func,
    //  selectedLocation:
    //updateSelectedLocations={updateSelectedLocations}
};