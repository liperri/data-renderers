import { useMemo } from 'react';
import { Skeleton, TableCell, TableCellProps } from '@mui/material';

import { TableRendererColumnType } from '../../types';
import { getRandomNumberFromRange } from '../../utils/helpers';

const SKELETON_TYPES = new Map([
  [':avatar:small', ['circular', 34, 34]],
  [':avatar:medium', ['circular', 40, 40]],
  [':avatar:large', ['circular', 48, 48]],
  [':action:small', ['circular', 34, 34]],
  [':action:medium', ['circular', 40, 40]],
] as const);

const TableRendererSkeletonCell = ({
  column,
  ...props
}: TableCellProps & { column: TableRendererColumnType | string }) => {
  const espesiallyColumn = column.startsWith(':');

  const randomSkeletonCellWidth = useMemo(() => getRandomNumberFromRange(45, 95), []);

  return (
    <TableCell padding={espesiallyColumn ? 'checkbox' : 'normal'} {...props}>
      {espesiallyColumn ? (
        (() => {
          const skeletonProps = SKELETON_TYPES.get(column as TableRendererColumnType);
          if (!skeletonProps) return null;

          const [variant, width, height] = skeletonProps;

          return <Skeleton width={width} height={height} variant={variant} sx={{ my: 0.75 }} />;
        })()
      ) : (
        <Skeleton width={`${randomSkeletonCellWidth}%`} />
      )}
    </TableCell>
  );
};

TableRendererSkeletonCell.displayName = 'TableRendererSkeletonCell';

export default TableRendererSkeletonCell;
