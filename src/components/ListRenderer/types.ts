import { BoxProps, ListProps, StackProps } from '@mui/material';

export type ListRendererErrorMessage = { data: string };

/**
 * Состояние компонента
 */
export interface ListRendererState {
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
  error: ListRendererErrorMessage | string | unknown | undefined;
}

/**
 * Состояние компонента с массивом данных
 */
export interface ListRendererStateWithData<TData> extends ListRendererState {
  /**
   * Массив данных для отображения
   */
  data: TData[] | undefined;
}

/**
 * Базовые свойства компонента
 */
export interface ListRendererBaseProps {
  /**
   * Дополнительные свойства для root компонента
   */
  StackProps?: StackProps;

  /**
   * Дополнительные свойства для контейнер компонента
   */
  ContainerProps?: BoxProps;

  /**
   * Отображение шапки компонента
   * @example
   * ```tsx
   *  <ListRenderer
   *    {...props}
   *    renderHeader={{
   *      header: (state) => <HeaderComponent state={state} />,
   *      skeleton: <SkeletonHeader />,
   *    }}
   *  />
   * ```
   */
  renderHeader?: {
    /**
     * Функция или компонент для отображения шапки
     */
    header: ((state: ListRendererState) => React.ReactNode) | React.ReactNode;
    /**
     * Отображение скелетона шапки (если не указан, то будет пустота)
     */
    skeleton?: React.ReactNode;
  };

  /**
   * Отображение подвала компонента
   * @example
   * ```tsx
   *  <ListRenderer
   *    {...props}
   *    renderFooter={{
   *      footer: (state) => <FooterComponent state={state} />,
   *      skeleton: <SkeletonFooter />,
   *    }}
   *  />
   * ```
   */
  renderFooter?: {
    /**
     * Функция или компонент для отображения подвала
     */
    footer: ((state: ListRendererState) => React.ReactNode) | React.ReactNode;
    /**
     * Отображение скелетона подвала (если не указан, то будет пустота)
     */
    skeleton?: React.ReactNode;
  };

  /**
   * Отображение оверлея компонента (пустого состояния, ошибки, загрузки)
   * @example
   * ```tsx
   *  <ListRenderer
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

  /**
   * Количество скелетонов для отображения
   */
  skeletonCount?: number;
}

/**
 * Базовые свойства компонента с массивом данных
 */
export interface ListRendererBasePropsWithData<TData> extends ListRendererStateWithData<TData> {
  /**
   * Отображение каждого элемента в массиве данных
   */
  renderItem: {
    /**
     * Функция для отображения элемена
     * @example
     * ```tsx
     *  <ListRenderer
     *    {...props}
     *    renderItem={{
     *      item: (data, state, index) => <ItemComponent data={data} state={state} index={index} />,
     *    }}
     *  />
     * ```
     */
    item(data: TData, state: ListRendererState, index: number): React.ReactNode;
    /**
     * Отображение скелетона элемента (если не указан, то будет пустота)
     * @example
     * ```tsx
     *  <ListRenderer
     *    {...props}
     *    renderItem={{
     *      skeleton: (index) => <SkeletonItem index={index} />,
     *    }}
     *  />
     * ```
     */
    skeleton(index: number): React.ReactNode;
  };
}

/**
 * Свойства для отображения шапки компонента
 */
export type ListRendererHeaderProps = Pick<ListRendererBaseProps, 'renderHeader'> & ListRendererState;

/**
 * Свойства для отображения элементов массива данных компонента
 */
export type ListRendererItemsProps<TData> = ListRendererBasePropsWithData<TData> & ListProps;

/**
 * Свойства для отображения скелетонов компонента
 */
export type ListRendererSkeletonItemsProps = Pick<ListRendererBaseProps, 'skeletonCount'> &
  ListProps & {
    /**
     * Отображение скелетона элемента (если не указан, то будет пустота)
     * @example
     * ```tsx
     *  <ListRenderer
     *    {...props}
     *    renderItem={{
     *      skeleton: (index) => <SkeletonItem index={index} />,
     *    }}
     *  />
     * ```
     */
    renderItem: {
      /**
       * Отображение скелетона элемента (если не указан, то будет пустота)
       */
      skeleton(index: number): React.ReactNode;
    };
  };

/**
 * Свойства для отображения оверлея компонента
 */
export type ListRendererOverlayProps = Pick<ListRendererBaseProps, 'renderOverlay'> &
  Omit<ListRendererState, 'isLoading'>;

/**
 * Свойства для отображения подвала компонента
 */
export type ListRendererFooterProps = Pick<ListRendererBaseProps, 'renderFooter'> & ListRendererState;

/**
 * Свойства ListRenderer
 * @template TData - тип данных, которые будут отображены в компоненте
 * @example
 * ```tsx
 *  <ListRenderer
 *    StackProps={{ spacing: 2 }}
 *    isLoading={isLoading}
 *    isFetching={isFetching}
 *    isError={isError}
 *    isEmpty={isEmpty}
 *    error="Сообщение об ошибке"
 *    data={data}
 *    renderHeader={{
 *      header: (state) => <HeaderComponent {...state} />,
 *      skeleton: <SkeletonHeader />,
 *    }}
 *    renderFooter={{
 *      footer: (state) => <FooterComponent {...state} />,
 *      skeleton: <SkeletonFooter />,
 *    }}
 *    renderOverlay={{
 *      empty: <EmptyComponent />,
 *      error: (message) => <ErrorComponent message={message} />,
 *      loader: <LoaderComponent />,
 *    }}
 *    renderItem={{
 *      item: (data, state, index) => <ItemComponent data={data} {...state} index={index} />,
 *      skeleton: (index) => <SkeletonItemComponent key={index} />,
 *    }}
 *  />
 * ```
 */
export type ListRendererProps<TData> = ListProps &
  ListRendererBaseProps &
  Omit<ListRendererBasePropsWithData<TData>, 'isEmpty'>;
