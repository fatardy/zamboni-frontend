import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './admin-vehicle.module.scss';
import '../../styles/table.module.scss';
// import { deleteStock, getAllStocks } from '../../services/admin';
import { deleteBy, getAll } from '../../services/admin/vehicle';
import Button from '../../components/button';

export default function AdminVehicle() {
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
      await deleteBy({ vehId: id });
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
        <h2>Vehicles</h2>
        <div className={styles.new}>
          <Button title="Create Vehicle" onClick={() => navigate('/admin/vehicle/create')} solid />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <p>Veh ID</p>
            </th>
            <th>
              <p>Make</p>
            </th>
            <th>
              <p>Model</p>
            </th>
            <th>
              <p>License Plate</p>
            </th>
            <th>
              <p>Loc ID</p>
            </th>
            <th>
              <p>Loc Name</p>
            </th>
            <th>
              <p>Vt ID</p>
            </th>
            <th>
              <p>VehicleType Name</p>
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
            <tr key={x.vehId} role="row">
              <td>
                <p>{x.vehId || '-'}</p>
              </td>
              <td>
                <p>{x.make || '-'}</p>
              </td>
              <td>
                <p>{x.model || '-'}</p>
              </td>
              <td>
                <p>{x.licensePlate || '-'}</p>
              </td>
              <td>
                <p>{x.locId || '-'}</p>
              </td>
              <td>
                <p>{`${x.locName}, ${x.city}` || '-'}</p>
              </td>
              <td>
                <p>{x.vtId || '-'}</p>
              </td>
              <td>
                <p>{x.vtName || '-'}</p>
              </td>
              <td>
                <p>{x.rate || '-'}</p>
              </td>
              <td>
                <p>{x.overFee || '-'}</p>
              </td>
              <td>
                <p>{format(parseISO(x.created_at), 'hh:mm dd MMM yyyy')}</p>
              </td>
              <td>
                <Button
                  title="delete"
                  onClick={() => { deleteTap(x.vehId); }}
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
