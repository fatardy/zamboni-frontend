import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './admin-coupon-users.module.scss';
import '../../styles/table.module.scss';
// import { deleteStock, getAllStocks } from '../../services/admin';
import { usersCoupons } from '../../services/admin/coupon';
import Button from '../../components/button';

export default function AdminCouponUsers() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await usersCoupons();
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
    //   await deleteBy({ coupId: id });
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
      <div className={styles.backCont}>
        <br />
        <Link to="/admin/coupon">
          ← Go Back
        </Link>
        <br />
        <br />
      </div>
      <div className={styles.header}>
        <h2>Users Coupons</h2>
        {/* <div className={styles.new}>
          <Button title="Add To User" onClick={() => navigate('/admin/coupon/add-user')} solid={false} border />
          <Button title="Create Coupon" onClick={() => navigate('/admin/coupon/create')} solid />
        </div> */}
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <p>Coup ID</p>
            </th>
            <th>
              <p>Name</p>
            </th>
            <th>
              <p>Percent</p>
            </th>
            <th>
              <p>Flat Rate</p>
            </th>
            <th>
              <p>Start Date</p>
            </th>
            <th>
              <p>End Date</p>
            </th>
            <th>
              <p>User Id</p>
            </th>
            <th>
              <p>User</p>
            </th>
            <th>
              <p />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((x) => (
            <tr key={x.coupId} role="row">
              <td>
                <p>{x.coupId || '-'}</p>
              </td>
              <td>
                <p>{x.name || '-'}</p>
              </td>
              <td>
                <p>{x.percent || '-'}</p>
              </td>
              <td>
                <p>{x.flatRate || '-'}</p>
              </td>
              <td>
                <p>{format(parseISO(x.startDate), 'hh:mm dd MMM yyyy')}</p>
              </td>
              <td>
                <p>{format(parseISO(x.endDate), 'hh:mm dd MMM yyyy')}</p>
              </td>
              <td>
                <p>{x.userId}</p>
              </td>
              <td>
                <p>{`${x.firstName} ${x.lastName}`}</p>
              </td>
              {/* <td>
                <Button
                  title="delete"
                  onClick={() => { deleteTap(x.coupId); }}
                  solid={false}
                />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {JSON.stringify(stocks)} */}

    </div>
  );
}
