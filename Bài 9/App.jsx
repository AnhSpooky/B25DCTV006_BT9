import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import { useFetch } from './useFetch';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import './App.css';

// Thay đổi link này bằng API endpoint thực tế của bạn từ MockAPI
const API_URL = 'https://YOUR_MOCKAPI_URL_HERE.mockapi.io/students';

const MainContent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: students, setData: setStudents, loading } = useFetch(API_URL);

  const handleAdd = async (newStudent) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      const savedStudent = await response.json();
      setStudents([...students, savedStudent]); // Cập nhật state sau khi thêm
    } catch (error) {
      console.error("Lỗi khi thêm sinh viên:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setStudents(students.filter((s) => s.id !== id)); // Cập nhật state sau khi xóa[cite: 10]
    } catch (error) {
      console.error("Lỗi khi xóa sinh viên:", error);
    }
  };

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="container">
        <header className="header-control">
          <h2>Quản lý sinh viên</h2>
          <button className="btn-theme" onClick={toggleTheme}>
            Đổi giao diện ({theme === 'light' ? 'Tối' : 'Sáng'})
          </button>
        </header>
        
        <StudentForm onAdd={handleAdd} />
        
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <StudentList items={students} onRemove={handleRemove} />
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
};

export default App;