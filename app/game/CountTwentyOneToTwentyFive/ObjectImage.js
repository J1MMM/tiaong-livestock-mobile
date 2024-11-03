import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PoppingView from '../../components/PoppingView';

const ObjectImage = ({ souce }) => {
    return (
        <PoppingView onPress={() => { }}>
            <Image source={souce} style={styles.objectImg} />
        </PoppingView>
    );
}

const styles = StyleSheet.create({
    objectImg: {
        resizeMode: 'contain',
        width: 45,
        height: 45,
    }
})

export default ObjectImage;
