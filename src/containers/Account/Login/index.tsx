import { Button, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axios/axiosConfig';
import { useState } from 'react';

import styles from '../Common/Actions.module.css';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const form = useForm<LoginFormValues>({
    initialValues: { email: '', password: '' },
    validateInputOnBlur: true,
    validate: {
      email: isEmail(t('Email_Invalid')),
    },
  });
  const [passwordVisible, { toggle }] = useDisclosure(false);
  const [error, setError] = useState(false);

  const handleLogin = (values: typeof form.values) => {
    axios
      .post('/auth/login', {
        email: values.email,
        password: values.password,
      })
      .then(() => {
        navigate('/collections');
      })
      .catch(() => setError(true));
    form.reset();
  };

  return (
    <div className={styles.formWrapper}>
      <h1>{t('Login_Header')}</h1>
      <form onSubmit={form.onSubmit(handleLogin)}>
        <TextInput
          label={t('Email_Label')}
          withAsterisk
          {...form.getInputProps('email')}
        />
        <TextInput
          type={passwordVisible ? 'text' : 'password'}
          label={t('Password_Label')}
          withAsterisk
          rightSection={
            passwordVisible ? (
              <EyeIcon onClick={toggle} className={styles.icon} />
            ) : (
              <EyeSlashIcon onClick={toggle} className={styles.icon} />
            )
          }
          {...form.getInputProps('password')}
        />
        <Button type="submit" disabled={!form.isValid()}>
          {t('Login_Button')}
        </Button>
      </form>
      {error && <p>{t('Login_Error')}</p>}
    </div>
  );
};

type LoginFormValues = {
  email: string;
  password: string;
};

export default Login;
