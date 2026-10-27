import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function Profile() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(PHOTO_KEY)
      .then((uri) => uri && setPhoto(uri))
      .catch(() => {});
  }, []);

  async function savePhoto(uri) {
    if (!uri) return;
    setPhoto(uri);
    await AsyncStorage.setItem(PHOTO_KEY, uri);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={async () => savePhoto(await pickImage())}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.hint}>Toque para escolher</Text>
          </View>
        )}
      </Pressable>
      <Button title="Tirar foto" onPress={async () => savePhoto(await takePhoto())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 },
  avatar: { width: 140, height: 140, borderRadius: 70 },
  placeholder: { backgroundColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
  hint: { color: '#666', textAlign: 'center', fontSize: 12 },
});
