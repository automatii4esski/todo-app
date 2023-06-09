import { FC, PropsWithChildren, RefObject } from 'react';

export type MyFCStrict<TProps = {}> = FC<PropsWithChildren<TProps>>;
export type MyFC<TProps = {}> = FC<
  PropsWithChildren<TProps & Record<any, any>>
>;
export type RefObj<TElement = HTMLElement> = Partial<{
  reference: RefObject<TElement> | undefined;
}>;

export interface ISortOption {
  value: string;
  text: string;
}
