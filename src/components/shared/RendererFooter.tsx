import { RenderFooterProps, RendererState } from '../../types';

type RendererFooterProps = RendererState & { renderFooter: RenderFooterProps };

const RendererFooter = ({
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderFooter,
}: RendererFooterProps) => (
  <>
    {isLoading
      ? renderFooter?.skeleton
      : typeof renderFooter?.footer === 'function'
      ? renderFooter?.footer({ error, isError, isEmpty, isLoading, isFetching })
      : renderFooter?.footer}
  </>
);

RendererFooter.displayName = 'RendererFooter';

export default RendererFooter;
