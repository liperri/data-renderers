import { isValidElement } from 'react';
import { TableCell } from '@mui/material';

import { TableRendererColumnProps } from '../../types';

type TableRendererHeadCellProps = {
  column: TableRendererColumnProps;
};

const TableRendererHeadCell = ({ column }: TableRendererHeadCellProps) => {
  const isObject = Object.prototype.hasOwnProperty.call(column, 'column');
  const isString = typeof column === 'string';
  const isElement = !isObject && !isString && isValidElement(column);

  if (isElement) return <TableCell>{column}</TableCell>;

  const { column: columnAsReactNode } = column as {
    column: React.ReactNode;
  };

  return (
    <TableCell padding={(isString ? column : columnAsReactNode) ? 'normal' : 'checkbox'}>
      {isString ? column : columnAsReactNode}
    </TableCell>
  );
};

export default TableRendererHeadCell;

TableRendererHeadCell.displayName = 'TableRendererHeadCell';
