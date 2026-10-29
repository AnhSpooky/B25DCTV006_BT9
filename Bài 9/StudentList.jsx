import React from 'react';

const StudentList = ({ items, onRemove }) => {
  if (!items || items.length === 0) {
    return <p className="empty-message">Chưa có sinh viên</p>;
  }

  return (
    <ul className="student-list">
      {items.map((sv) => (
        <li key={sv.id} className="student-item">
          <span>{sv.name} – {sv.major}</span>
          <button className="btn-remove" onClick={() => onRemove(sv.id)}>
            [Xóa]
          </button>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;