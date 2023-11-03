import { useMemo } from 'react';
import { Stack } from '@mui/material';

import { TableRendererProps } from '../../types';
import { RendererFooter, RendererHeader } from '../shared';

import TableRendererContainer from './TableRendererContainer';

// TODO: Добавить второй generic TSelectable к компоненту, для пометки свойства selectable как required
// TODO: Добавить сортировку данных ACS | DESC
// TODO: Добавить свойство renderHead по необходимости

/**
 * Свойства TableRenderer
 * @template TData - тип данных, которые будут отображены в компоненте
 * @example
 * ```tsx
 *  <TableRenderer
 *    isLoading={isLoading}
 *    isFetching={isFetching}
 *    isError={isError}
 *    isEmpty={isEmpty}
 *    error="Сообщение об ошибке"
 *    data={data}
 *    columns={['Название', 'Описание', 'Дата']}
 *    renderHeader={{
 *      header: (state) => <HeaderComponent state={state} />,
 *      skeleton: <SkeletonComponent />,
 *    }}
 *    render={{
 *      row: (data, state, index, selectableProps) => <RowComponent data={data} state={state} selectableProps={selectableProps} index={index} />,
 *    }}
 *    renderFooter={{
 *      footer: (state) => <FooterComponent state={state} />,
 *      skeleton: <SkeletonFooter />,
 *    }}
 *    renderOverlay={{
 *      empty: <EmptyComponent />,
 *      error: (message) => <ErrorComponent message={message} />,
 *      loader: <LoaderComponent />,
 *    }}
 *  />
 * ```
 */
const TableRenderer = <TData,>({
  data = [],
  isLoading = false,
  isFetching = false,
  isError = false,
  error = null,
  columns = [],
  renderHeader,
  render,
  renderFooter,
  renderOverlay,
  StackProps,
  TableContainerProps,
  ...props
}: TableRendererProps<TData>) => {
  const overlayState = useMemo(
    () => ({
      error,
      isFetching,
      isError,
      isEmpty: !data.length,
    }),
    [isFetching, isError, data, error],
  );

  return (
    <Stack {...StackProps}>
      {renderHeader && <RendererHeader isLoading={isLoading} renderHeader={renderHeader} {...overlayState} />}

      <TableRendererContainer
        {...props}
        data={data}
        columns={columns}
        render={render}
        renderOverlay={renderOverlay}
        TableContainerProps={TableContainerProps}
        isLoading={isLoading}
        {...overlayState}
      />

      {renderFooter && <RendererFooter isLoading={isLoading} renderFooter={renderFooter} {...overlayState} />}
    </Stack>
  );
};

TableRenderer.displayName = 'TableRenderer';

export default TableRenderer;
