import { ListRendererFooterProps } from './types';

const ListRendererFooter = ({
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderFooter,
}: ListRendererFooterProps) => (
  <>
    {isLoading
      ? renderFooter?.skeleton
      : typeof renderFooter?.footer === 'function'
      ? renderFooter?.footer({ error, isError, isEmpty, isLoading, isFetching })
      : renderFooter?.footer}
  </>
);

ListRendererFooter.displayName = 'ListRendererFooter';

export default ListRendererFooter;
