const GOOGLE_API_KEY = 'AIzaSyDdyi7doRW3hct2Ht1x2z-rgG5n3XXPrR0';

export async function getAddress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    const reponse = await fetch(url);

    if (!reponse.ok) {
        throw new Error('Failed to fetch address');
    }

    const data = await reponse.json();
    const address = data.results[0].formatted_address;
    return address;
}