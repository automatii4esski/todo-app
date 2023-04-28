import { FC, PropsWithChildren } from 'react';

export type myFC<P = {}> = FC<PropsWithChildren<P>>;
