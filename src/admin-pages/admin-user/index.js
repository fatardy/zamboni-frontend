import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './admin-user.module.scss';
import '../../styles/table.module.scss';
// import { deleteStock, getAllStocks } from '../../services/admin';
import { getAll, makeAdmin } from '../../services/admin/user';
import Button from '../../components/button';

export default function AdminUser() {
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
      await makeAdmin({ userId: id });
      fetchData();
    } catch (err) {
      toast(err);
      console.log('err', err);
    }
  };

  const deleteTap = (id) => {
    const text = 'Sure you want to make this user admin?\n';
    if (window && window.confirm(text) === true) {
      fetchDelete({ id });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Users</h2>
        {/* <div className={styles.new}>
          <Button title="Create Location" onClick={() => navigate('/admin/location/create')} solid />
        </div> */}
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <p>User ID</p>
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
              <p>Joined On</p>
            </th>
            <th>
              <p>User Type</p>
            </th>
            <th>
              <p />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((x) => (
            <tr key={x.userId} role="row">
              <td>
                <p>{x.userId || '-'}</p>
              </td>
              <td>
                <p>{`${x.firstName} ${x.lastName}`}</p>
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
                <p>{x.userType || '-'}</p>
              </td>
              <td>
                {x.userType !== 'A' && (
                <Button
                  title="Admin"
                  onClick={() => { deleteTap(x.userId); }}
                  solid={false}
                />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {JSON.stringify(stocks)} */}

    </div>
  );
}
