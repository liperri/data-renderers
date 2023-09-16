import { Grid } from '@mui/material';

import { GridRendererItemsProps } from './types';

const GridRendererItems = <TData,>({
  data = [],
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderItem,
  ...props
}: GridRendererItemsProps<TData>) => (
  <Grid {...props} container>
    {data.map((data, index) => renderItem.item(data, { isLoading, error, isError, isEmpty, isFetching }, index))}
  </Grid>
);

GridRendererItems.displayName = 'GridRendererItems';

export default GridRendererItems;
