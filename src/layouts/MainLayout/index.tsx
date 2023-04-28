import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import React from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
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
  const sortableSensors = [
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {
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
