import Tree from '@/components/Tree';
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
  return (
    <>
      <h2>{t('test')}</h2>
      <Tree data={sampleData} />
    </>
  );
};

export default Home;
