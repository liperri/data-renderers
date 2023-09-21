import { useMemo } from 'react';
import { Skeleton, TableCell } from '@mui/material';

import { getRandomNumberFromRange } from '../../utils/helpers';

const TableRendererSkeletonCell = () => {
  const randomSkeletonCellWidth = useMemo(() => getRandomNumberFromRange(45, 95), []);

  return (
    <TableCell>
      <Skeleton width={`${randomSkeletonCellWidth}%`} />
    </TableCell>
  );
};

TableRendererSkeletonCell.displayName = 'TableRendererSkeletonCell';

export default TableRendererSkeletonCell;
