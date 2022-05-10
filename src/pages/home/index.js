import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import Button from '../../components/button';
import Dropdown from '../../components/drop-down';
import styles from './home.module.scss';
import { getAllLocations, getAllVehicles } from '../../services/user/public';
import 'react-datepicker/dist/react-datepicker.css';
import './home.scss';

export default function Home() {
  const [locations, setLocations] = useState([
    { label: 'Select Pickup Location', value: '0' },
  ]);
  const [selectedLocation, setSelectedLocation] = useState('Select Pickup Location');
  const [pickDate, setPickDate] = useState(new Date());
  const [dropDate, setDropDate] = useState(new Date());

  const handleChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  async function fetchAllLocations() {
    try {
      const { data } = await getAllLocations();
      const locs = data?.data.map((x) => ({ ...x, label: x.name, value: x.locId }));
      setLocations([...locations, ...locs]);
    } catch (err) {
      toast(err);
    }
  }

  async function fetchAllVehicles() {
    try {
      const { data } = await getAllVehicles();
      console.log(data?.data);
    } catch (err) {
      toast(err);
    }
  }

  useEffect(() => {
    fetchAllLocations();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Find your best car rental at Zamboni</h1>
        <div className={styles.form}>
          <div className={styles.top}>
            <Dropdown
              label=""
              options={locations}
              value={selectedLocation}
              onChange={handleChange}
            />
          </div>
          <div className={styles.datesDiv}>
            <DatePicker
              selected={pickDate}
              startDate={pickDate}
              endDate={dropDate}
              selectsStart
              onChange={(date) => setPickDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />
            <DatePicker
              selected={dropDate}
              startDate={pickDate}
              endDate={dropDate}
              selectsEnd
              onChange={(date) => setDropDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />
          </div>
        </div>
        <div className={styles.btn}>
          <div className={styles.actualBtn}>
            <Button solid={false} border title="Select my car" onClick={fetchAllVehicles} />
          </div>
        </div>
      </div>
    </div>
  );
}
