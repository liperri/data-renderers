import { cloneElement, useMemo } from 'react';

import { DataRendererProps } from '../../types';

import { RendererFooter, RendererHeader, RendererOverlay } from '../shared';

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
  element = <></>,
  render,
  renderFooter,
  renderHeader,
  renderOverlay,
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

  const shouldRenderOverlay =
    !isLoading && ((overlayState.isFetching && !overlayState.isEmpty) || overlayState.isError || overlayState.isEmpty);

  return cloneElement(
    element,
    { ...element.props, ...(shouldRenderOverlay ? { style: { position: 'relative' } } : {}) },
    <>
      {renderHeader && <RendererHeader isLoading={isLoading} {...overlayState} renderHeader={renderHeader} />}

      {isLoading
        ? render.skeleton
        : !overlayState.isEmpty && render.item(data || ({} as NonNullable<TData>), overlayState)}

      {renderFooter && <RendererFooter isLoading={isLoading} {...overlayState} renderFooter={renderFooter} />}

      {shouldRenderOverlay && <RendererOverlay renderOverlay={renderOverlay} {...overlayState} />}
    </>,
  );
};

DataRenderer.displayName = 'DataRenderer';

export default DataRenderer;
