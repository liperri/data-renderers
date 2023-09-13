import { useContext } from 'react';
import { Checkbox, Table, TableCell, TableContainer } from '@mui/material';

import { TableRendererContainerProps } from './types';
import { TableRendererContext } from './context';
import TableRendererBody from './TableRendererBody';
import TableRendererHead from './TableRendererHead';

import { TableRendererContextProps } from './context';

const TableRendererContainer = <TData,>({
  data = [],
  isLoading = false,
  isFetching = false,
  isError = false,
  isEmpty = false,
  error = null,
  columns,
  selectable,
  renderHead,
  renderRow,
  renderOverlay,
  TableContainerProps,
  ...props
}: TableRendererContainerProps<TData>) => {
  const { selectedRows, handleSelectAllRows } = useContext<TableRendererContextProps<TData>>(TableRendererContext);

  return (
    <TableContainer {...TableContainerProps}>
      <Table {...props} sx={{ ...props?.sx, height: !data.length || isError ? 130 : 'auto' }}>
        <TableRendererHead
          columns={columns}
          selectable={selectable}
          renderHead={renderHead}
          CheckboxComponent={() =>
            selectable ? (
              <TableCell padding="checkbox">
                <Checkbox
                  disabled={isLoading || isFetching}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                  checked={!isLoading && data.length === selectedRows.length}
                  onChange={(_, checked) => handleSelectAllRows(data, checked)}
                />
              </TableCell>
            ) : null
          }
        />

        <TableRendererBody
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isEmpty={isEmpty}
          error={error}
          columns={columns}
          renderRow={renderRow}
          renderOverlay={renderOverlay}
        />
      </Table>
    </TableContainer>
  );
};

TableRendererContainer.displayName = 'TableRendererContainer';

export default TableRendererContainer;
