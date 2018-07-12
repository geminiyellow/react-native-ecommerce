import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProfilePublic from './ProfilePublic';

import { postCollectionRef } from '../../utilities/DBReferences';

class ProfilePublicContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sellerAdsList: [],
            isFetchingAdsDataFromFirestore: false
        }
    }

    async componentWillMount() {
        const { sellerData } = this.props;
        const { ownerID } = sellerData;

        this.setState({
            isFetchingAdsDataFromFirestore: true
        });

        const { sellerAdsList } = this.state;
        let copySellerAdsList = [...sellerAdsList];

        //For order by issue refer this discussion : https://github.com/invertase/react-native-firebase/issues/568
        await postCollectionRef.where('ownerID', '==', ownerID).orderBy('updatedAt', 'desc').get()
            .then((snapshot) => {
                let dSArray = [];
                snapshot.forEach((doc) => {
                    dSArray.push(doc.data());
                });
                copySellerAdsList = [...copySellerAdsList, ...dSArray];
            })
            .catch((err) => {
                console.log('Error getting documents', err);
                this.setState({
                    isFetchingAdsDataFromFirestore: false
                });
            });

        this.setState({
            sellerAdsList: copySellerAdsList,
            isFetchingAdsDataFromFirestore: false
        });
    }

    render() {
        const { sellerData } = this.props;
        const { sellerAdsList, isFetchingAdsDataFromFirestore } = this.state;

        return (
            <ProfilePublic
                sellerData={sellerData}
                sellerAdsList={sellerAdsList}
                isFetchingAdsDataFromFirestore={isFetchingAdsDataFromFirestore}
            />
        );
    }
}

ProfilePublicContainer.propTypes = {
    sellerData: PropTypes.object
};

export default ProfilePublicContainer;
