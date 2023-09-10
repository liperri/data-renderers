import { Skeleton, TableCell, TableRow } from '@mui/material';

import { getRandomNumber } from '../../utils/helpers';

import { TableRendererSkeletonRowProps } from '../TableRenderer';

const RANDOM_CELL_SKELETON_LENGTH = getRandomNumber(60, 95);

const TableRendererSkeletonRow = ({ columnsLength, CheckboxComponent }: TableRendererSkeletonRowProps) => {
  return (
    <TableRow>
      <CheckboxComponent />

      {Array.from({ length: columnsLength }, (_, index) => index).map((index) => (
        <TableCell key={index}>
          <Skeleton width={`${RANDOM_CELL_SKELETON_LENGTH}px`} />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableRendererSkeletonRow;
