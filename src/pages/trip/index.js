import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './trip.module.scss';
import '../../styles/table.module.scss';
// import { deleteStock, getAllStocks } from '../../services/admin';
// import { deleteBy, getAll } from '../../services/admin/location';
import { getAllTrips, endTrip } from '../../services/user/trip';
import Button from '../../components/button';

export default function Trip() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await getAllTrips();
      console.log(resp?.data?.data);
      setData(resp?.data?.data || []);
    } catch (err) {
      toast(err);
      console.log('here', err?.response?.status);
      if (err?.response?.status === 403) {
        navigate('/login');
        toast('Please log in first..');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function getStandardFormattedDateTime(date = new Date()) {
    return format(date, 'yyyy-MM-dd HH-mm-ss');
  }

  const fetchEndTrip = async ({ id }) => {
    try {
      console.log(id);
      //   await deleteBy({ locId: id });
      await endTrip({
        tripId: `${id}`,
        odoEnd: 1000,
        finalDropDate: getStandardFormattedDateTime(),
      });
      fetchData();
    } catch (err) {
      toast(err?.response?.data?.error?.message);
      console.log('err', err);
    }
  };

  const payTap = ({ invId, amount }) => {
    navigate('/pay/create', {
      state: {
        invId,
        amount,
      },
    });
  };

  const endTap = (id) => {
    const text = 'End Trip?\n';
    if (window && window.confirm(text) === true) {
      fetchEndTrip({ id });
    }
  };

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
              <p>Pick Date</p>
            </th>
            <th>
              <p>Drop Date</p>
            </th>
            {/* <th>
              <p>Odo Start, End, Limit</p>
            </th> */}
            <th>
              <p>Vehicle</p>
            </th>
            <th>
              <p>Invoice</p>
            </th>
            <th>
              <p>Payment</p>
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
                <p>{`${x.pickLocId} | ${format(parseISO(x.pickDate), 'hh:mm dd MMM yyyy')}`}</p>
              </td>
              <td>
                <p>{`${x.dropLocId} | ${format(parseISO(x.dropDate), 'hh:mm dd MMM yyyy')}`}</p>
              </td>
              {/* <td>
                <p>{`${x.odoStart}, ${x.odoEnd}, ${x.odoLimit}`}</p>
              </td> */}
              <td>
                <p>{`${x.vehId} | ${x.make}, ${x.model}`}</p>
              </td>
              <td>
                <p>{`${x.invId} | ${x.amount}`}</p>
              </td>
              {x.payId == null ? (
                <td>
                  <Button
                    title="pay"
                    onClick={() => { payTap({ invId: x.invId, amount: x.amount }); }}
                    solid={false}
                  />
                </td>
              ) : (
                <td>
                  <p>{`${x.payId} | ${x.paidAmount} | ${x.method} | ${x.cardNo}`}</p>
                </td>
              )}
              {x.inProgress ? (
                <td>
                  <Button
                    title="end"
                    onClick={() => { endTap(x.tripId); }}
                    solid
                  />
                </td>
              ) : (
                <td>
                  <p />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {JSON.stringify(stocks)} */}

    </div>
  );
}
