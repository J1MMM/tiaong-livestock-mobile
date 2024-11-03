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
        width: 100,
        height: 100,

    }
})

export default ObjectImage;
