import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import MetaItem from './MetaItem';

export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return <Text style={styles.vazio}>Nenhuma meta cadastrada ainda.</Text>;
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MetaItem meta={item} onDelete={onDelete} onToggle={onToggle} />
      )}
      contentContainerStyle={styles.lista}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  vazio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
    fontSize: 15,
  },
});