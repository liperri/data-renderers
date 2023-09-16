import { useMemo } from 'react';
import { Skeleton, TableCell } from '@mui/material';

import { getRandomNumber } from '../../utils/helpers';

const TableRendererSkeletonCell = () => {
  const getRandomSkeletonCellWidth = useMemo(() => getRandomNumber(60, 95), []);

  return (
    <TableCell>
      <Skeleton width={`${getRandomSkeletonCellWidth}px`} />
    </TableCell>
  );
};

TableRendererSkeletonCell.displayName = 'TableRendererSkeletonCell';

export default TableRendererSkeletonCell;
