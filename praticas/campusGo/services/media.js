import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });
  if (result.canceled) return null;
  return result.assets[0].uri;
}

export async function takePhoto() {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  if (!granted) {
    Alert.alert('Permissão negada', 'Precisamos da câmera para tirar a foto.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
    ]);
    return null;
  }
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });
  if (result.canceled) return null;
  return result.assets[0].uri;
}
