import { PropsWithChildren } from 'react';
import { Box, alpha, useTheme } from '@mui/material';

import { GridRendererErrorMessage, GridRendererOverlayProps } from './types';

const GridRendererOverlay = ({
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderOverlay,
}: GridRendererOverlayProps) => (
  <>
    {isError ? (
      <OverlayContainer isEmpty={isEmpty}>
        {typeof renderOverlay.error === 'function'
          ? renderOverlay.error((error as GridRendererErrorMessage)?.data)
          : renderOverlay.error}
      </OverlayContainer>
    ) : isFetching ? (
      <OverlayContainer isEmpty={isEmpty}>{renderOverlay.loader}</OverlayContainer>
    ) : (
      isEmpty && renderOverlay.empty
    )}
  </>
);

GridRendererOverlay.displayName = 'GridRendererOverlay';

const OverlayContainer = ({ children, isEmpty }: PropsWithChildren<Pick<GridRendererOverlayProps, 'isEmpty'>>) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...(!isEmpty
          ? { position: 'absolute', inset: 0, zIndex: 1, backgroundColor: alpha(theme.palette.background.default, 0.5) }
          : {}),
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {children}
    </Box>
  );
};

OverlayContainer.displayName = 'OverlayContainer';

export default GridRendererOverlay;
