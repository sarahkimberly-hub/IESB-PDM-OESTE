import { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function Tasks() {
  const router = useRouter();
  const [place, setPlace] = useState(null);

  async function handleCheckIn() {
    try {
      const result = await getCurrentPlace();
      if (!result) {
        Alert.alert('Permissão negada', 'Ative a localização para fazer o check-in.');
        return;
      }
      setPlace(result);
    } catch {
      Alert.alert('Erro', 'Não foi possível obter sua localização.');
    }
  }

  async function handleReminder() {
    try {
      const id = await scheduleReminder('Hora de estudar!', 10);
      if (!id) Alert.alert('Permissão negada', 'Ative as notificações para receber o lembrete.');
      else Alert.alert('Lembrete agendado', 'Você será avisado em 10 segundos.');
    } catch {
      Alert.alert('Erro', 'Não foi possível agendar o lembrete.');
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      // sem vibração no emulador
    }
    Alert.alert('Tarefa concluída');
  }

  return (
    <View style={styles.container}>
      <Link href="/new-task" style={styles.link}>Nova tarefa</Link>
      <Button title="Abrir tarefa 42" onPress={() => router.push('/task/42')} />
      <Button title="Estudei aqui" onPress={handleCheckIn} />
      {place && <Text style={styles.place}>{place.label}</Text>}
      <Button title="Lembrar em 10 s" onPress={handleReminder} />
      <Button title="Concluir" onPress={handleComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 14 },
  link: { fontSize: 18, color: '#2563eb', textAlign: 'center', padding: 8 },
  place: { textAlign: 'center', fontSize: 15, color: '#333' },
});
