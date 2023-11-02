import { isValidElement, useMemo } from 'react';
import { Skeleton, SkeletonProps, Stack, TableCell } from '@mui/material';

import { TableRendererColumnProps } from '../../types';
import { getRandomNumberFromRange } from '../../utils/helpers';

type TableRendererSkeletonProps = {
  column: TableRendererColumnProps;
};

const TableRendererSkeletonCell = ({ column }: TableRendererSkeletonProps) => {
  const randomSkeletonCellWidth = useMemo(() => getRandomNumberFromRange(45, 95), []);

  const isObject = Object.prototype.hasOwnProperty.call(column, 'column');
  const isString = typeof column === 'string';
  const isElement = !isObject && !isString && isValidElement(column);
  const { skeletons } = column as { skeletons?: SkeletonProps[] };

  if (!isString && (isObject || isElement) && skeletons?.length) {
    return (
      <TableCell padding={column ? 'normal' : 'checkbox'}>
        <Stack direction="row">
          {(skeletons || []).map((skeleton) => (
            <Skeleton {...skeleton} />
          ))}
        </Stack>
      </TableCell>
    );
  }

  return (
    <TableCell padding={column ? 'normal' : 'checkbox'}>
      <Skeleton width={`${randomSkeletonCellWidth}%`} />
    </TableCell>
  );
};

TableRendererSkeletonCell.displayName = 'TableRendererSkeletonCell';

export default TableRendererSkeletonCell;
