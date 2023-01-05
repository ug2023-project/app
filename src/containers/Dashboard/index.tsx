import Tree from '@/components/Tree';
import { TextInput, Button } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import useAxios from 'axios-hooks';
import { useTranslation } from 'react-i18next';

const sampleData = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Folder 1',
  },
  {
    id: 2,
    parent: 0,
    droppable: true,
    text: 'Folder 2',
  },
  {
    id: 3,
    parent: 0,
    droppable: true,
    text: 'Folder 3',
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: 'Folder 4',
  },
  {
    id: 5,
    parent: 0,
    droppable: true,
    text: 'Folder 5',
  },
  {
    id: 6,
    parent: 0,
    droppable: true,
    text: 'Folder 6',
  },
  {
    id: 7,
    parent: 0,
    droppable: true,
    text: 'Folder 7',
  },
];

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
    execute();
  };

  return (
    <>
      <h2>{t('test')}</h2>
      <Tree data={sampleData} />
      <TextInput value={email} onChange={setEmail} />
      <TextInput value={password} onChange={setPassword} />
      <Button onClick={handleLogin}>Login</Button>
    </>
  );
};

export default Home;
