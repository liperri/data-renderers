import { TableCell, TableHead, TableRow } from '@mui/material';

import { TableRendererHeadProps } from './types';

const TableRendererHead = ({ columns = [], selectable, CheckboxComponent, renderHead }: TableRendererHeadProps) => {
  return (
    <TableHead>
      <TableRow>
        {selectable && <CheckboxComponent />}

        {renderHead
          ? renderHead()
          : columns.map((column, index) => (
              <TableCell padding={column ? 'normal' : 'checkbox'} key={`${index}:${column}`}>
                {column}
              </TableCell>
            ))}
      </TableRow>
    </TableHead>
  );
};

TableRendererHead.displayName = 'TableRendererHead';

export default TableRendererHead;
