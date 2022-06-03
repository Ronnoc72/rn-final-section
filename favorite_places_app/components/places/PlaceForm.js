import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import { Place } from '../../models/place';

function PlaceForm({ onCreatePlace }) {
    const [enteredText, setEnteredText] = useState('');
    const [pickedLocation, setPickedLocation] = useState({lat: 40.7608, lng: 111.8910});
    const [selectImage, setSelectImage] = useState();
    const [address, setAddress] = useState('500 S Main St, Salt Lake City, UT 84101, USA');

    function changeTitleHandler(enteredText) {
        setEnteredText(enteredText);
    }

    function savePlaceHandler() {
        const placeData = new Place(enteredText, selectImage, address, pickedLocation);
        onCreatePlace(placeData);
    }

    function takeImageHandler(imageUri) {
        setSelectImage(imageUri);
    }

    function pickLocationHandler(location) {
        setPickedLocation(location);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredText} />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickLocationHandler} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    )
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
});