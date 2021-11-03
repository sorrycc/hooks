import type { DependencyList, MutableRefObject } from 'react';
import type Fetch from './Fetch';

export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>;
export type Subscribe = () => void;

// for Fetch

export interface FetchOptions<TData, TParams extends any[]> {
  manual?: boolean;

  onBeforeRef: MutableRefObject<Options<TData, TParams>['onBefore']>;
  onSuccessRef: MutableRefObject<Options<TData, TParams>['onSuccess']>;
  onErrorRef: MutableRefObject<Options<TData, TParams>['onError']>;
  // formatResultRef: MutableRefObject<Options<TData, TParams>['formatResult']>;
  onFinallyRef: MutableRefObject<Options<TData, TParams>['onFinally']>;
}

export interface FetchState<TData, TParams extends any[]> {
  loading: boolean;
  params?: TParams;
  data?: TData;
  error?: Error;
}

export interface PluginReturn<TData, TParams extends any[]> {
  onBefore?: (params: TParams) =>
    | ({
        stopNow?: boolean;
        returnNow?: boolean;
      } & Partial<FetchState<TData, TParams>>)
    | void;

  onRequest?: (
    service: Service<TData, TParams>,
    params: TParams,
  ) => {
    servicePromise?: Promise<TData>;
  };

  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
  onCancel?: () => void;
  onMutate?: (data: TData) => void;
}

// for useRequestImplement

export interface Options<TData, TParams extends any[]> {
  manual?: boolean;

  onBefore?: (params: TParams) => void;
  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  // formatResult?: (res: any) => TData;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;

  defaultParams?: TParams;

  // refreshDeps
  refreshDeps?: DependencyList;

  // loading delay
  loadingDelay?: number;

  // polling
  pollingInterval?: number;
  pollingWhenHidden?: boolean;

  // refresh on window focus
  refreshOnWindowFocus?: boolean;
  focusTimespan?: number;

  // debounce
  debounceWait?: number;
  debounceLeading?: boolean;
  debounceTrailing?: boolean;
  debounceMaxWait?: number;

  // throttle
  throttleWait?: number;
  throttleLeading?: boolean;
  throttleTrailing?: boolean;

  // cache
  cacheKey?: string;
  cacheTime?: number;
  staleTime?: number;

  [key: string]: any;
}

export type Plugin<TData, TParams extends any[]> = (
  fetchInstance: Fetch<TData, TParams>,
  options: Options<TData, TParams>,
) => PluginReturn<TData, TParams>;

// for index
// export type OptionsWithoutFormat<TData, TParams extends any[]> = Omit<Options<TData, TParams>, 'formatResult'>;

// export interface OptionsWithFormat<TData, TParams extends any[], TFormated, TTFormated extends TFormated = any> extends Omit<Options<TTFormated, TParams>, 'formatResult'> {
//   formatResult: (res: TData) => TFormated;
// };

export interface Result<TData, TParams extends any[]> {
  loading: boolean;
  data?: TData;
  error?: Error;
  params: TParams | [];
  cancel: Fetch<TData, TParams>['cancel'];
  refresh: Fetch<TData, TParams>['refresh'];
  refreshAsync: Fetch<TData, TParams>['refreshAsync'];
  run: Fetch<TData, TParams>['run'];
  runAsync: Fetch<TData, TParams>['runAsync'];
  mutate: Fetch<TData, TParams>['mutate'];
}
