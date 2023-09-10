import { TableRendererHeaderProps } from './types';

const TableRendererHeader = ({
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderHeader,
}: TableRendererHeaderProps) => (
  <>
    {isLoading
      ? renderHeader?.skeleton
      : typeof renderHeader?.header === 'function'
      ? renderHeader?.header({ error, isError, isEmpty, isLoading, isFetching })
      : renderHeader?.header}
  </>
);

export default TableRendererHeader;
