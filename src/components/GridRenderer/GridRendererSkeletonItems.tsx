import { Grid } from '@mui/material';

import { getRandomNumber } from '../../utils/helpers';

import { GridRendererSkeletonItemsProps } from './types';

const RANDOM_SKELETON_LENGTH = getRandomNumber(4, 10);

const GridRendererSkeletonItems = ({ renderItem, skeletonCount, ...props }: GridRendererSkeletonItemsProps) => (
  <Grid {...props} container>
    {Array.from({ length: skeletonCount ?? RANDOM_SKELETON_LENGTH }, (_, index) => index).map((index) =>
      renderItem.skeleton?.(index),
    )}
  </Grid>
);

GridRendererSkeletonItems.displayName = 'GridRendererSkeletonItems';

export default GridRendererSkeletonItems;
