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
import { RendererState, TableRendererProps } from '../../types';

import { RendererOverlay } from '../shared';

import TableRendererHeadCell from './TableRendererHeadCell';
import TableRendererSkeletonCell from './TableRendererSkeletonCell';

const RANDOM_SKELETON_ROW_LENGTH = getRandomNumberFromRange(4, 10);
const OVERLAY_TABLE_BODY_HEIGHT = 130;

type TableRendererContainerProps<TData> = Omit<
  TableRendererProps<TData>,
  'StackProps' | 'renderHeader' | 'renderFooter'
> &
  Pick<RendererState, 'isEmpty'>;

const TableRendererContainer = <TData,>({
  data: rows = [],
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  columns,
  render,
  renderOverlay,
  TableContainerProps,
  ...props
}: TableRendererContainerProps<TData>) => {
  const shouldRenderOverlayFetchingOrError = !isLoading && ((isFetching && !isEmpty) || isError || isEmpty);

  return (
    <TableContainer {...TableContainerProps}>
      <Table {...props}>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableRendererHeadCell column={column} key={index} />
            ))}
          </TableRow>
        </TableHead>

        <TableBody
          {...(shouldRenderOverlayFetchingOrError
            ? { sx: { position: 'relative', height: OVERLAY_TABLE_BODY_HEIGHT } }
            : {})}
        >
          {isLoading
            ? Array.from({ length: RANDOM_SKELETON_ROW_LENGTH }, (_, index) => index).map((index) => (
                <TableRow key={index}>
                  {Array.from({ length: columns.length }, (_, index) => index).map((index) => (
                    <TableRendererSkeletonCell column={columns[index]} key={index} />
                  ))}
                </TableRow>
              ))
            : rows.map((data, index) => render.row({ data, state: { isFetching, isError, isEmpty, error }, index }))}

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
