import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './admin-location.module.scss';
import '../../styles/table.module.scss';
// import { deleteStock, getAllStocks } from '../../services/admin';
import { deleteBy, getAll } from '../../services/admin/location';
import Button from '../../components/button';

export default function AdminLocation() {
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
      await deleteBy({ locId: id });
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
        <h2>Locations</h2>
        <div className={styles.new}>
          <Button title="Create Location" onClick={() => navigate('/admin/location/create')} solid />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <p>Loc ID</p>
            </th>
            <th>
              <p>Name</p>
            </th>
            <th>
              <p>Email</p>
            </th>
            <th>
              <p>Phone</p>
            </th>
            <th>
              <p>Address</p>
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
            <tr key={x.locId} role="row">
              <td>
                <p>{x.locId || '-'}</p>
              </td>
              <td>
                <p>{x.name || '-'}</p>
              </td>
              <td>
                <p>{x.email || '-'}</p>
              </td>
              <td>
                <p>{x.phoneNumber || '-'}</p>
              </td>
              <td>
                <p>
                  {`${x.street1}, ${x.street2 ? `${x.street2},` : ''} ${x.city}, ${x.stateName}, ${x.country}, ${x.zipCode}`}
                </p>
              </td>
              <td>
                <p>{format(parseISO(x.created_at), 'hh:mm dd MMM yyyy')}</p>
              </td>
              <td>
                <Button
                  title="delete"
                  onClick={() => { deleteTap(x.locId); }}
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
