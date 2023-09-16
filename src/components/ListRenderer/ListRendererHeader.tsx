import { ListRendererHeaderProps } from './types';

const ListRendererHeader = ({
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderHeader,
}: ListRendererHeaderProps) => (
  <>
    {isLoading
      ? renderHeader?.skeleton
      : typeof renderHeader?.header === 'function'
      ? renderHeader?.header({ error, isError, isEmpty, isLoading, isFetching })
      : renderHeader?.header}
  </>
);

ListRendererHeader.displayName = 'ListRendererHeader';

export default ListRendererHeader;
