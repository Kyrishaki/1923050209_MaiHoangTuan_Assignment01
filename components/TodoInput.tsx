import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { COLORS, SIZES, DEFAULT_PRIORITY } from '../constants/theme';
import { Priority } from '../types/todo';

interface TodoInputProps {
  onAddTodo: (text: string, priority: Priority) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>(DEFAULT_PRIORITY as Priority);

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung công việc!');
      return;
    }

    onAddTodo(trimmed, priority);
    // [Yêu cầu Core 1] Xóa trắng ô nhập sau khi thêm
    setText('');
    setPriority(DEFAULT_PRIORITY as Priority);
  };

  const priorityList: { value: Priority; label: string; color: string }[] = [
    { value: 'High', label: 'Cao', color: COLORS.danger },
    { value: 'Medium', label: 'Vừa', color: COLORS.warning },
    { value: 'Low', label: 'Thấp', color: COLORS.success },
  ];

  return (
    <View style={styles.container}>
      {/* Ô nhập + Nút thêm */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập công việc mới..."
          placeholderTextColor={COLORS.textMuted}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAdd}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* Chọn độ ưu tiên (Priority Levels) */}
      <View style={styles.priorityRow}>
        <Text style={styles.priorityTitle}>Độ ưu tiên:</Text>
        <View style={styles.priorityOptions}>
          {priorityList.map((p) => {
            const isSelected = priority === p.value;
            return (
              <TouchableOpacity
                key={p.value}
                style={[
                  styles.priorityButton,
                  isSelected && { backgroundColor: p.color, borderColor: p.color },
                ]}
                onPress={() => setPriority(p.value)}
              >
                <Text
                  style={[
                    styles.priorityText,
                    isSelected && styles.priorityTextSelected,
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.cardPadding,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.inputBg,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  priorityTitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  priorityOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.background,
  },
  priorityText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  priorityTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
