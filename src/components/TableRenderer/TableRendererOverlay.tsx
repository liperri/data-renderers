import { Box, TableCell, TableRow, alpha, useTheme } from '@mui/material';

import { TableRendererErrorMessage, TableRendererOverlayProps } from '../TableRenderer';

const TableRendererOverlay = ({
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  renderOverlay,
}: TableRendererOverlayProps) => {
  const theme = useTheme();

  return (
    <TableRow>
      <Box
        component={TableCell}
        align="center"
        sx={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          inset: 0,
          zIndex: 1,
          border: 'none',
          backgroundColor: isFetching || isError ? alpha(theme.palette.background.default, 0.5) : 'inherit',
        }}
      >
        {isFetching ? (
          renderOverlay.loader
        ) : (
          <>
            {isEmpty && renderOverlay.empty}

            {isError
              ? typeof renderOverlay.error === 'function'
                ? renderOverlay.error((error as TableRendererErrorMessage)?.data)
                : renderOverlay.error
              : null}
          </>
        )}
      </Box>
    </TableRow>
  );
};

TableRendererOverlay.displayName = 'TableRendererOverlay';

export default TableRendererOverlay;
