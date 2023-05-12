import { StarIcon } from '@heroicons/react/24/solid';
import Action, { ActionProps } from '../Action';
import classNames from 'classnames';
import styles from '../Action/Action.module.scss';
import { useAddBookmarkToFavoriteMutation } from '../../../../../services/bookmarks';
import Bookmark from '@/types/Bookmark';

const Favorite = ({ bookmark, ...props }: FavoriteProps) => {
  const [handleAddToFavorites] = useAddBookmarkToFavoriteMutation();

  return (
    <Action
      {...props}
      active={{
        fill: bookmark.favorite ? '#fde047' : '#ffcc6f',
        background: '#ffedcc',
      }}
      onClick={() => {
        handleAddToFavorites({
          bookmarkId: bookmark.id,
          collectionId: bookmark.collectionId,
          favorite: !bookmark.favorite,
        });
      }}
    >
      <StarIcon
        className={classNames('h-4 w-4', {
          [styles.starIcon]: bookmark.favorite,
        })}
      />
    </Action>
  );
};

type FavoriteProps = ActionProps & {
  bookmark: Bookmark;
};

export default Favorite;
