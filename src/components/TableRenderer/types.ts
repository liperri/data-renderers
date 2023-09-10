import { StackProps, TableContainerProps, TableProps } from '@mui/material';

export type TableRendererErrorMessage = { data: string };

/**
 * Состояние компонента
 */
export interface TableRendererState {
  /**
   * Индикатор первоначальной загрузки данных
   */
  isLoading: boolean | undefined;
  /**
   * Индикатор последующих загрузок данных
   */
  isFetching: boolean | undefined;
  /**
   * Индикатор ошибки
   */
  isError: boolean | undefined;
  /**
   * Индикатор отсутствия данных
   */
  isEmpty?: boolean | undefined;
  /**
   * Сообщение ошибки
   */
  error: TableRendererErrorMessage | string | unknown | undefined;
}

/**
 * Состояние компонента с массивом данных
 */
export interface TableRendererStateWithData<TData> extends TableRendererState {
  /**
   * Массив данных для отображения
   */
  data: TData[] | undefined;
}

export interface TableRendererBaseProps {
  /**
   * Дополнительные свойства для Stack компонента
   */
  StackProps?: StackProps;
  /**
   * Дополнительные свойства для TableContainer компонента
   */
  TableContainerProps?: TableContainerProps;
  /**
   * Название колонок в таблице
   */
  columns: string[];
  /**
   * Определяет, можно ли выбирать строки в таблице компонента
   *
   * @example
   * Помечаем компонент свойством
   * ```tsx
   *  <TableRenderer
   *    {...props}
   *    selectable
   *    renderRow={(props) => <RowComponent key={props.rowData.id} {...props} />}
   *  />
   * ```
   *
   * **Важно**: Первая ячейка должна быть `CheckboxComponent`
   *
   * `CheckboxComponent` наследуется от `TableRendererRowProps`
   * ```tsx
   *   type RowComponentProps<TData> = TableRendererRowProps<TData> & {...}
   *
   *   const RowComponent = ({ rowData, CheckboxComponent }: RowComponentProps) => {
   *     const { title } = rowData;
   *
   *     return (
   *       <TableRow>
   *         <CheckboxComponent />
   *
   *         <TableCell>{title}</TableCell>
   *       </TableRow>
   *     );
   *   }
   * ```
   */
  selectable?: boolean;
  /**
   * Отображение шапки компонента
   * @example
   * ```tsx
   *  <TableRenderer
   *    {...props}
   *    renderHeader={{
   *      header: (state) => <HeaderComponent {...state} />,
   *      skeleton: <SkeletonHeader />,
   *    }}
   *  />
   * ```
   */
  renderHeader?: {
    /**
     * Функция или компонент для отображения шапки
     */
    header: ((state: TableRendererState) => React.ReactNode) | React.ReactNode;
    /**
     * Отображение скелетона шапки (если не указан, то будет пустота)
     */
    skeleton?: React.ReactNode;
  };
  /**
   * Пользовательское отображение шапки таблицы
   * @example
   * ```tsx
   *  <TableRenderer
   *    {...props}
   *    renderHead={() => <TableHeader />}
   *  />
   * ```
   */
  renderHead?(): React.ReactNode;
  /**
   * Отображение подвала компонента
   * @example
   * ```tsx
   *  <TableRenderer
   *    {...props}
   *    renderFooter={{
   *      footer: (state) => <FooterComponent {...state} />,
   *      skeleton: <SkeletonFooter />,
   *    }}
   *  />
   * ```
   */
  renderFooter?: {
    /**
     * Функция или компонент для отображения подвала
     */
    footer: ((state: TableRendererState) => React.ReactNode) | React.ReactNode;
    /**
     * Отображение скелетона подвала (если не указан, то будет пустота)
     */
    skeleton?: React.ReactNode;
  };
  /**
   * Отображение оверлея компонента (пустого состояния, ошибки, загрузки)
   * @example
   * ```tsx
   *  <TableRenderer
   *    {...props}
   *    renderOverlay={{
   *      empty: <EmptyComponent />,
   *      error: (message) => <ErrorComponent message={message} />,
   *      loader: <LoaderComponent />,
   *    }}
   *  />
   * ```
   */
  renderOverlay: {
    /**
     * Отображение, когда данные отсутствуют
     */
    empty: React.ReactNode;
    /**
     * Функция или компонент для отображения ошибки
     */
    error: ((message: string) => React.ReactNode) | React.ReactNode;
    /**
     * Отображение, когда данные находится в состоянии загрузки (кроме первой)
     */
    loader: React.ReactNode;
  };
}

