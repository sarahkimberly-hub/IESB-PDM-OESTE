import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const pos = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = pos.coords;

  let label = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
  try {
    const [addr] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (addr) {
      const parts = [addr.street, addr.district || addr.subregion, addr.city].filter(Boolean);
      if (parts.length) label = parts.join(', ');
    }
  } catch {
    // mantém as coordenadas como rótulo
  }
  return { latitude, longitude, label };
}
