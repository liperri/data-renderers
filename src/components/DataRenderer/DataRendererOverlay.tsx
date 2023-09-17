import { PropsWithChildren } from 'react';
import { Box, alpha, useTheme } from '@mui/material';

import { DataRendererErrorMessage, DataRendererOverlayProps } from './types';

const DataRendererOverlay = ({
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderOverlay,
}: DataRendererOverlayProps) => (
  <>
    {isError ? (
      <OverlayContainer isEmpty={isEmpty}>
        {typeof renderOverlay.error === 'function'
          ? renderOverlay.error((error as DataRendererErrorMessage)?.data)
          : renderOverlay.error}
      </OverlayContainer>
    ) : isFetching ? (
      <OverlayContainer isEmpty={isEmpty}>{renderOverlay.loader}</OverlayContainer>
    ) : (
      isEmpty && renderOverlay.empty
    )}
  </>
);

DataRendererOverlay.displayName = 'DataRendererOverlay';

const OverlayContainer = ({ children, isEmpty }: PropsWithChildren<Pick<DataRendererOverlayProps, 'isEmpty'>>) => {
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

export default DataRendererOverlay;
