import { NodeModel } from '@minoru/react-dnd-treeview';
import TreeCollectionData from './TreeCollectionData';

export type CollectionId = number | string;

type TreeCollection = NodeModel<TreeCollectionData>;

export default TreeCollection;
