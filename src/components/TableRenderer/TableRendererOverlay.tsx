import { PropsWithChildren } from 'react';
import { Box, TableCell, TableRow, alpha, useTheme } from '@mui/material';

import { TableRendererErrorMessage, TableRendererOverlayProps } from '../TableRenderer';

const TableRendererOverlay = ({
  columns,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderOverlay,
}: TableRendererOverlayProps) => (
  <TableRow>
    <TableCell colSpan={columns.length} sx={{ p: 0, border: 'none' }}>
      {isError ? (
        <OverlayContainer isEmpty={isEmpty}>
          {typeof renderOverlay.error === 'function'
            ? renderOverlay.error((error as TableRendererErrorMessage)?.data)
            : renderOverlay.error}
        </OverlayContainer>
      ) : isFetching ? (
        <OverlayContainer isEmpty={isEmpty}>{renderOverlay.loader}</OverlayContainer>
      ) : (
        isEmpty && <OverlayContainer isEmpty={isEmpty}>{renderOverlay.empty}</OverlayContainer>
      )}
    </TableCell>
  </TableRow>
);

TableRendererOverlay.displayName = 'TableRendererOverlay';

const OverlayContainer = ({ children, isEmpty }: PropsWithChildren<Pick<TableRendererOverlayProps, 'isEmpty'>>) => {
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

export default TableRendererOverlay;
