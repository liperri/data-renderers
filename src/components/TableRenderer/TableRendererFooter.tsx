import { TableRendererFooterProps } from './types';

const TableRendererFooter = ({
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderFooter,
}: TableRendererFooterProps) => (
  <>
    {isLoading
      ? renderFooter?.skeleton
      : typeof renderFooter?.footer === 'function'
      ? renderFooter?.footer({ error, isError, isEmpty, isLoading, isFetching })
      : renderFooter?.footer}
  </>
);

export default TableRendererFooter;
