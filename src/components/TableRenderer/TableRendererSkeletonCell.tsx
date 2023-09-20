import { Skeleton, TableCell } from '@mui/material';

import { getRandomNumberFromRange } from '../../utils/helpers';

const RANDOM_SKELETON_CELL_WIDTH = getRandomNumberFromRange(60, 95);

const TableRendererSkeletonCell = () => (
  <TableCell>
    <Skeleton width={`${RANDOM_SKELETON_CELL_WIDTH}px`} />
  </TableCell>
);

TableRendererSkeletonCell.displayName = 'TableRendererSkeletonCell';

export default TableRendererSkeletonCell;
