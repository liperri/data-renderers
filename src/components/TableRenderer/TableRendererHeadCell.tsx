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

  if (isElement) return column;

  const { cell: cellAsReactNode } = column as {
    cell: React.ReactNode;
  };

  return cellAsReactNode ? cellAsReactNode : <TableCell>{isString && column}</TableCell>;
};

export default TableRendererHeadCell;

TableRendererHeadCell.displayName = 'TableRendererHeadCell';
