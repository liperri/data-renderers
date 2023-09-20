import { cloneElement, useMemo } from 'react';

import { DataRendererProps } from '../../types';
import { RendererOverlay } from '../shared';

/**
 * Свойства DataRenderer
 * @template TData - тип данных, которые будут отображены в компоненте
 * @example
 * ```tsx
 *  <DataRenderer
 *    element={<Box />}
 *    isLoading={isLoading}
 *    isFetching={isFetching}
 *    isError={isError}
 *    error="Сообщение об ошибке"
 *    data={data}
 *    render={{
 *      item: (data, state) => <ItemComponent data={data} state={state} />,
 *      skeleton: <SkeletonComponent />,
 *    }}
 *  />
 * ```
 */
const DataRenderer = <TData,>({
  data = undefined,
  isLoading = false,
  isFetching = false,
  isError = false,
  error = null,
  render,
  renderOverlay,
  element,
}: DataRendererProps<TData>) => {
  const overlayState = useMemo(
    () => ({
      error,
      isFetching,
      isError,
      isEmpty: !Object.keys(data || {}).length,
    }),
    [isFetching, isError, data, error],
  );

  const shouldRenderOverlayFetchingOrError =
    !isLoading && ((isFetching && !overlayState.isEmpty) || isError || overlayState.isEmpty);

  return cloneElement(
    element,
    { ...element.props, ...(shouldRenderOverlayFetchingOrError ? { style: { position: 'relative' } } : {}) },
    <>
      {isLoading
        ? render.skeleton
        : !overlayState.isEmpty && render.item(data || ({} as NonNullable<TData>), overlayState)}

      {shouldRenderOverlayFetchingOrError && <RendererOverlay renderOverlay={renderOverlay} {...overlayState} />}
    </>,
  );
};

DataRenderer.displayName = 'DataRenderer';

export default DataRenderer;
