import { TableRow } from '@mui/material';

import { TableRendererSkeletonRowProps } from './types';
import TableRendererSkeletonCell from './TableRendererSkeletonCell';

const TableRendererSkeletonRow = ({ columns, CheckboxComponent }: TableRendererSkeletonRowProps) => {
  return (
    <TableRow>
      <CheckboxComponent />

      {Array.from({ length: columns.length }, (_, index) => index).map((index) => (
        <TableRendererSkeletonCell key={index} />
      ))}
    </TableRow>
  );
};

TableRendererSkeletonRow.displayName = 'TableRendererSkeletonRow';

export default TableRendererSkeletonRow;
