import { Text, Box } from '@mantine/core';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';

import styles from '../Common/Actions.module.css';

const PasswordRequirement = ({ meets, label }: PasswordRequirementProps) => (
  <Text
    color={meets ? 'teal' : 'red'}
    sx={{ display: 'flex', alignItems: 'center' }}
    mt={7}
    size="sm"
  >
    {meets ? (
      <CheckIcon className={styles.icon} />
    ) : (
      <XMarkIcon className={styles.icon} />
    )}
    <Box ml={10}>{label}</Box>
  </Text>
);

type PasswordRequirementProps = {
  meets: boolean;
  label: string;
};

export default PasswordRequirement;
