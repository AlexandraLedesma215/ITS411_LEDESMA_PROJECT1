import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<{ id: string; text: string; done: boolean }[]>([]);

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text, done: false }]);
    setText("");
  };

  const toggle = (id: string) =>
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const del = (id: string) =>
    setTasks(tasks.filter(t => t.id !== id));

  return (
    <View style={styles.c}>
      <View style={styles.row}>
        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Task..." />
        <TouchableOpacity style={styles.btn} onPress={addTask}><Text style={styles.btnText}>＋</Text></TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={t => t.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <TouchableOpacity onPress={() => toggle(item.id)}>
              <Text>{item.done ? "✅" : "⬜"}</Text>
            </TouchableOpacity>
            <Text style={[styles.txt, item.done && styles.done]}>{item.text}</Text>
            <TouchableOpacity onPress={() => del(item.id)}><Text>🗑</Text></TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  c: { flex: 1, padding: 20, backgroundColor: "#fff" },
  row: { flexDirection: "row", marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, padding: 8, borderRadius: 5, marginRight: 5 },
  btn: { backgroundColor: "#4CAF50", padding: 10, borderRadius: 5 },
  btnText: { color: "#fff", fontSize: 18 },
  task: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  txt: { flex: 1, marginLeft: 10 },
  done: { textDecorationLine: "line-through", color: "#888" }
});
