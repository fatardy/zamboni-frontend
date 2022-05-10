import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Button from '../../components/button';
import Dropdown from '../../components/drop-down';
import styles from './home.module.scss';

import 'react-datepicker/dist/react-datepicker.css';
import './home.scss';

export default function Home() {
  const options = [
    { label: 'Select Pickup Location', value: 'fruit' },
    { label: 'Fruit', value: 'fruit' },
    { label: 'Vegetable', value: 'vegetable' },
    { label: 'Meat', value: 'meat' },
  ];

  const [value, setValue] = useState('fruit');
  // const [date, onChange] = useState(new Date());
  const [pickDate, setPickDate] = useState(new Date());
  const [dropDate, setDropDate] = useState(new Date());

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Find your best car rental at Zamboni</h1>
        <div className={styles.form}>
          <div className={styles.top}>
            <Dropdown
              label=""
              options={options}
              value={value}
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
            <Button solid={false} border title="Select my car" />
          </div>
        </div>
      </div>
    </div>
  );
}
