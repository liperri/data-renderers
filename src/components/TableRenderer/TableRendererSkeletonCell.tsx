import { useMemo } from 'react';
import { Box, Skeleton, TableCell, TableCellProps } from '@mui/material';

import { getRandomNumberFromRange } from '../../utils/helpers';

const TableRendererSkeletonCell = ({ padding, ...props }: TableCellProps) => {
  const randomSkeletonCellWidth = useMemo(() => getRandomNumberFromRange(45, 95), []);

  return (
    <TableCell padding={padding} {...props}>
      {padding === 'checkbox' ? (
        <Skeleton width={40} height={40} variant="circular" sx={{ my: 0.75 }} />
      ) : (
        <Skeleton width={`${randomSkeletonCellWidth}%`} />
      )}
    </TableCell>
  );
};

TableRendererSkeletonCell.displayName = 'TableRendererSkeletonCell';

export default TableRendererSkeletonCell;
