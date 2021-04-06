import React from 'react';
import { useLocation } from 'react-router-dom';
import InputReport from '../../components/InputReport';

const Report: React.FC = () => {
  const { search } = useLocation();
  const type = new URLSearchParams(search).get('type');
  const start = new URLSearchParams(search).get('start');
  const end = new URLSearchParams(search).get('end');

  return <InputReport status={type} start={start} end={end} />;
};

export default Report;
