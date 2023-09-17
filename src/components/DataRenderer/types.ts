export type DataRendererErrorMessage = { data: string };

/**
 * Состояние компонента
 */
export interface DataRendererState {
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
  error: DataRendererErrorMessage | string | unknown | undefined;
}

/**
 * Состояние компонента с данными
 */
export interface DataRendererStateWithData<TData> extends DataRendererState {
  /**
   * Входные данные
   */
  data: TData | undefined | null;
}

/**
 * Базовые свойства компонента
 */
export interface DataRendererBaseProps<TData> {
  element: React.ReactElement;

  /**
   * Свойство для отображения данных
   */
  renderData: {
    /**
     * Функция для отображения элемента
     * @example
     * ```tsx
     *  <Renderer
     *    {...props}
     *    renderData={{
     *      item: (data, state) => <ItemComponent data={data} state={state} />,
     *    }}
     *  />
     * ```
     */
    item(data: TData, state: DataRendererState): React.ReactNode;
    /**
     * Отображение скелетона элемента (если не указан, то будет пустота)
     * @example
     * ```tsx
     *  <Renderer
     *    {...props}
     *    renderItem={{
     *      skeleton: <SkeletonComponent />,
     *    }}
     *  />
     * ```
     */
    skeleton: React.ReactNode;
  };

  /**
   * Отображение оверлея компонента (пустого состояния, ошибки, загрузки)
   * @example
   * ```tsx
   *  <Renderer
   *    {...props}
   *    renderOverlay={{
   *      empty: <EmptyState />,
   *      error: (message) => <ErrorComponent message={message} />,
   *      loader: <Loader />,
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
 * Свойства для отображения данных компонента
 */
export type DataRendererDataProps<TData> = DataRendererStateWithData<TData> &
  Pick<DataRendererBaseProps<TData>, 'renderData'>;

/**
 * Свойства для отображения скелетона компонента
 */
export type DataRendererSkeletonProps = {
  /**
   * Отображение скелетона элемента (если не указан, то будет пустота)
   * @example
   * ```tsx
   *  <DataRenderer
   *    {...props}
   *    renderData={{
   *      skeleton: (index) => <SkeletonComponent />,
   *    }}
   *  />
   * ```
   */
  renderData: {
    /**
     * Отображение скелетона элемента (если не указан, то будет пустота)
     */
    skeleton: React.ReactNode;
  };
};

/**
 * Свойства для отображения оверлея компонента
 */
export type DataRendererOverlayProps = Pick<DataRendererBaseProps<unknown>, 'renderOverlay'> &
  Omit<DataRendererState, 'isLoading'>;

/**
 * Свойства GridRenderer
 * @template TData - тип данных, которые будут отображены в компоненте
 * @example
 * ```tsx
 *  <Renderer
 *    isLoading={isLoading}
 *    isFetching={isFetching}
 *    isError={isError}
 *    isEmpty={isEmpty}
 *    error="Сообщение об ошибке"
 *    data={data}
 *  />
 * ```
 */
export type DataRendererProps<TData> = DataRendererBaseProps<TData> &
  Omit<DataRendererStateWithData<TData>, 'isEmpty'> &
  DataRendererSkeletonProps;
