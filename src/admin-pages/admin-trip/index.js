import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './admin-trip.module.scss';
import '../../styles/table.module.scss';
// import { deleteStock, getAllStocks } from '../../services/admin';
import { getAll } from '../../services/admin/trip';
import Button from '../../components/button';

export default function AdminTrip() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await getAll();
      console.log(resp?.data?.data);
      setData(resp?.data?.data || []);
    } catch (err) {
      // console.log(err);
      toast(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Trips</h2>
        {/* <div className={styles.new}>
          <Button title="Create Location" onClick={() => navigate('/admin/location/create')} solid />
        </div> */}
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <p>Trip ID</p>
            </th>
            <th>
              <p>Pick Loc</p>
            </th>
            <th>
              <p>Pick Date</p>
            </th>
            <th>
              <p>Drop Loc</p>
            </th>
            <th>
              <p>Drop Date</p>
            </th>
            <th>
              <p>Odo Start, End, Limit</p>
            </th>
            <th>
              <p>User</p>
            </th>
            <th>
              <p>Vehicle</p>
            </th>
            <th>
              <p>Status</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((x) => (
            <tr key={x.tripId} role="row">
              <td>
                <p>{x.tripId || '-'}</p>
              </td>
              <td>
                <p>{x.pickLocId}</p>
              </td>
              <td>
                <p>{`${format(parseISO(x.pickDate), 'hh:mm dd MMM yyyy')}`}</p>
              </td>
              <td>
                <p>{x.dropLocId}</p>
              </td>
              <td>
                <p>{`${format(parseISO(x.dropDate), 'hh:mm dd MMM yyyy')}`}</p>
              </td>
              <td>
                <p>{`${x.odoStart}, ${x.odoEnd}, ${x.odoLimit}`}</p>
              </td>
              <td>
                <p>{`${x.userId} | ${x.firstName} ${x.lastName}` || '-'}</p>
              </td>
              <td>
                <p>{`${x.vehId} | ${x.make}, ${x.model}`}</p>
              </td>
              <td>
                <p>{x.inProgress ? 'In Progress' : 'Done'}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {JSON.stringify(stocks)} */}

    </div>
  );
}