/**
 * Базовые свойства компонента с массивом данных
 */
export interface TableRendererBasePropsWithData<TData> extends TableRendererStateWithData<TData> {
  /**
   * Отображение каждого элемента в массиве данных
   *
   * @param rowData TData - тип данных, которые будут отображены в строке
   * @param index - Индекс строки
   * @param state - TableRendererState
   * @param selected
   * @param CheckboxComponent
   * @example
   * ```tsx
   *  <TableRenderer
   *    {...props}
   *    renderRow={(props) => <RowComponent key={props.rowData.id} {...props} />}
   *  />
   * ```
   */
  renderRow(rowProps: TableRendererRowProps<TData>): React.ReactNode;
}

/**
 * Свойства для отображения шапки компонента
 */
export type TableRendererHeaderProps = Pick<TableRendererBaseProps, 'renderHeader'> & TableRendererState;

/**
 * Свойства для отображения контейнера таблицы
 */
export type TableRendererContainerProps<TData> = Pick<
  TableRendererBaseProps,
  'columns' | 'selectable' | 'renderHead' | 'renderOverlay' | 'TableContainerProps'
> &
  TableRendererBasePropsWithData<TData> &
  TableProps;

/**
 * Свойства для отображения шапки таблицы
 */
export type TableRendererHeadProps = Pick<TableRendererBaseProps, 'renderHead' | 'columns' | 'selectable'> & {
  CheckboxComponent: React.ElementType;
};

/**
 * Свойства для отображения тела таблицы
 */
export type TableRendererBodyProps<TData> = Pick<TableRendererBaseProps, 'columns' | 'selectable' | 'renderOverlay'> &
  TableRendererBasePropsWithData<TData>;

/**
 * Свойства для отображения строки таблицы
 */
export type TableRendererRowProps<TData> = {
  rowData: TData;
  index: number;
  state: TableRendererState;
  selected: boolean;
  CheckboxComponent: React.ElementType;
};

/**
 * Свойства для отображения скелетона строк таблицы
 */
export type TableRendererSkeletonRowProps = {
  columnsLength: number;
  CheckboxComponent: React.ElementType;
};

/**
 * Свойства для отображения оврелея таблицы
 */
export type TableRendererOverlayProps = Pick<TableRendererBaseProps, 'renderOverlay'> & TableRendererState;

/**
 * Свойства для отображения подвала компонента
 */
export type TableRendererFooterProps = Pick<TableRendererBaseProps, 'renderFooter'> & TableRendererState;

/**
 * Свойства TableRenderer
 * @template TData - тип данных, которые будут отображены в компоненте
 * @example
 * ```tsx
 *  <TableRenderer
 *    StackProps={{ spacing: 2 }}
 *    isLoading={isLoading}
 *    isFetching={isFetching}
 *    isError={isError}
 *    isEmpty={isEmpty}
 *    error="Сообщение об ошибке"
 *    data={data}
 *    columns={['Название', 'Описание', 'Дата']}
 *    selectable={false}
 *    renderHeader={{
 *      header: (state) => <HeaderComponent {...state} />,
 *      skeleton: <SkeletonHeader />,
 *    }}
 *    renderHead={() => <TableHeader />}
 *    renderRow={(props) => <RowComponent key={props.rowData.id} {...props} />}
 *    renderFooter={{
 *      footer: (state) => <FooterComponent {...state} />,
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
export type TableRendererProps<TData> = TableProps &
  TableRendererBaseProps &
  Omit<TableRendererBasePropsWithData<TData>, 'isEmpty'>;
