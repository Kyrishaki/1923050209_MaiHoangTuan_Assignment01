import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STUDENT_ID, STUDENT_NAME, COLORS } from '../constants/theme';

export const Footer: React.FC = () => {
  return (
    <View style={styles.footerContainer}>
      {/* [STUDENT_ID Vị trí 6] - Hiển thị MSSV ở chân trang */}
      <Text style={styles.footerText}>
        © 2026 {STUDENT_NAME} • MSSV: <Text style={styles.highlight}>{STUDENT_ID}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  highlight: {
    color: COLORS.accent,
    fontWeight: '700',
  },
});
