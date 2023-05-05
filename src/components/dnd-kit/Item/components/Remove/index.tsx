import { XMarkIcon } from '@heroicons/react/24/solid';
import { ActionProps } from '../Action';
import Action from '../Action';

const Remove = (props: ActionProps) => (
  <Action
    {...props}
    active={{
      fill: 'rgba(255, 70, 70, 0.95)',
      background: 'rgba(255, 70, 70, 0.1)',
    }}
  >
    <XMarkIcon className="h-4 w-4" />
  </Action>
);

export default Remove;
