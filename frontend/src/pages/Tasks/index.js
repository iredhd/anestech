import React, { useCallback, useEffect, useState } from 'react';

import { Template } from '../../components';
import { SearchSection, ListSection } from './components';
import { Notify, Task } from '../../services';

const Home = () => {
  const [tableData, setTableData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const loadTasks = useCallback(async (params) => {
    setIsLoading(true);
    const { success, body } = await Task.getList(params);

    if (success) {
      setTableData(body);
    } else {
      Notify.error(body);
      setTableData({});
    }

    setIsLoading(false);
  }, []);

  const handleSearchSubmit = useCallback(({
    userId = '', datetimeStart = '', datetimeEnd = '', description = '',
  } = {}) => {
    setFilters({
      userId, datetimeStart, datetimeEnd, description,
    });
  }, []);

  const handlePaginate = useCallback((_, page) => {
    setFilters({
      ...filters,
      page,
    });
  }, [filters]);

  useEffect(() => {
    loadTasks(filters);
  }, [filters]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <Template>
      <SearchSection
        onSubmit={handleSearchSubmit}
      />
      <ListSection
        data={tableData}
        isLoading={isLoading}
        onPaginate={handlePaginate}
      />
    </Template>
  );
};

export default Home;
