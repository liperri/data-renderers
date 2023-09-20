import { cloneElement, useMemo } from 'react';

import { omit } from '../../utils/helpers';

import { DataRendererProps } from './types';
import DataRendererData from './DataRendererData';
import DataRendererOverlay from './DataRendererOverlay';
import DataRendererSkeleton from './DataRendererSkeleton';

const DataRenderer = <TData,>({
  data = undefined,
  isLoading = false,
  isFetching = false,
  isError = false,
  error = null,
  renderData,
  renderOverlay,
  element,
  ...props
}: DataRendererProps<TData>) => {
  const dataRendererState = useMemo(
    () => ({
      error,
      isFetching,
      isError,
      isEmpty: !Object.keys(data || {}).length,
      isLoading,
    }),
    [isLoading, isFetching, isError, data, error],
  );

  const shouldRenderOverlayFetchingOrError =
    !isLoading && ((isFetching && !dataRendererState.isEmpty) || isError || dataRendererState.isEmpty);

  return cloneElement(
    element,
    { ...props, ...(shouldRenderOverlayFetchingOrError ? { style: { position: 'relative' } } : {}) },
    <>
      {isLoading ? (
        <DataRendererSkeleton renderData={renderData} {...props} />
      ) : (
        !dataRendererState.isEmpty && (
          <DataRendererData data={data} renderData={renderData} {...dataRendererState} {...props} />
        )
      )}

      {shouldRenderOverlayFetchingOrError && (
        <DataRendererOverlay renderOverlay={renderOverlay} {...omit(dataRendererState, 'isLoading')} />
      )}
    </>,
  );
};

DataRenderer.displayName = 'DataRenderer';

export default DataRenderer;
