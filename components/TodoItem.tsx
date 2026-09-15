import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { Todo } from '../types/todo';

interface TodoItemProps {
  item: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  item,
  onToggleComplete,
  onDelete,
}) => {
  const getPriorityLabel = (p: Todo['priority']) => {
    if (p === 'High') return { label: 'Cao', color: COLORS.danger };
    if (p === 'Medium') return { label: 'Vừa', color: COLORS.warning };
    return { label: 'Thấp', color: COLORS.success };
  };

  const priorityMeta = getPriorityLabel(item.priority);

  return (
    // [Custom UI Style: Cards] Thẻ card bo góc
    <View style={[styles.card, item.completed && styles.cardCompleted]}>
      {/* [Core Requirement 3] Checkbox đánh dấu hoàn thành */}
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
        onPress={() => onToggleComplete(item.id)}
        activeOpacity={0.7}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      {/* Nội dung công việc + Mức ưu tiên */}
      <TouchableOpacity
        style={styles.content}
        onPress={() => onToggleComplete(item.id)}
        activeOpacity={0.8}
      >
        {/* [Core Requirement 3] Đổi màu và gạch ngang chữ khi hoàn thành */}
        <Text
          style={[styles.text, item.completed && styles.textCompleted]}
          numberOfLines={2}
        >
          {item.text}
        </Text>

        <View style={styles.metaRow}>
          {/* Badge mức độ ưu tiên */}
          <View
            style={[
              styles.priorityBadge,
              { borderColor: priorityMeta.color },
            ]}
          >
            <Text style={[styles.priorityBadgeText, { color: priorityMeta.color }]}>
              {priorityMeta.label}
            </Text>
          </View>

          <Text style={styles.timeText}>{item.createdAt}</Text>
        </View>
      </TouchableOpacity>

      {/* [Core Requirement 4] Nút xóa công việc khỏi danh sách */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.cardPadding,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  cardCompleted: {
    backgroundColor: '#131D31',
    opacity: 0.8,
  },
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
  checkboxCompleted: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.accent,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginBottom: 4,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  priorityBadgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  timeText: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  deleteButton: {
    backgroundColor: '#3B181E',
    borderWidth: 1,
    borderColor: COLORS.danger,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: '600',
  },
});
