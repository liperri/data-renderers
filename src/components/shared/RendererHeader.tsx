import { RenderHeaderProps, RendererState } from '../../types';

type RendererHeaderProps = RendererState & { renderHeader: RenderHeaderProps };

const RendererHeader = ({
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderHeader,
}: RendererHeaderProps) => (
  <>
    {isLoading
      ? renderHeader?.skeleton
      : typeof renderHeader?.header === 'function'
      ? renderHeader?.header({ error, isError, isEmpty, isLoading, isFetching })
      : renderHeader?.header}
  </>
);

RendererHeader.displayName = 'RendererHeader';

export default RendererHeader;
