import { List } from '@mui/material';

import { getRandomNumber } from '../../utils/helpers';

import { ListRendererSkeletonItemsProps } from './types';

const RANDOM_SKELETON_LENGTH = getRandomNumber(4, 10);

const ListRendererSkeletonItems = ({ renderItem, skeletonCount, ...props }: ListRendererSkeletonItemsProps) => (
  <List {...props}>
    {Array.from({ length: skeletonCount ?? RANDOM_SKELETON_LENGTH }, (_, index) => index).map((index) =>
      renderItem.skeleton?.(index),
    )}
  </List>
);

export default ListRendererSkeletonItems;
