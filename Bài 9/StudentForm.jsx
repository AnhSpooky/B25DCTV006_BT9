import React, { useState } from 'react';

const StudentForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: '', email: '', major: 'CNTT' });
  const [errors, setErrors] = useState({ name: '', email: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '' };

    if (formData.name.trim().length < 3) {
      newErrors.name = 'Họ tên phải từ 3 ký tự trở lên';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không đúng định dạng';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAdd(formData);
      // Xóa form sau khi thêm thành công
      setFormData({ name: '', email: '', major: 'CNTT' });
      setErrors({ name: '', email: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h3>Thêm sinh viên</h3>
      
      <div className="form-group">
        <label>Họ tên</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nhập họ tên"
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Nhập email"
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Ngành</label>
        <select
          value={formData.major}
          onChange={(e) => setFormData({ ...formData, major: e.target.value })}
        >
          <option value="CNTT">CNTT</option>
          <option value="ATTT">ATTT</option>
          <option value="DPT">DPT</option>
        </select>
      </div>

      <button type="submit" className="btn-add">Thêm</button>
    </form>
  );
};

export default StudentForm;