import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { toast } from '@/hooks/use-toast';
import { LayoutDashboard } from 'lucide-react';
import FilterPanel from '@/components/FilterPanel';
import Dashboard from '@/components/Dashboard';
import DataTable from '@/components/DataTable';
import ExportButtons from '@/components/ExportButtons';
import { transformData, filterData } from '@/utils/transformData';
import logo from '/logo.png';

const Index = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    segmentType: '',
    segmentDescription: '',
    answer: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const filtered = filterData(data, filters);
    setFilteredData(filtered);
  }, [data, filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Simular carregamento de CSV (em produção seria fetch do arquivo real)
      const response = await fetch('/src/data/WhatsgoodlyData-6.csv');
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log('Dados CSV carregados:', results.data);
          const transformedData = transformData(results.data);
          console.log('Dados transformados:', transformedData);
          setData(transformedData);
          setFilteredData(transformedData);
          setLoading(false);
          
          toast({
            title: "Dados carregados com sucesso!",
            description: `${transformedData.length} registros processados.`,
          });
        },
        error: (error) => {
          console.error('Erro ao carregar CSV:', error);
          setLoading(false);
          toast({
            title: "Erro ao carregar dados",
            description: "Verifique se o arquivo CSV está disponível.",
            variant: "destructive",
          });
        }
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setLoading(false);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar o arquivo de dados.",
        variant: "destructive",
      });
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [filterType]: value };
      
      // Limpar filtros dependentes quando o filtro pai muda
      if (filterType === 'segmentType') {
        newFilters.segmentDescription = '';
      }
      
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    setFilters({
      segmentType: '',
      segmentDescription: '',
      answer: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Carregando dados...</h2>
          <p className="text-gray-500">Processando arquivo CSV</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Logo DataPulse" className="h-12 w-12 rounded-full bg-white border-2 border-purple-500" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">DataPulse</h1>
              <p className="text-gray-600">Análise Interativa de Dados de Redes Sociais da Geração Z</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data.length > 0 ? (
          <>
            {/* Painel de Filtros */}
            <FilterPanel
              data={data}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />

            {/* Dashboard de Gráficos */}
            <Dashboard data={data} filteredData={filteredData} />

            {/* Botões de Exportação */}
            <ExportButtons data={data} filteredData={filteredData} />

            {/* Tabela de Dados */}
            <DataTable data={filteredData} />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum dado disponível
              </h3>
              <p className="text-gray-500">
                Verifique se o arquivo CSV está presente na pasta src/data/
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>DataPulse © {new Date().getFullYear()} - Análise de Dados de Redes Sociais</p>
            <p className="mt-1">Desenvolvido com React, TypeScript e Recharts</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
