import React, { useCallback, useEffect, useState } from 'react';

import { Template } from '../../components';
import { SearchSection, ListSection } from './components';
import { Notify, User } from '../../services';

const Users = () => {
  const [tableData, setTableData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const loadData = useCallback(async (params) => {
    setIsLoading(true);
    const { success, body } = await User.getList(params);

    if (success) {
      setTableData(body);
    } else {
      Notify.error(body);
      setTableData({});
    }

    setIsLoading(false);
  }, []);

  const handleSearchSubmit = useCallback(({
    name = '',
    email = '',
  } = {}) => {
    setFilters({
      name,
      email,
    });
  }, []);

  const handlePaginate = useCallback((_, page) => {
    setFilters({
      ...filters,
      page,
    });
  }, [filters]);

  useEffect(() => {
    loadData(filters);
  }, [filters]);

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

export default Users;
