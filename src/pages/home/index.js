import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { differenceInHours, subDays } from 'date-fns';
import Button from '../../components/button';
import Dropdown from '../../components/drop-down';
import styles from './home.module.scss';
import { getAllLocations, getAllVehicles } from '../../services/user/public';
import 'react-datepicker/dist/react-datepicker.css';
import './home.scss';
import CONFIG from '../../main/config';

function addDays(days, date = new Date()) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function Home() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([
    { label: 'Select Pickup Location', value: NaN },
  ]);
  const [selectedLocation, setSelectedLocation] = useState(NaN);
  const [pickDate, setPickDate] = useState(new Date());
  const [dropDate, setDropDate] = useState(addDays(1));
  const [vehicles, setVehicles] = useState([]);

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
    if (Number.isNaN(selectedLocation)) {
      toast('Please select a location! :)');
      return;
    }

    try {
      const { data } = await getAllVehicles({ locId: selectedLocation });
      // console.log(data?.data);
      setVehicles(data?.data);
      if (data?.data.length === 0) {
        toast('Oops! No vehicles available at this location.. Please try another..');
      }
    } catch (err) {
      toast(err);
    }
  }

  useEffect(() => {
    fetchAllLocations();
  }, []);

  // useEffect(() => {
  //   fetchAllVehicles();
  // }, [selectedLocation]);

  const redirect = (vehicle) => {
    if (CONFIG.AUTH_TOKEN == null) {
      navigate('/login');
    } else {
      navigate('/trip/create', {
        state: {
          vehicle,
          pickDate,
          dropDate,
        },
      });
    }
  };

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
            {/* <Button solid={false} border title="Select my car" onClick={fetchAllVehicles} /> */}
            <button type="button" className={styles.button} onClick={fetchAllVehicles}>Select my car</button>
          </div>
        </div>
      </div>

      {vehicles.length > 0 && (
        <div>
          <h1 className={styles.mainHead}>Available Vehicles</h1>
        </div>
      )}
      <div className={styles.list}>
        {vehicles.map((x) => (
          <div className={styles.box} key={x.vehId}>
            <div className={styles.imgCont}>
              <img className={styles.img || './cars/2.png'} src={x.avatar} alt="img" />
            </div>
            <div className={styles.right}>
              <div className={styles.detail}>
                <p className={styles.vtName}>{x.vehName}</p>
                <p className={styles.make}>{x.make}</p>
                <p className={styles.model}>{x.model}</p>
                <p className={styles.info}>5 Seats | 1 Boot</p>
                <p className={styles.infoBtn}>View Vehicle Information</p>
              </div>
              <div className={styles.action}>
                <div className={styles.price}>
                  <p className={styles.total}>
                    $
                    {parseFloat(parseInt(x.rate, 10) * (differenceInHours(dropDate, pickDate) / 24)).toFixed(2)}
                  </p>
                  <p className={styles.day}>
                    $
                    {parseInt(x.rate, 10)}
                    {' '}
                    / Day
                  </p>
                </div>
                <div className={styles.btn}>
                  <Button solid title="  Book Car  " onClick={() => { redirect(x); }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
