import { useContext } from 'react';
import { Box, Checkbox, Skeleton, TableBody, TableCell } from '@mui/material';

import { getRandomNumber } from '../../utils/helpers';

import { TableRendererBodyProps } from './types';
import { TableRendererContext } from './context';
import TableRendererOverlay from './TableRendererOverlay';
import TableRendererSkeletonRow from './TableRendererSkeletonRow';

import { TableRendererContextProps } from './context';

const TABLE_BODY_HEIGHT = 130;
const RANDOM_ROW_SKELETON_LENGTH = getRandomNumber(4, 10);

const TableRendererBody = <TData,>({
  data = [],
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  columns,
  selectable,
  renderRow,
  renderOverlay,
}: TableRendererBodyProps<TData>) => {
  const { selectedRows, handleSelectRow } = useContext<TableRendererContextProps<TData>>(TableRendererContext);

  const shouldRenderOverlayFetchingOrError =
    (!isLoading && isFetching) || (!isLoading && !data.length) || (isFetching && data.length) || isError;

  return (
    <TableBody sx={{ position: 'relative', height: !data.length || isError ? TABLE_BODY_HEIGHT : 'auto' }}>
      {shouldRenderOverlayFetchingOrError && (
        <TableRendererOverlay
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isEmpty={isEmpty}
          error={error}
          renderOverlay={renderOverlay}
        />
      )}

      {isLoading
        ? Array.from({ length: RANDOM_ROW_SKELETON_LENGTH }, (_, index) => index).map((index) => (
            <TableRendererSkeletonRow
              columnsLength={columns.length}
              CheckboxComponent={() =>
                selectable ? (
                  <TableCell padding="checkbox">
                    <Box sx={{ width: 42, height: 42, display: 'inline-grid', placeItems: 'center' }}>
                      <Skeleton width={20} height={20} variant="rectangular" sx={{ borderRadius: 0.5 }} />
                    </Box>
                  </TableCell>
                ) : null
              }
              key={index}
            />
          ))
        : data.map((rowData, index) => {
            const selected = Boolean(selectable && selectedRows.map(({ index }) => index).includes(index));

            return renderRow({
              rowData,
              index,
              state: { isLoading, isFetching, isError, isEmpty, error },
              selected,
              CheckboxComponent: () =>
                selectable ? (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected}
                      onChange={(event, checked) => handleSelectRow(event, checked, rowData, index)}
                    />
                  </TableCell>
                ) : null,
            });
          })}
    </TableBody>
  );
};

TableRendererBody.displayName = 'TableRendererBody';

export default TableRendererBody;
