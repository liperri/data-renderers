import { TableCell, TableRow, alpha, useTheme } from '@mui/material';

import { TableRendererErrorMessage, TableRendererOverlayProps } from '../TableRenderer';
import { PropsWithChildren } from 'react';

const TableRendererOverlay = ({
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderOverlay,
}: TableRendererOverlayProps) => {
  return (
    <TableRow>
      {isError ? (
        <OverlayContainer isEmpty={isEmpty}>
          {typeof renderOverlay.error === 'function'
            ? renderOverlay.error((error as TableRendererErrorMessage)?.data)
            : renderOverlay.error}
        </OverlayContainer>
      ) : isFetching ? (
        <OverlayContainer isEmpty={isEmpty}>{renderOverlay.loader}</OverlayContainer>
      ) : (
        isEmpty && renderOverlay.empty
      )}
    </TableRow>
  );
};

const OverlayContainer = ({ children, isEmpty }: PropsWithChildren<Pick<TableRendererOverlayProps, 'isEmpty'>>) => {
  const theme = useTheme();

  return (
    <TableCell
      sx={{
        ...(!isEmpty
          ? { position: 'absolute', inset: 0, zIndex: 1, backgroundColor: alpha(theme.palette.background.default, 0.5) }
          : {}),
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {children}
    </TableCell>
  );
};

TableRendererOverlay.displayName = 'TableRendererOverlay';

export default TableRendererOverlay;
