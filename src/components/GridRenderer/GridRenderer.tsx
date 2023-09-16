import { useMemo } from 'react';
import { Box, Stack } from '@mui/material';

import { omit } from '../../utils/helpers';

import GridRendererFooter from './GridRendererFooter';
import GridRendererHeader from './GridRendererHeader';
import GridRendererItems from './GridRendererItems';
import GridRendererOverlay from './GridRendererOverlay';
import GridRendererSkeletonItems from './GridRendererSkeletonItems';

import { GridRendererProps } from './types';

const GridRenderer = <TData,>({
  data = [],
  isLoading = false,
  isFetching = false,
  isError = false,
  error = null,
  renderHeader,
  renderItem,
  renderFooter,
  renderOverlay,
  StackProps,
  ContainerProps,
  skeletonCount,
  ...props
}: GridRendererProps<TData>) => {
  const gridRendererState = useMemo(
    () => ({
      error,
      isFetching,
      isError,
      isEmpty: !data.length,
      isLoading,
    }),
    [isLoading, isFetching, isError, data, error],
  );

  const shouldRenderOverlayFetchingOrError = !isLoading || (isFetching && data.length) || isError;

  return (
    <Stack {...StackProps}>
      {renderHeader && <GridRendererHeader renderHeader={renderHeader} {...gridRendererState} />}

      <Box {...ContainerProps} sx={{ ...ContainerProps?.sx, position: 'relative' }}>
        {isLoading ? (
          <GridRendererSkeletonItems skeletonCount={skeletonCount} renderItem={renderItem} {...props} />
        ) : (
          Boolean(data.length) && (
            <GridRendererItems data={data} renderItem={renderItem} {...gridRendererState} {...props} />
          )
        )}

        {shouldRenderOverlayFetchingOrError && (
          <GridRendererOverlay renderOverlay={renderOverlay} {...omit(gridRendererState, 'isLoading')} />
        )}
      </Box>

      {renderFooter && <GridRendererFooter renderFooter={renderFooter} {...gridRendererState} />}
    </Stack>
  );
};

GridRenderer.displayName = 'GridRenderer';

export default GridRenderer;
