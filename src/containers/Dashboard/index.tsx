import { TextInput, Button } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');
  const [, execute] = useAxios(
    {
      method: 'POST',
      url: '/auth/login',
      data: {
        email,
        password,
      },
    },
    {
      manual: true,
    },
  );

  const handleLogin = () => {
    execute().then(() => {
      window.location.href = '/collections';
    });
  };

  return (
    <>
      <h2>{t('test')}</h2>
      <TextInput value={email} onChange={setEmail} />
      <TextInput value={password} onChange={setPassword} />
      <Button onClick={handleLogin}>Login</Button>
    </>
  );
};

export default Home;
