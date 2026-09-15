import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STUDENT_ID, STUDENT_NAME, COLORS, SIZES } from '../constants/theme';

export const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.textColumn}>
        <Text style={styles.appTitle}>TODO APP</Text>
        <Text style={styles.studentName}>👤 {STUDENT_NAME}</Text>
      </View>

      {/* [STUDENT_ID Vị trí 5] - Hiển thị MSSV nổi bật trên Header */}
      <View style={styles.badge}>
        <Text style={styles.badgeLabel}>MSSV</Text>
        <Text style={styles.badgeValue}>{STUDENT_ID}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.cardPadding,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  textColumn: {
    flex: 1,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
  studentName: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  badgeLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: '#E0F2FE',
  },
  badgeValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
