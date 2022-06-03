import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';

import { Colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';

function LocationPicker({ onPickLocation }) {
    const [pickedLocation, setPickedLocation] = useState({lat: 40.7608, lng: 111.8910});

    async function verifyPermissions() {
        const [locationPermissionInfo, requestPermissions] = useForegroundPermissions();
        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermissions();

            return permissionResponse.granted;
        }
        if (locationPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficent Permissions', 'You need to grant camera permissions to use this app.');
            return false;
        }
        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        Alert.alert('Sorry', 'This feature doesn\' work, the location is set to Salt Lake City.');
    }
    function pickOnMapHandler() {
        Alert.alert('Sorry', 'This feature doesn\' work, the location is set to Salt Lake City.');
    }

    return (
        <View>
            <View style={styles.mapPreview}></View>
            <View style={styles.actions}>
                <OutlinedButton onPress={getLocationHandler} icon='location'>Locate User</OutlinedButton>
                <OutlinedButton onPress={pickOnMapHandler} icon='map'> Pick on Map</OutlinedButton>
            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});