import { useMemo } from 'react';
import { Stack } from '@mui/material';

import TableRendererProvider from './context';
import TableRendererContainer from './TableRendererContainer';
import TableRendererHeader from './TableRendererHeader';
import TableRendererFooter from './TableRendererFooter';

import { TableRendererProps } from './types';

// TODO: Добавить второй generic TSelectable к компоненту, для пометки свойства selectable как required
// TODO: Добавить сортировку данных ACS | DESC
// TODO: Добавить скелетоны в свойство renderHead по необходимости

const TableRenderer = <TData,>({
  data = [],
  isLoading = false,
  isFetching = false,
  isError = false,
  error = null,
  columns = [],
  selectable = false,
  renderHeader,
  renderHead,
  renderRow,
  renderFooter,
  renderOverlay,
  StackProps,
  ...props
}: TableRendererProps<TData>) => {
  const tableRendererState = useMemo(
    () => ({
      error,
      isFetching,
      isError,
      isEmpty: !data.length,
      isLoading,
    }),
    [isLoading, isFetching, isError, data, error],
  );

  return (
    <TableRendererProvider>
      <Stack {...StackProps}>
        {renderHeader && <TableRendererHeader renderHeader={renderHeader} {...tableRendererState} />}

        <TableRendererContainer
          {...props}
          data={data}
          columns={columns}
          selectable={selectable}
          renderHead={renderHead}
          renderRow={renderRow}
          renderOverlay={renderOverlay}
          {...tableRendererState}
        />

        {renderFooter && <TableRendererFooter renderFooter={renderFooter} {...tableRendererState} />}
      </Stack>
    </TableRendererProvider>
  );
};

TableRenderer.displayName = 'TableRenderer';

export default TableRenderer;
