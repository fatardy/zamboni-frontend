import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './account.module.scss';
import TextInput from '../../components/text-input';
import { getProfile } from '../../services/user/user';
import Button from '../../components/button';

export default function Account() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    try {
      const { data } = await getProfile();
      console.log(data?.data);
      setUserData(data?.data);
    } catch (err) {
      console.log('here', err?.response?.status);
      if (err?.response?.status === 403) {
        navigate('/login');
        toast('Please log in first..');
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  function renderRow({ label, value = '--' }) {
    return (
      <div className={styles.bunch}>
        <p className={styles.label}>
          {label}
        </p>
        <p className={styles.value}>
          {value}
        </p>
      </div>

    );
  }

  const logout = () => {
    localStorage.removeItem('@token');
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Account</h2>
        <div className={styles.detail}>
          {renderRow({ label: 'User ID', value: userData?.userId })}
          {renderRow({ label: 'Email', value: userData?.email })}
          {renderRow({ label: 'Full Name', value: `${userData?.firstName} ${userData?.lastName}` })}
          {renderRow({ label: 'Street Address 1', value: userData?.street1 })}
          {renderRow({ label: 'Street Address 2', value: userData?.street2 })}
          {renderRow({ label: 'City', value: userData?.city })}
          {renderRow({ label: 'State', value: userData?.stateName })}
          {renderRow({ label: 'Zip Code', value: userData?.zipCode })}
          {renderRow({ label: 'Country', value: userData?.country })}
          {/* {renderRow({ label: 'Join Date', value: format(parseISO(userData?.created_at),
          'dd MMM yyyy') })} */}
          {renderRow({ label: 'Join Date', value: userData?.created_at })}

        </div>
        {/* <p>{JSON.stringify(userData)}</p> */}

        <Button solid={false} border title="Logout" onClick={logout} />

      </div>
    </div>
  );
}
