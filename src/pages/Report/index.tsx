import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { FiPrinter } from 'react-icons/fi';

import InputReport from '../../components/InputReport';
import api from '../../services/api';
import generatedDate, { getDateWithoutHoursBr } from '../../utils/getDateBr';
import { ProductProps } from '../../utils/props';
import Loading from '../../components/Loading';

import { Container, Content, Header, Values, PrintSpan } from './styles';

const Report: React.FC = () => {
  const { search } = useLocation();

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [finishedData, setFinishedData] = useState(false);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [totalSale, setTotalSale] = useState(0);

  const type = new URLSearchParams(search).get('type');
  const start = new URLSearchParams(search).get('start');
  const end = new URLSearchParams(search).get('end');

  useEffect(() => {
    api
      .get(`products/?status=${type}&start=${start}&end=${end}`)
      .then((response) => {
        setProducts(response.data.products);
        setTotalPurchase(response.data.totalPurchase);
        setTotalSale(response.data.totalSale);
        setFinishedData(true);
      });
  }, [setFinishedData, end, start, type, products]);

  const handlePrintClick = useCallback(() => {
    setTimeout(() => {
      window.print();
    }, 200);
  }, []);

  if (finishedData) {
    return (
      <Container>
        <PrintSpan id="printSpan">
          <button type="button" onClick={() => handlePrintClick()}>
            <FiPrinter />
            Imprimir
          </button>
        </PrintSpan>
        <Content>
          <Header>
            <h2>Relatório de {type === 'I' ? 'Estoque' : 'Saída'}</h2>
            <p>
              De {getDateWithoutHoursBr(start as string)} até{' '}
              {getDateWithoutHoursBr(end as string)}
            </p>
            <p>Gerado em {generatedDate(new Date())}hrs</p>
            <Values>
              <p>
                Valor total de compra:{' '}
                {totalPurchase.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <p>
                Valor total de venda:{' '}
                {totalSale.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            </Values>
          </Header>
          <InputReport products={products} />
        </Content>
      </Container>
    );
  }
  return <Loading />;
};

export default Report;
