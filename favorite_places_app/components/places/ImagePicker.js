import { View, Alert, Image, Text, StyleSheet } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../constants/colors';

import OutlinedButton from '../ui/OutlinedButton';

function ImagePicker({ onTakeImage }) {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPremissionInformation, requestPremission] = useCameraPermissions();

    async function verifyPermissions() {
        if (cameraPremissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPremission();

            return permissionResponse.granted;
        }
        if (cameraPremissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficent Permissions', 'You need to grant camera permissions to use this app.');
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermissions = await verifyPermissions();

        if (!hasPermissions) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image.uri);
        onTakeImage(image.uri);
    }

    let imagePreview = <Text>No Image Taken Yet.</Text>;

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{uri: pickedImage}} />;
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon='camera' onPress={takeImageHandler}>Take Image</OutlinedButton>
        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    }
});