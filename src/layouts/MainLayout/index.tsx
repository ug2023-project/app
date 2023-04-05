import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import React from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export const indentationWidth = 30;

const MainLayout = ({ asideContent, searchBarContent }: MainLayoutProps) => {
  // const flattenedItems = [] as FlattenedItem[];
  // const offsetLeft = 0;
  // const sensorContext: SensorContext = useRef({
  //   items: flattenedItems,
  //   offset: offsetLeft,
  // });
  // const [coordinateGetter] = useState(() =>
  //   sortableTreeKeyboardCoordinates(sensorContext, indentationWidth),
  // );

  const sortableTreeSensors = [
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  ];

  const sortableSensors = [
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior: 'Cypress' in window ? 'auto' : undefined,
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  ];

  return (
    <DndContext
      sensors={sortableSensors}
      collisionDetection={closestCenter}
      measuring={measuring}
    >
      <div className={styles.layout}>
        {asideContent}
        <div className={styles.main}>
          {searchBarContent}
          <Outlet />
        </div>
      </div>
    </DndContext>
  );
};

type MainLayoutProps = {
  asideContent: React.ReactNode;
  searchBarContent: React.ReactNode;
};

export default MainLayout;
