import { useMemo } from 'react';
import { Box, Stack } from '@mui/material';

import { omit } from '../../utils/helpers';

import ListRendererFooter from './ListRendererFooter';
import ListRendererHeader from './ListRendererHeader';
import ListRendererItems from './ListRendererItems';
import ListRendererOverlay from './ListRendererOverlay';
import ListRendererSkeletonItems from './ListRendererSkeletonItems';

import { ListRendererProps } from './types';

const ListRenderer = <TData,>({
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
}: ListRendererProps<TData>) => {
  const listRendererState = useMemo(
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
      {renderHeader && <ListRendererHeader renderHeader={renderHeader} {...listRendererState} />}

      <Box {...ContainerProps} sx={{ ...ContainerProps?.sx, position: 'relative' }}>
        {isLoading ? (
          <ListRendererSkeletonItems skeletonCount={skeletonCount} renderItem={renderItem} {...props} />
        ) : (
          Boolean(data.length) && (
            <ListRendererItems data={data} renderItem={renderItem} {...listRendererState} {...props} />
          )
        )}

        {shouldRenderOverlayFetchingOrError && (
          <ListRendererOverlay renderOverlay={renderOverlay} {...omit(listRendererState, 'isLoading')} />
        )}
      </Box>

      {renderFooter && <ListRendererFooter renderFooter={renderFooter} {...listRendererState} />}
    </Stack>
  );
};

export default ListRenderer;
