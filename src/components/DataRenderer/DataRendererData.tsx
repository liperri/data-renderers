import { DataRendererDataProps } from './types';

const DataRendererData = <TData,>({
  data = undefined,
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderData,
}: DataRendererDataProps<TData>) => (
  <>{renderData.item(data ?? ({} as TData), { isLoading, error, isError, isEmpty, isFetching })}</>
);

DataRendererData.displayName = 'DataRendererData';

export default DataRendererData;
