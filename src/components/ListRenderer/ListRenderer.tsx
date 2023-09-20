import { cloneElement, useMemo } from 'react';
import { Box, Stack } from '@mui/material';

import { ListRendererProps } from '../../types';
import { getRandomNumberFromRange } from '../../utils/helpers';

import { RendererFooter, RendererHeader, RendererOverlay } from '../shared';

const RANDOM_SKELETON_LENGTH = getRandomNumberFromRange(4, 10);

/**
 * Свойства ListRenderer
 * @template TData - тип данных, которые будут отображены в компоненте
 * @example
 * ```tsx
 *  <ListRenderer
 *    element={<List />}
 *    isLoading={isLoading}
 *    isFetching={isFetching}
 *    isError={isError}
 *    isEmpty={isEmpty}
 *    error="Сообщение об ошибке"
 *    data={data}
 *    renderHeader={{
 *      header: (state) => <HeaderComponent state={state} />,
 *      skeleton: <SkeletonComponent />,
 *    }}
 *    render={{
 *      item: (data, state, index) => <ItemComponent data={data} state={state} index={index} />,
 *      skeleton: (index) => <SkeletonItemComponent key={index} />,
 *    }}
 *    renderFooter={{
 *      footer: (state) => <FooterComponent state={state} />,
 *      skeleton: <SkeletonComponent />,
 *    }}
 *    renderOverlay={{
 *      empty: <EmptyComponent />,
 *      error: (message) => <ErrorComponent message={message} />,
 *      loader: <LoaderComponent />,
 *    }}
 *  />
 * ```
 */
const ListRenderer = <TData,>({
  data = [],
  isLoading = false,
  isFetching = false,
  isError = false,
  error = null,
  element,
  renderHeader,
  render,
  renderFooter,
  renderOverlay,
  StackProps,
  skeletonCount,
}: ListRendererProps<TData>) => {
  const overlayState = useMemo(
    () => ({
      error,
      isFetching,
      isError,
      isEmpty: !data.length,
    }),
    [isFetching, isError, data, error],
  );

  const shouldRenderOverlayFetchingOrError =
    !isLoading && ((isFetching && !overlayState.isEmpty) || isError || overlayState.isEmpty);

  return (
    <Stack {...StackProps}>
      {renderHeader && <RendererHeader isLoading={isLoading} {...overlayState} renderHeader={renderHeader} />}

      <Box {...(shouldRenderOverlayFetchingOrError ? { sx: { position: 'relative' } } : {})}>
        {cloneElement(
          element,
          { ...element.props, ...(overlayState.isEmpty ? { sx: { display: 'unset' } } : {}) },
          <>
            {isLoading
              ? Array.from({ length: skeletonCount ?? RANDOM_SKELETON_LENGTH }, (_, index) => index).map((index) =>
                  render.skeleton(index),
                )
              : !overlayState.isEmpty && data.map((data, index) => render.item(data, overlayState, index))}

            {shouldRenderOverlayFetchingOrError && <RendererOverlay renderOverlay={renderOverlay} {...overlayState} />}
          </>,
        )}
      </Box>

      {renderFooter && <RendererFooter isLoading={isLoading} {...overlayState} renderFooter={renderFooter} />}
    </Stack>
  );
};

ListRenderer.displayName = 'ListRenderer';

export default ListRenderer;
