import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { useNotices } from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';

export default function Home() {
  const { notices, isLoading, error, reload } = useNotices();

  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      refreshing={isLoading}
      onRefresh={reload}
      ListEmptyComponent={<Text style={styles.empty}>Nenhum aviso por enquanto.</Text>}
      renderItem={({ item, index }) => (
        <FadeIn delay={index * 60} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  error: { color: '#b91c1c', fontSize: 16, textAlign: 'center' },
  list: { padding: 16, gap: 12 },
  empty: { textAlign: 'center', marginTop: 40, color: '#666' },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, elevation: 2, shadowOpacity: 0.1, shadowRadius: 4 },
  title: { fontWeight: '700', marginBottom: 6, textTransform: 'capitalize' },
  body: { color: '#444' },
});
