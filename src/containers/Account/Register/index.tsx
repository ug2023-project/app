import { Button, TextInput } from '@mantine/core';
import { useForm, isEmail } from '@mantine/form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axios/axiosConfig';

import styles from '../Common/Actions.module.css';
import PasswordInputWithHints from './PasswordInputWithHints';
import RegisterFormValues from './RegisterFormValues';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const form = useForm<RegisterFormValues>({
    initialValues: { email: '', password: '' },
    validateInputOnBlur: true,
    validate: {
      email: isEmail(t('Email_Invalid')),
      password: (value) => {
        if (value.length < 6) {
          return t('Password_Error_Character_Amount', { amount: 6 });
        }
        if (!value.match(/[A-Z]/)) {
          return t('Password_Error_Includes_Uppercase');
        }
        if (!value.match(/[a-z]/)) {
          return t('Password_Error_Includes_Lowercase');
        }
        if (!value.match(/[0-9]/)) {
          return t('Password_Error_Include_Number');
        }
        if (!value.match(/[$&+,:;=?@#|'<>.^*()%!-]/)) {
          return t('Password_Error_Includes_Special');
        }
        return null;
      },
    },
  });
  const [error, setError] = useState(false);

  const handleRegister = (values: typeof form.values) => {
    axios
      .post('/auth/register', {
        email: values.email,
        password: values.password,
      })
      .then(() => {
        navigate('/account/actions/login');
      })
      .catch(() => setError(true));
    form.reset();
  };

  return (
    <div className={styles.formWrapper}>
      <h1>{t('Register_Header')}</h1>
      <form onSubmit={form.onSubmit(handleRegister)}>
        <TextInput
          label={t('Email_Label')}
          withAsterisk
          {...form.getInputProps('email')}
        />
        <PasswordInputWithHints form={form} />
        <Button type="submit" disabled={!form.isValid()}>
          {t('Register_Button')}
        </Button>
      </form>
      {error && <p>{t('Error')}</p>}
    </div>
  );
};

export default Register;