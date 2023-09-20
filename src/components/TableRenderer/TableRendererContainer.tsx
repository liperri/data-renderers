import {
  Box,
  Checkbox,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { getRandomNumberFromRange } from '../../utils/helpers';
import { TableRendererContainerProps } from '../../types';

import { RendererOverlay } from '../shared';

import { useTableRenderer } from './context';
import TableRendererSkeletonCell from './TableRendererSkeletonCell';

const RANDOM_SKELETON_ROW_LENGTH = getRandomNumberFromRange(4, 10);

const TableRendererContainer = <TData,>({
  data: rows = [],
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  columns,
  selectable,
  render,
  renderOverlay,
  TableContainerProps,
  ...props
}: TableRendererContainerProps<TData>) => {
  const { selectedRows, handleSelectRow, handleSelectAllRows } = useTableRenderer<TData>();

  const shouldRenderOverlayFetchingOrError = !isLoading && ((isFetching && !isEmpty) || isError || isEmpty);

  return (
    <TableContainer {...TableContainerProps}>
      <Table {...props}>
        <TableHead>
          <TableRow>
            {selectable && (
              <TableCell align="center" padding="checkbox">
                <Checkbox
                  disabled={isLoading || isFetching}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                  checked={!isLoading && rows.length === selectedRows.length}
                  onChange={(_, checked) => handleSelectAllRows(rows, checked)}
                />
              </TableCell>
            )}

            {columns.map((column, index) => (
              <TableCell padding={column ? 'normal' : 'checkbox'} key={`${index}:${column}`}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody {...(shouldRenderOverlayFetchingOrError ? { sx: { position: 'relative' } } : {})}>
          {isLoading
            ? Array.from({ length: RANDOM_SKELETON_ROW_LENGTH }, (_, index) => index).map((index) => (
                <TableRow key={index}>
                  {selectable ? (
                    <TableCell padding="checkbox">
                      <Box sx={{ width: 42, height: 42, display: 'inline-grid', placeItems: 'center' }}>
                        <Skeleton width={20} height={20} variant="rounded" />
                      </Box>
                    </TableCell>
                  ) : null}

                  {Array.from({ length: columns.length }, (_, index) => index).map((index) => (
                    <TableRendererSkeletonCell key={index} />
                  ))}
                </TableRow>
              ))
            : rows.map((data, index) => {
                const selected = Boolean(selectable && selectedRows.map(({ index }) => index).includes(index));

                return render.row(data, { isFetching, isError, isEmpty, error }, index, {
                  selected,
                  CheckboxComponent: () =>
                    selectable ? (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected}
                          onChange={(event, checked) => handleSelectRow(event, checked, data, index)}
                        />
                      </TableCell>
                    ) : null,
                });
              })}

          {shouldRenderOverlayFetchingOrError && (
            <TableRow>
              <TableCell colSpan={columns.length} sx={{ p: 0, border: 'none' }}>
                <RendererOverlay
                  isFetching={isFetching}
                  isError={isError}
                  isEmpty={isEmpty}
                  error={error}
                  renderOverlay={renderOverlay}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableRendererContainer.displayName = 'TableRendererContainer';

export default TableRendererContainer;
