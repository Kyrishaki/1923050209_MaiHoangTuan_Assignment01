import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const STUDENT_ID = "1923050209";
const STUDENT_NAME = "Mai Hoàng Tuấn";

const primaryColor = parseInt(STUDENT_ID[0], 10) === 1 ? '#2563EB' : '#1D4ED8';
const accentColor = parseInt(STUDENT_ID[5], 10) >= 5 ? '#38BDF8' : '#60A5FA';
const BORDER_RADIUS = STUDENT_ID.length + 2;
const CARD_PADDING = STUDENT_ID.length + 4;
const DEFAULT_PRIORITY = (parseInt(STUDENT_ID.slice(-1), 10) % 2 === 1) ? 'High' : 'Medium';

const COLORS = {
  background: '#0B1329',
  cardBg: '#1E293B',
  cardBorder: '#334155',
  inputBg: '#182234',
  primary: primaryColor,
  accent: accentColor,
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
};

const HeaderComponent = () => (
  <View style={headerStyles.container}>
    <View style={{ flex: 1 }}>
      <Text style={headerStyles.title}>TODO APP</Text>
      <Text style={headerStyles.subtitle}>👤 {STUDENT_NAME}</Text>
    </View>
    <View style={headerStyles.badge}>
      <Text style={headerStyles.badgeLabel}>MSSV</Text>
      <Text style={headerStyles.badgeValue}>{STUDENT_ID}</Text>
    </View>
  </View>
);

