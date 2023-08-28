import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  HTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { ISortOption, RefObj } from './common';
import { ProjectColors } from './project';

export type MyButtonType = ButtonHTMLAttributes<any> &
  RefObj<HTMLButtonElement>;

export type MyInputType = InputHTMLAttributes<any> & RefObj<HTMLInputElement>;

interface IPopup {
  active: boolean;
  onHideHandler: (...args: any) => any;
}

export type MyPopupType = HTMLAttributes<HTMLElement> & IPopup;

type Color = 'yellow' | 'green';

interface IProgressLine {
  count: string;
  width: number;
  color?: Color;
}
export type MyProgressLineType = HTMLAttributes<any> & IProgressLine;

interface IMySelect {
  options: ISortOption[];
  sort: string;
  onChange: (...args: any) => any;
  defaultText?: string;
}

export type MySelectType = SelectHTMLAttributes<any> &
  RefObj<HTMLInputElement> &
  IMySelect;

export type MyTextAreaType = TextareaHTMLAttributes<any> &
  RefObj<HTMLTextAreaElement>;

export interface IColorsRadio {
  defaultValue: ProjectColors;
}
