import { GridRendererFooterProps } from './types';

const GridRendererFooter = ({
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderFooter,
}: GridRendererFooterProps) => (
  <>
    {isLoading
      ? renderFooter?.skeleton
      : typeof renderFooter?.footer === 'function'
      ? renderFooter?.footer({ error, isError, isEmpty, isLoading, isFetching })
      : renderFooter?.footer}
  </>
);

GridRendererFooter.displayName = 'GridRendererFooter';

export default GridRendererFooter;
