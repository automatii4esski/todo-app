import { useState } from 'react';
import { IFilterClasses, IFilterMethods } from '../../types/singleProject';
import { ProgectTaskStatus } from '../../types/project';
import { initFilterClassesValue } from '../../initValues/singleProject';

export const useFilter = function (): [
  ProgectTaskStatus | '',
  IFilterClasses,
  IFilterMethods
] {
  const [filter, setFilter] = useState<ProgectTaskStatus | ''>('');
  const [filterClasses, setFilterClasses] = useState<IFilterClasses>(
    initFilterClassesValue
  );

  const setFilterHelper = function (name: keyof IFilterClasses) {
    return () => {
      for (const key in filterClasses) {
        filterClasses[key as keyof IFilterClasses] = '';
      }
      setFilterClasses({
        ...filterClasses,
        [name]: '--active',
      });
      setFilter(name === 'all' ? '' : name);
    };
  };

  const filterMethods: IFilterMethods = {
    onDone: setFilterHelper('done'),
    onActive: setFilterHelper('active'),
    onAll: setFilterHelper('all'),
  };

  return [filter, filterClasses, filterMethods];
};
