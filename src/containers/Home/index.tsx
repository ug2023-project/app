import Tree from '@/components/Tree';

const sampleData = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Folder 1',
  },
  {
    id: 2,
    parent: 1,
    droppable: false,
    text: 'File 1-1',
  },
  {
    id: 3,
    parent: 1,
    droppable: false,
    text: 'File 1-2',
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: 'Folder 2',
  },
  {
    id: 5,
    parent: 4,
    droppable: true,
    text: 'Folder 2-1',
  },
  {
    id: 6,
    parent: 5,
    droppable: false,
    text: 'File 2-1-1',
  },
  {
    id: 7,
    parent: 0,
    droppable: false,
    text: 'File 3',
  },
];

const Home = () => <Tree data={sampleData} />;

export default Home;
