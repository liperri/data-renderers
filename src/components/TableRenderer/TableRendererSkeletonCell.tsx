import { isValidElement, useMemo } from 'react';
import { Skeleton, SkeletonProps, Stack, TableCell } from '@mui/material';

import { TableRendererColumnProps } from '../../types';
import { getRandomNumberFromRange } from '../../utils/helpers';

type TableRendererSkeletonProps = {
  column: TableRendererColumnProps;
};

const TableRendererSkeletonCell = ({ column }: TableRendererSkeletonProps) => {
  const randomSkeletonCellWidth = useMemo(() => getRandomNumberFromRange(45, 95), []);

  const isObject = Object.prototype.hasOwnProperty.call(column, 'cell');
  const isString = typeof column === 'string';
  const isElement = !isObject && !isString && isValidElement(column);
  const { skeletons } = column as { skeletons?: SkeletonProps[] };

  if (!isString && (isObject || isElement) && skeletons?.length) {
    const { cell } = column as { cell: React.ReactNode };

    return (
      <TableCell padding={(isObject ? cell : column) ? 'normal' : 'checkbox'}>
        <Stack direction="row">
          {(skeletons || []).map((skeleton, index) => (
            <Skeleton {...skeleton} key={index} />
          ))}
        </Stack>
      </TableCell>
    );
  } else
    return (
      <TableCell padding={column ? 'normal' : 'checkbox'}>
        <Skeleton width={`${randomSkeletonCellWidth}%`} />
      </TableCell>
    );
};

TableRendererSkeletonCell.displayName = 'TableRendererSkeletonCell';

export default TableRendererSkeletonCell;
