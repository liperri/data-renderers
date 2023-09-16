// TODO: const shouldRenderOverlayFetchingOrError = (!isLoading && isFetching) || (!isLoading && !data.length) || (isFetching && data.length) || isError;
// => !isLoading || (isFetching && data.length) || isError;
// TODO: isEmpty: !isError && !isLoading && !isFetching && !data.length => isEmpty: !data.length,

export { ListRenderer } from './ListRenderer';
export type {
  ListRendererFooterProps,
  ListRendererHeaderProps,
  ListRendererProps,
  ListRendererState,
  ListRendererStateWithData,
} from './ListRenderer';

export { TableRenderer } from './TableRenderer';
export type {
  TableRendererFooterProps,
  TableRendererHeadProps,
  TableRendererHeaderProps,
  TableRendererProps,
  TableRendererRowProps,
  TableRendererState,
  TableRendererStateWithData,
} from './TableRenderer';
