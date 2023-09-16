import { BoxProps, GridProps, StackProps } from '@mui/material';

export type GridRendererErrorMessage = { data: string };

/**
 * Состояние компонента
 */
export interface GridRendererState {
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
  error: GridRendererErrorMessage | string | unknown | undefined;
}

/**
 * Состояние компонента с массивом данных
 */
export interface GridRendererStateWithData<TData> extends GridRendererState {
  /**
   * Массив данных для отображения
   */
  data: TData[] | undefined;
}

/**
 * Базовые свойства компонента
 */
export interface GridRendererBaseProps {
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
   *  <GridRenderer
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
    header: ((state: GridRendererState) => React.ReactNode) | React.ReactNode;
    /**
     * Отображение скелетона шапки (если не указан, то будет пустота)
     */
    skeleton?: React.ReactNode;
  };

  /**
   * Отображение подвала компонента
   * @example
   * ```tsx
   *  <GridRenderer
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
    footer: ((state: GridRendererState) => React.ReactNode) | React.ReactNode;
    /**
     * Отображение скелетона подвала (если не указан, то будет пустота)
     */
    skeleton?: React.ReactNode;
  };

  /**
   * Отображение оверлея компонента (пустого состояния, ошибки, загрузки)
   * @example
   * ```tsx
   *  <GridRenderer
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
export interface GridRendererBasePropsWithData<TData> extends GridRendererStateWithData<TData> {
  /**
   * Отображение каждого элемента в массиве данных
   */
  renderItem: {
    /**
     * Функция для отображения элемена
     * @example
     * ```tsx
     *  <GridRenderer
     *    {...props}
     *    renderItem={{
     *      item: (data, state, index) => <ItemComponent data={data} state={state} index={index} />,
     *    }}
     *  />
     * ```
     */
    item(data: TData, state: GridRendererState, index: number): React.ReactNode;
    /**
     * Отображение скелетона элемента (если не указан, то будет пустота)
     * @example
     * ```tsx
     *  <GridRenderer
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
export type GridRendererHeaderProps = Pick<GridRendererBaseProps, 'renderHeader'> & GridRendererState;

/**
 * Свойства для отображения элементов массива данных компонента
 */
export type GridRendererItemsProps<TData> = GridRendererBasePropsWithData<TData> & GridProps;

/**
 * Свойства для отображения скелетонов компонента
 */
export type GridRendererSkeletonItemsProps = Pick<GridRendererBaseProps, 'skeletonCount'> &
  GridProps & {
    /**
     * Отображение скелетона элемента (если не указан, то будет пустота)
     * @example
     * ```tsx
     *  <GridRenderer
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
export type GridRendererOverlayProps = Pick<GridRendererBaseProps, 'renderOverlay'> &
  Omit<GridRendererState, 'isLoading'>;

/**
 * Свойства для отображения подвала компонента
 */
export type GridRendererFooterProps = Pick<GridRendererBaseProps, 'renderFooter'> & GridRendererState;

/**
 * Свойства GridRenderer
 * @template TData - тип данных, которые будут отображены в компоненте
 * @example
 * ```tsx
 *  <GridRenderer
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
export type GridRendererProps<TData> = GridProps &
  GridRendererBaseProps &
  Omit<GridRendererBasePropsWithData<TData>, 'isEmpty'>;
