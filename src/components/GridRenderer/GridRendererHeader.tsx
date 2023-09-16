import { GridRendererHeaderProps } from './types';

const GridRendererHeader = ({
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderHeader,
}: GridRendererHeaderProps) => (
  <>
    {isLoading
      ? renderHeader?.skeleton
      : typeof renderHeader?.header === 'function'
      ? renderHeader?.header({ error, isError, isEmpty, isLoading, isFetching })
      : renderHeader?.header}
  </>
);

GridRendererHeader.displayName = 'GridRendererHeader';

export default GridRendererHeader;
