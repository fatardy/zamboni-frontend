import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './admin-vehicle-type.module.scss';
import '../../styles/table.module.scss';
// import { deleteStock, getAllStocks } from '../../services/admin';
import { deleteBy, getAll } from '../../services/admin/vehicle-type';
import Button from '../../components/button';

export default function AdminVehicleType() {
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

  const fetchDelete = async ({ id }) => {
    try {
      await deleteBy({ vtId: id });
      fetchData();
    } catch (err) {
      toast(err);
      console.log('err', err);
    }
  };

  const deleteTap = (id) => {
    const text = 'Sure you want to delete?\n';
    if (window && window.confirm(text) === true) {
      fetchDelete({ id });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Vehicle Types</h2>
        <div className={styles.new}>
          <Button title="Create Vehicle Type" onClick={() => navigate('/admin/vehicle-type/create')} solid />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <p>Vt ID</p>
            </th>
            <th>
              <p>Name</p>
            </th>
            <th>
              <p>Rate</p>
            </th>
            <th>
              <p>Over Fee</p>
            </th>
            <th>
              <p>Created On</p>
            </th>
            <th>
              <p />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((x) => (
            <tr key={x.vtId} role="row">
              <td>
                <p>{x.vtId || '-'}</p>
              </td>
              <td>
                <p>{x.name || '-'}</p>
              </td>
              <td>
                <p>{x.rate || '-'}</p>
              </td>
              <td>
                <p>{x.overFee || '-'}</p>
              </td>
              <td>
                <p>{format(parseISO(x.created_at || `${new Date()}`), 'hh:mm dd MMM yyyy')}</p>
              </td>
              <td>
                <Button
                  title="delete"
                  onClick={() => { deleteTap(x.vtId); }}
                  solid={false}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {JSON.stringify(stocks)} */}

    </div>
  );
}
