import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function MetaItem({ meta, onDelete, onToggle }) {
  return (
    <View style={styles.card}>
      <Pressable style={styles.textoArea} onPress={() => onToggle(meta.id)}>
        <Text style={[styles.texto, meta.concluida && styles.textoConcluido]}>
          {meta.texto}
        </Text>
        <Text style={styles.data}>
          {new Date(meta.criadaEm).toLocaleDateString()}
        </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.botaoRemover,
          pressed && styles.botaoPressionado,
        ]}
        android_ripple={{ color: '#ffffff55' }}
        onPress={() => onDelete(meta.id)}
      >
        <Text style={styles.textoRemover}>Remover</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  textoArea: {
    flex: 1,
  },
  texto: {
    fontSize: 15,
    color: '#222',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  data: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  botaoRemover: {
    backgroundColor: '#EF4444',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  textoRemover: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});