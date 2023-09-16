import { List } from '@mui/material';

import { ListRendererItemsProps } from './types';

const ListRendererItems = <TData,>({
  data = [],
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderItem,
  ...props
}: ListRendererItemsProps<TData>) => (
  <List {...props}>
    {data.map((data, index) => renderItem.item(data, { isLoading, error, isError, isEmpty, isFetching }, index))}
  </List>
);

ListRendererItems.displayName = 'ListRendererItems';

export default ListRendererItems;
