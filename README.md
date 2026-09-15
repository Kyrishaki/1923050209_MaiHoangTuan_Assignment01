# ASSIGNMENT 01 - TODO APP

- **Học phần**: Lập trình Mobile
- **Họ và tên**: **Mai Hoàng Tuấn**
- **Mã số sinh viên (MSSV)**: **1923050209**

---

## 🎯 TÍNH NĂNG VÀ THIẾT KẾ ỨNG DỤNG

| Hạng mục | Trạng thái | Chi tiết triển khai trong mã nguồn |
| :--- | :---: | :--- |
| **Core features** | Hoàn thành | • Nhập todo bằng TextInput + nút Thêm; tự động xóa trắng ô nhập.<br>• Hiển thị danh sách qua FlatList.<br>• Đánh dấu hoàn thành: Checkbox tick `✓` + gạch ngang chữ (`strikethrough`) + đổi màu mờ.<br>• Xóa todo khỏi danh sách bằng nút Xóa.<br>• Quản lý trạng thái danh sách công việc bằng hook `useState`. |
| **useState & State updates** | Hoàn thành | Tuân thủ tuyệt đối quy tắc cập nhật bất biến (Immutable State):<br>• Thêm: `[newTodo, ...prev]`<br>• Đổi trạng thái: `.map()`<br>• Xóa: `.filter()` |
| **Layout & Flexbox** | Hoàn thành | Sử dụng Flexbox (`flex: 1`, `flexDirection: 'row'`, `justifyContent`, `alignItems`). Bố cục Header ➔ Input & Priority ➔ Danh sách công việc ➔ Footer. |
| **Tùy chọn giao diện & tính năng** | Hoàn thành | • **Color Theme**: Dark/Blue (`#0B1329`, `#1E293B`, `#2563EB`).<br>• **Tính năng bổ sung**: Priority levels (Mức ưu tiên: Cao 🔴 / Vừa 🟡 / Thấp 🟢).<br>• **UI Style**: Cards (Dạng thẻ card bo góc). |
| **Chất lượng mã nguồn** | Hoàn thành | Phân tách component rõ ràng (`Header`, `TodoInput`, `TodoItem`, `Footer`), định kiểu TypeScript chặt chẽ, kiểm tra `tsc --noEmit` đạt 0 lỗi. |

---

## 🆔 TÍCH HỢP MÃ SỐ SINH VIÊN (STUDENT_ID = "1923050209")

1. **Định nghĩa ở đầu file**: Khai báo hằng số `const STUDENT_ID = "1923050209";` tại `App.tsx` và `constants/theme.ts`.
2. **Hiển thị ở Header**: Huy hiệu `MSSV: 1923050209` tại `components/Header.tsx`.
3. **Hiển thị ở Footer**: Dòng chữ `© 2026 Mai Hoàng Tuấn • MSSV: 1923050209` tại `components/Footer.tsx`.
4. **Dẫn xuất mã màu Theme Dark/Blue**:
   - `parseInt(STUDENT_ID[0]) === 1 ? '#2563EB' : '#1D4ED8'` tại `constants/theme.ts`.
5. **Dẫn xuất bo góc & padding**:
   - `BORDER_RADIUS = STUDENT_ID.length + 2` (= 12px) tại `constants/theme.ts`.
   - `CARD_PADDING = STUDENT_ID.length + 4` (= 14px) tại `constants/theme.ts`.
6. **Dẫn xuất mức ưu tiên mặc định**:
   - `(parseInt(STUDENT_ID.slice(-1)) % 2 === 1) ? 'High' : 'Medium'` (Số cuối `9` lẻ ➔ 'High') tại `constants/theme.ts`.
7. **Sinh Unique ID cho công việc**: Tiền tố `${STUDENT_ID}_${Date.now()}` tại `App.tsx`.

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN

```
Assignment 1/
├── App.tsx                     # Màn hình chính (quản lý useState, Flexbox, FlatList)
├── SnackApp.tsx                # File đơn lẻ chạy trên Snack.expo.dev
├── README.md                   # Tài liệu mô tả dự án
├── package.json                # Expo SDK 52, React Native 0.76
├── tsconfig.json               # Cấu hình TypeScript
├── index.js & app.json         # Khởi chạy ứng dụng Expo
├── constants/theme.ts          # STUDENT_ID, bảng màu Dark/Blue, bo góc & padding
├── types/todo.ts               # Interface Todo, Priority
└── components/
    ├── Header.tsx              # Tên sinh viên, MSSV
    ├── TodoInput.tsx           # Ô nhập liệu + Chọn mức ưu tiên + Nút Thêm
    ├── TodoItem.tsx            # Thẻ Card công việc + Checkbox + Gạch ngang + Nút Xóa
    └── Footer.tsx              # Chân trang bản quyền MSSV
```
