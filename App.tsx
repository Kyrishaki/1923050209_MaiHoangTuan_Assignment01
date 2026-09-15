// ============================================================================
// ASSIGNMENT 01: TODO APP
// Môn học: Lập trình Mobile
// Sinh viên: Mai Hoàng Tuấn | MSSV: 1923050209
// ============================================================================

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// [YÊU CẦU BẮT BUỘC: Khởi tạo hằng số STUDENT_ID ở đầu file]
const STUDENT_ID = "1923050209";

import { COLORS, SIZES } from './constants/theme';
import { Todo, Priority } from './types/todo';
import { Header } from './components/Header';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { Footer } from './components/Footer';

export default function App(): React.JSX.Element {
  // [Yêu cầu 5] Quản lý state bằng hook useState
  const [todos, setTodos] = useState<Todo[]>([
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

  // ============================================================================
  // CÁC HÀM XỬ LÝ STATE BẤT BIẾN (IMMUTABLE STATE UPDATES - TUẦN 04)
  // ============================================================================

  // [Yêu cầu Core 1] Thêm Todo mới
  const handleAddTodo = (text: string, priority: Priority) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    // Tạo Todo mới mang mã số sinh viên
    const newTodo: Todo = {
      id: `${STUDENT_ID}_${Date.now()}`,
      text,
      completed: false,
      priority,
      createdAt: timeStr,
    };

    // Dùng cú pháp spread [...] để thêm vào đầu mảng
    setTodos((prev) => [newTodo, ...prev]);
  };

  // [Yêu cầu Core 3] Đánh dấu hoàn thành
  const handleToggleComplete = (id: string) => {
    // Dùng .map() tạo object mới
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // [Yêu cầu Core 4] Xóa Todo
  const handleDeleteTodo = (id: string) => {
    // Dùng .filter() để loại bỏ phần tử
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    // Bố cục Flexbox (flex: 1)
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* [Yêu cầu Core 2] Hiển thị danh sách todo qua FlatList */}
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              {/* Header hiển thị tên và MSSV */}
              <Header />

              {/* Ô nhập công việc + chọn độ ưu tiên */}
              <TodoInput onAddTodo={handleAddTodo} />

              <Text style={styles.sectionTitle}>
                📋 Danh sách công việc ({todos.length})
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Chưa có công việc nào!</Text>
              <Text style={styles.emptySubText}>
                Todo list của sinh viên {STUDENT_ID} đang trống.
              </Text>
            </View>
          }
          style={styles.list}
        />
        <Footer />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Bố cục Flexbox & StyleSheet
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: SIZES.containerPadding,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 14,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderStyle: 'dashed',
    marginTop: 8,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptySubText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
