import { Box, alpha, useTheme } from '@mui/material';

import { RendererErrorMessage, RendererState, RenderOverlayProps } from '../../types';

type RendererOverlayProps = Omit<RendererState, 'isLoading'> & { renderOverlay: RenderOverlayProps };

const RendererOverlay = ({
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderOverlay,
}: RendererOverlayProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...(!isEmpty
          ? { position: 'absolute', inset: 0, zIndex: 1, backgroundColor: alpha(theme.palette.background.default, 0.5) }
          : {}),
        display: 'grid',
        placeItems: 'center',
        margin: '0 !important',
      }}
    >
      {isError
        ? typeof renderOverlay.error === 'function'
          ? renderOverlay.error((error as RendererErrorMessage)?.data)
          : renderOverlay.error
        : isFetching
        ? renderOverlay.loader
        : isEmpty && renderOverlay.empty}
    </Box>
  );
};

RendererOverlay.displayName = 'RendererOverlay';

export default RendererOverlay;
