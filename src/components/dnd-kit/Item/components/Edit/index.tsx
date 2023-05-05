import { Button, Modal, MultiSelect, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Action, { ActionProps } from '../Action';
import Bookmark from '@/types/Bookmark';
import { PencilIcon } from '@heroicons/react/24/solid';
import { isNotEmpty, useForm } from '@mantine/form';

const Edit = ({ bookmark, ...props }: EditProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const editForm = useForm<EditFormValues>({
    initialValues: {
      title: bookmark.title,
      description: bookmark.description,
      tags: bookmark.tags,
    },
    validate: {
      title: isNotEmpty('Bookmark title is required'),
      description: isNotEmpty('Bookmark description is required'),
    },
  });

  const handleSubmit = (values: EditFormValues) => {
    console.log(values);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit bookmark" centered>
        <form
          onSubmit={editForm.onSubmit(handleSubmit)}
          className="flex flex-col gap-3"
        >
          <TextInput
            withAsterisk
            label="Title"
            {...editForm.getInputProps('title')}
          />
          <TextInput
            withAsterisk
            label="Description"
            {...editForm.getInputProps('description')}
          />
          <MultiSelect
            label="Tags"
            data={editForm.values.tags}
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(value) => {
              editForm.setFieldValue('tags', [...editForm.values.tags, value]);
              return value;
            }}
          />
          <Button
            type="submit"
            style={{
              border: '1px solid #ccc',
              marginTop: 10,
            }}
          >
            Edit bookmark
          </Button>
        </form>
      </Modal>
      <Action
        {...props}
        onClick={open}
        active={{
          fill: '#E7F5FF',
          background: '#A5D8FF',
        }}
      >
        <PencilIcon className="h-4 w-4" />
      </Action>
    </>
  );
};

type EditFormValues = {
  title: string;
  description: string;
  tags: string[];
};

type EditProps = ActionProps & {
  bookmark: Bookmark;
};

export default Edit;
