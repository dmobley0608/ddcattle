import React from 'react';
import { useGetHorsesQuery } from '../slices/apiSlice';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Horses = () => {
  const { data: horses, isLoading, isError } = useGetHorsesQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading horses.</div>;

  const handleRowClick = (id) => {
    navigate(`/qwerty/horses/${id}`);
  };

  const formatDays = (days) => {
    if (!days && days !== 0) return 'N/A';
    return days < 0 ? 'YES' : `${Math.round(days)} days`;
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Needs Trimmed</th>
            <th>Needs Wormed</th>
            <th>Needs Coggins</th>
            <th>Needs Yearly</th>
          </tr>
        </thead>
        <tbody>
          {horses?.map((horse) => (
            <tr key={horse.id} onClick={() => handleRowClick(horse.id)} style={{ cursor: 'pointer' }}>
              <td>{horse.name}</td>
              <td>{horse.age}</td>
              <td>{horse.sex}</td>
              <td>{formatDays(horse.needsTrimmed)}</td>
              <td>{formatDays(horse.needsWormed)}</td>
              <td>{formatDays(horse.needsCoggins)}</td>
              <td>{formatDays(horse.needsYearly)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Horses;
