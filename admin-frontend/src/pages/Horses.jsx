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
              <td>{horse.needsTrimmed ? 'Yes' : 'No'}</td>
              <td>{horse.needsWormed ? 'Yes' : 'No'}</td>
              <td>{horse.needsCoggins ? 'Yes' : 'No'}</td>
              <td>{horse.needsYearly ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Horses;
