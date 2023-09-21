import { StackProps, TableContainerProps, TableProps } from '@mui/material';

export type RendererErrorMessage = { data: string };

/**
 * Состояние компонента
 */
export interface RendererState {
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
  isEmpty: boolean | undefined;
  /**
   * Сообщение ошибки
   */
  error: RendererErrorMessage | string | unknown | undefined;
}

/**
 * Свойства шапки компонента
 */
export interface RenderHeaderProps {
  /**
   * Функция или компонент для отображения шапки
   */
  header: ((state: RendererState) => React.ReactNode) | React.ReactNode;
  /**
   * Отображение скелетона шапки (если не указан, то будет пустота)
   */
  skeleton?: React.ReactNode;
}

/**
 * Свойства подвала компонента
 */
export interface RenderFooterProps {
  /**
   * Функция или компонент для отображения подвала
   */
  footer: ((state: RendererState) => React.ReactNode) | React.ReactNode;
  /**
   * Отображение скелетона подвала (если не указан, то будет пустота)
   */
  skeleton?: React.ReactNode;
}

/**
 * Свойства оверлея компонента (пустого состояния, ошибки, загрузки)
 */
export interface RenderOverlayProps {
  /**
   * Отображение, когда данные отсутствуют
   */
  empty: React.ReactNode;
  /**
   * Функция или компонент для отображения ошибки
   */
  error: ((message: string) => React.ReactNode) | React.ReactNode;
  /**
   * Отображение, когда данные находится в состоянии загрузки (кроме начальной)
   */
  loader: React.ReactNode;
}

/**
 * Базовые свойства компонента
 */
export type RendererProps<TRender> = RendererState & {
  /**
   * Свойство для отображения данных
   */
  render: TRender;
  /**
   * @example
   * ```tsx
   *  <Renderer
   *    {...props}
   *    renderHeader={{
   *      footer: (state) => <HeaderComponent state={state} />,
   *      skeleton: <SkeletonComponent />,
   *    }}
   *  />
   * ```
   */
  renderHeader?: RenderHeaderProps;
  /**
   * @example
   * ```tsx
   *  <Renderer
   *    {...props}
   *    renderFooter={{
   *      footer: (state) => <FooterComponent state={state} />,
   *      skeleton: <SkeletonComponent />,
   *    }}
   *  />
   * ```
   */
  renderFooter?: RenderFooterProps;
  /**
   * @example
   * ```tsx
   *  <Renderer
   *    {...props}
   *    renderOverlay={{
   *      empty: <EmptyComponent />,
   *      error: (message) => <ErrorComponent message={message} />,
   *      loader: <LoaderComponent />,
   *    }}
   *  />
   * ```
   */
  renderOverlay: RenderOverlayProps;
};

interface DataRenderProps<TData> {
  item(data: TData, state: Omit<RendererState, 'isLoading'>): React.ReactNode;
  skeleton: React.ReactNode;
}

export type DataRendererProps<TData> = Omit<
  RendererProps<DataRenderProps<NonNullable<TData>>>,
  'renderHeader' | 'renderFooter' | 'isEmpty'
> & {
  /**
   * Входные данные
   */
  data: TData | undefined;
  /**
   * Root компонент
   */
  element: React.ReactElement;
};

interface ListRenderProps<TData> {
  item(data: TData, state: Omit<RendererState, 'isLoading'>, index: number): React.ReactNode;
  skeleton(index: number): React.ReactNode;
}

export type ListRendererProps<TData> = Omit<RendererProps<ListRenderProps<TData>>, 'isEmpty'> & {
  /**
   * Входные данные
   */
  data: TData[];
  /**
   * Root компонент
   */
  element: React.ReactElement;
  /**
   * Дополнительные свойства для root компонента
   */
  StackProps?: StackProps;
  /**
   * Количество скелетонов для отображения
   */
  skeletonCount?: number;
};

interface SelectableRowProps {
  selected: boolean;
  CheckboxComponent: React.ElementType;
}

interface TableRenderProps<TData> {
  row(
    data: TData,
    state: Omit<RendererState, 'isLoading'>,
    index: number,
    selectableProps: SelectableRowProps,
  ): React.ReactNode;
}

interface TableRendererSelectableProps {
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
}

export type TableRendererProps<TData> = Omit<RendererProps<TableRenderProps<TData>>, 'isEmpty'> &
  TableRendererSelectableProps &
  TableProps & {
    /**
     * Входные данные
     */
    data: TData[];
    /**
     * Название колонок в таблице
     */
    columns: string[];
    /**
     * Дополнительные свойства для TableContainer компонента
     */
    TableContainerProps?: TableContainerProps;
    /**
     * Дополнительные свойства для root компонента
     */
    StackProps?: StackProps;
  };
