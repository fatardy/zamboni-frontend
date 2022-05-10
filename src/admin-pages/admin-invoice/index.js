import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './admin-invoice.module.scss';
import '../../styles/table.module.scss';
// import { deleteStock, getAllStocks } from '../../services/admin';
import { getAll } from '../../services/admin/invoice';
import Button from '../../components/button';

export default function AdminInvoice() {
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
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <p>Inv ID</p>
            </th>
            <th>
              <p>Inv Date</p>
            </th>
            <th>
              <p>Amount</p>
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
              <p>Trip Status</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((x) => (
            <tr key={x.invId} role="row">
              <td>
                <p>{x.invId || '-'}</p>
              </td>
              <td>
                <p>{format(parseISO(x.invDate), 'hh:mm dd MMM yyyy')}</p>
              </td>
              <td>
                <p>{x.amount || '-'}</p>
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
                <p>{`${x.userId}` || '-'}</p>
              </td>
              <td>
                <p>{`${x.vehId}`}</p>
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
