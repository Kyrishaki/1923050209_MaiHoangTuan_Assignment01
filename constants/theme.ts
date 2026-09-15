// ============================================================================
// ASSIGNMENT 01: THEME & CẤU HÌNH SINH VIÊN
// Sinh viên: Mai Hoàng Tuấn | MSSV: 1923050209
// ============================================================================

// [STUDENT_ID Vị trí 1] - Khai báo bắt buộc hằng số theo đề bài
export const STUDENT_ID = "1923050209";
export const STUDENT_NAME = "Mai Hoàng Tuấn";

// [STUDENT_ID Vị trí 2] - Dẫn xuất mã màu Theme (Dark/Blue) từ chữ số STUDENT_ID
// Chữ số đầu STUDENT_ID[0] = '1' -> chọn màu chủ đạo Royal Blue
const primaryColor = parseInt(STUDENT_ID[0], 10) === 1 ? '#2563EB' : '#1D4ED8';
// Chữ số thứ sáu STUDENT_ID[5] = '5' -> chọn màu điểm nhấn Sky Blue
const accentColor = parseInt(STUDENT_ID[5], 10) >= 5 ? '#38BDF8' : '#60A5FA';

export const COLORS = {
  // Theme Dark/Blue
  background: '#0B1329',      // Nền tối xanh thẫm
  cardBg: '#1E293B',          // Nền thẻ card
  cardBorder: '#334155',      // Viền thẻ
  inputBg: '#182234',         // Nền ô nhập liệu

  primary: primaryColor,      // Xanh chủ đạo (#2563EB)
  accent: accentColor,        // Xanh điểm nhấn (#38BDF8)

  textPrimary: '#F8FAFC',     // Chữ trắng sáng
  textSecondary: '#94A3B8',   // Chữ phụ mờ
  textMuted: '#64748B',       // Chữ hoàn thành

  success: '#10B981',         // Xanh lá (Hoàn thành / Thấp)
  warning: '#F59E0B',         // Vàng cam (Ưu tiên Vừa)
  danger: '#EF4444',          // Đỏ (Ưu tiên Cao / Xóa)
};

// [STUDENT_ID Vị trí 3] - Dẫn xuất thông số bo góc và padding từ độ dài ID
export const SIZES = {
  borderRadius: STUDENT_ID.length + 2, // 10 + 2 = 12px
  cardPadding: STUDENT_ID.length + 4,  // 10 + 4 = 14px
  containerPadding: 16,
};

// [STUDENT_ID Vị trí 4] - Dẫn xuất mức ưu tiên mặc định từ chữ số cuối của ID
// STUDENT_ID[9] = '9' (số lẻ) -> Mặc định chọn 'High'
export const DEFAULT_PRIORITY = (parseInt(STUDENT_ID.slice(-1), 10) % 2 === 1) ? 'High' : 'Medium';
