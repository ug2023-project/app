import { useState } from 'react';
import { Progress, Popover, TextInput } from '@mantine/core';
import PasswordRequirement from './PasswordRequirement';
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { UseFormReturnType } from '@mantine/form';

import styles from '../Common/Actions.module.css';

const PasswordInputWithHints = <T extends PasswordForm>({
  form,
}: PasswordInputWithHintsProps<T>) => {
  const { t } = useTranslation();
  const [passwordVisible, { toggle }] = useDisclosure(false);
  const [popoverOpened, setPopoverOpened] = useState(false);

  const requirements = [
    { re: /[0-9]/, label: t('Password_Error_Include_Number') },
    { re: /[a-z]/, label: t('Password_Error_Includes_Lowercase') },
    { re: /[A-Z]/, label: t('Password_Error_Includes_Uppercase') },
    {
      re: /[$&+,:;=?@#|'<>.^*()%!-]/,
      label: t('Password_Error_Includes_Special'),
    },
  ];

  const getStrength = (password: string) => {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  };

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));

  const strength = getStrength(form.values.password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <div>
      <Popover opened={popoverOpened} position="bottom" width="target">
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <TextInput
              withAsterisk
              type={passwordVisible ? 'text' : 'password'}
              label={t('Password_Label')}
              rightSection={
                passwordVisible ? (
                  <EyeIcon onClick={toggle} className={styles.icon} />
                ) : (
                  <EyeSlashIcon onClick={toggle} className={styles.icon} />
                )
              }
              {...form.getInputProps('password')}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress
            color={color}
            value={strength}
            size={5}
            style={{ marginBottom: 10 }}
          />
          <PasswordRequirement
            label={t('Password_Error_Character_Amount', { amount: 6 })}
            meets={form.values.password.length > 5}
          />
          {checks}
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

type PasswordInputWithHintsProps<T extends PasswordForm> = {
  form: UseFormReturnType<T, (values: T) => T>;
};

type PasswordForm = {
  password: string;
};

export default PasswordInputWithHints;
