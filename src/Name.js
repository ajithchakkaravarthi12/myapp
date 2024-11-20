import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './name.css';

function Name() {
  const [records, setRecords] = useState([]);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;

  const addOrUpdateRecord = () => {
    if (name && mobile && email && city && age) {
      const newRecord = {
        id: selectedRecordId ? selectedRecordId : Date.now(),
        name,
        mobile,
        email,
        age,
        city
      };

      if (selectedRecordId) {
        setRecords(records.map(record => (record.id === selectedRecordId ? newRecord : record)));
        setSelectedRecordId(null);
      } else {
        setRecords([...records, newRecord]);
      }

      setName('');
      setEmail('');
      setMobile('');
      setAge('');
      setCity('');
    }
  };

  const editRecord = (record) => {
    setName(record.name);
    setAge(record.age);
    setEmail(record.email);
    setMobile(record.mobile);
    setCity(record.city);
    setSelectedRecordId(record.id);
  };

  const deleteRecord = (id) => {
    setRecords(records.filter(record => record.id !== id));
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedRecords = [...records]
    .filter(record => record.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortField) {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      }
      return 0;
    });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredAndSortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredAndSortedRecords.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!isLoggedIn) {
    if (isRegistering) {
      return <Register onRegister={() => setIsRegistering(false)} />;
    }
    return <Login onLogin={() => setIsLoggedIn(true)} onSwitchToRegister={() => setIsRegistering(true)} />;
  }

  return (
    <div className="container">
      <h2>Manage Records</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={addOrUpdateRecord}>
        {selectedRecordId ? 'Update Record' : 'Add Record'}
      </button>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('age')}>Age</th>
            <th onClick={() => handleSort('city')}>City</th>
            <th onClick={() => handleSort('mobile')}>Mobile</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.id} className="table-row">
              <td>{record.name}</td>
              <td>{record.age}</td>
              <td>{record.city}</td>
              <td>{record.mobile}</td>
              <td>{record.email}</td>
              <td>
                <button className="edit-button" onClick={() => editRecord(record)}>Edit</button>
                <button className="delete-button" onClick={() => deleteRecord(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span className="text-center">Page {currentPage}</span>
        <button onClick={nextPage} disabled={currentPage >= Math.ceil(filteredAndSortedRecords.length / recordsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Name;