const TodoInputComponent = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(DEFAULT_PRIORITY);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung công việc!');
      return;
    }
    onAdd(trimmed, priority);
    setText('');
    setPriority(DEFAULT_PRIORITY);
  };

  const priorityList = [
    { value: 'High', label: 'Cao', color: COLORS.danger },
    { value: 'Medium', label: 'Vừa', color: COLORS.warning },
    { value: 'Low', label: 'Thấp', color: COLORS.success },
  ];

  return (
    <View style={inputStyles.container}>
      <View style={inputStyles.row}>
        <TextInput
          style={inputStyles.input}
          placeholder="Nhập công việc mới..."
          placeholderTextColor={COLORS.textMuted}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
        <TouchableOpacity style={inputStyles.button} onPress={handleSubmit} activeOpacity={0.8}>
          <Text style={inputStyles.buttonText}>Thêm</Text>
        </TouchableOpacity>
      </View>

      <View style={inputStyles.priorityRow}>
        <Text style={inputStyles.priorityTitle}>Độ ưu tiên:</Text>
        <View style={inputStyles.priorityButtons}>
          {priorityList.map((p) => {
            const isSelected = priority === p.value;
            return (
              <TouchableOpacity
                key={p.value}
                style={[
                  inputStyles.pButton,
                  isSelected && { backgroundColor: p.color, borderColor: p.color },
                ]}
                onPress={() => setPriority(p.value)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    inputStyles.pButtonText,
                    isSelected && { color: '#FFFFFF', fontWeight: 'bold' },
                  ]}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const TodoItemComponent = ({ item, onToggle, onDelete }) => {
  const pColor =
    item.priority === 'High'
      ? COLORS.danger
      : item.priority === 'Medium'
      ? COLORS.warning
      : COLORS.success;

  const pLabel =
    item.priority === 'High' ? 'Cao' : item.priority === 'Medium' ? 'Vừa' : 'Thấp';

  return (
    <View style={[itemStyles.card, item.completed && itemStyles.cardCompleted]}>
      <TouchableOpacity
        style={[itemStyles.checkbox, item.completed && itemStyles.checkboxCompleted]}
        onPress={() => onToggle(item.id)}
        activeOpacity={0.7}
      >
        {item.completed && <Text style={itemStyles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <TouchableOpacity
        style={itemStyles.content}
        onPress={() => onToggle(item.id)}
        activeOpacity={0.8}
      >
        <Text style={[itemStyles.text, item.completed && itemStyles.textCompleted]} numberOfLines={2}>
          {item.text}
        </Text>
        <View style={itemStyles.metaRow}>
          <View style={[itemStyles.pBadge, { borderColor: pColor }]}>
            <Text style={[itemStyles.pBadgeText, { color: pColor }]}>{pLabel}</Text>
          </View>
          <Text style={itemStyles.timeText}>{item.createdAt}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={itemStyles.deleteBtn}
        onPress={() => onDelete(item.id)}
        activeOpacity={0.7}
      >
        <Text style={itemStyles.deleteText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
};

const FooterComponent = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>
      © 2026 {STUDENT_NAME} • MSSV:{' '}
      <Text style={{ color: COLORS.accent, fontWeight: '700' }}>
        {STUDENT_ID}
      </Text>
    </Text>
  </View>
);

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: `${STUDENT_ID}_1`,
      text: `Làm bài tập Assignment 01 Todo App (MSSV: ${STUDENT_ID})`,
      completed: true,
      priority: 'High',
      createdAt: '08:00',
    },
    {
      id: `${STUDENT_ID}_2`,
      text: 'Ôn tập kiến thức Props, State và Flexbox tuần 04',
      completed: false,
      priority: 'Medium',
      createdAt: '09:30',
    },
    {
      id: `${STUDENT_ID}_3`,
      text: 'Chuẩn bị bài thuyết trình đồ án cá nhân',
      completed: false,
      priority: 'Low',
      createdAt: '10:00',
    },
  ]);

  const handleAdd = (text, priority) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newTodo = {
      id: `${STUDENT_ID}_${Date.now()}`,
      text,
      completed: false,
      priority,
      createdAt: timeStr,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItemComponent
              item={item}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              <HeaderComponent />
              <TodoInputComponent onAdd={handleAdd} />
              <Text style={styles.sectionTitle}>
                📋 Danh sách công việc ({todos.length})
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>Chưa có công việc nào!</Text>
              <Text style={styles.emptySub}>
                Todo list của sinh viên {STUDENT_ID} đang trống.
              </Text>
            </View>
          }
          style={styles.list}
        />
        <FooterComponent />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, paddingHorizontal: 16 },
  list: { flex: 1 },
  listContent: { paddingVertical: 14, paddingBottom: 20 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
    marginTop: 4,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: COLORS.cardBg,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderStyle: 'dashed',
    marginTop: 8,
  },
  emptyTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  emptySub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  footer: {
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    marginTop: 10,
  },
  footerText: { fontSize: 12, color: COLORS.textSecondary },
});

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: BORDER_RADIUS,
    padding: CARD_PADDING,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.accent },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4 },
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  badgeLabel: { fontSize: 8, fontWeight: '700', color: '#E0F2FE' },
  badgeValue: { fontSize: 13, fontWeight: 'bold', color: '#FFFFFF' },
});

const inputStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBg,
    borderRadius: BORDER_RADIUS,
    padding: CARD_PADDING,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  input: {
    flex: 1,
    backgroundColor: COLORS.inputBg,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  priorityTitle: { fontSize: 12, color: COLORS.textSecondary },
  priorityButtons: { flexDirection: 'row', gap: 8 },
  pButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.background,
  },
  pButtonText: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '500' },
});

const itemStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: BORDER_RADIUS,
    padding: CARD_PADDING,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  cardCompleted: { backgroundColor: '#131D31', opacity: 0.8 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: COLORS.background,
  },
  checkboxCompleted: { backgroundColor: COLORS.primary, borderColor: COLORS.accent },
  checkmark: { color: '#FFFFFF', fontSize: 13, fontWeight: 'bold' },
  content: { flex: 1 },
  text: { fontSize: 14, color: COLORS.textPrimary, fontWeight: '500', marginBottom: 4 },
  textCompleted: { textDecorationLine: 'line-through', color: COLORS.textMuted },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pBadge: { borderWidth: 1, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 1 },
  pBadgeText: { fontSize: 9, fontWeight: '700' },
  timeText: { fontSize: 10, color: COLORS.textSecondary },
  deleteBtn: {
    backgroundColor: '#3B181E',
    borderWidth: 1,
    borderColor: COLORS.danger,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  deleteText: { color: COLORS.danger, fontSize: 12, fontWeight: '600' },
});
