import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

interface DataTableProps {
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortField, setSortField] = useState('count');
  const [sortDirection, setSortDirection] = useState('desc');
  const [columnFilters, setColumnFilters] = useState({
    segmentType: '',
    segmentDescription: '',
    answer: '',
  });

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item => {
      return Object.entries(columnFilters).every(([key, value]) => {
        if (!value) return true;
        return item[key].toLowerCase().includes(value.toLowerCase());
      });
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * multiplier;
      }
      return aValue.toString().localeCompare(bValue.toString()) * multiplier;
    });

    return filtered;
  }, [data, columnFilters, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedData.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleColumnFilter = (field: string, value: string) => {
    setColumnFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados Detalhados</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Input
              placeholder="Filtrar por tipo..."
              value={columnFilters.segmentType}
              onChange={(e) => handleColumnFilter('segmentType', e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Filtrar por descrição..."
              value={columnFilters.segmentDescription}
              onChange={(e) => handleColumnFilter('segmentDescription', e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Filtrar por resposta..."
              value={columnFilters.answer}
              onChange={(e) => handleColumnFilter('answer', e.target.value)}
            />
          </div>
        </div>

        {/* Tabela */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('segmentType')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Tipo</span>
                    {renderSortIcon('segmentType')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('segmentDescription')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Descrição</span>
                    {renderSortIcon('segmentDescription')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('answer')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Resposta</span>
                    {renderSortIcon('answer')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer text-right"
                  onClick={() => handleSort('count')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Contagem</span>
                    {renderSortIcon('count')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer text-right"
                  onClick={() => handleSort('percentage')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Percentual</span>
                    {renderSortIcon('percentage')}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.segmentType}</TableCell>
                  <TableCell>{item.segmentDescription}</TableCell>
                  <TableCell>{item.answer}</TableCell>
                  <TableCell className="text-right">{item.count.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{(item.percentage * 100).toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Mostrando {((currentPage - 1) * pageSize) + 1} a {Math.min(currentPage * pageSize, filteredAndSortedData.length)} de {filteredAndSortedData.length} registros
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;
