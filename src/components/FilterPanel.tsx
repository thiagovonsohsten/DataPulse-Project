
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface FilterPanelProps {
  data: any[];
  filters: {
    segmentType: string;
    segmentDescription: string;
    answer: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ data, filters, onFilterChange, onClearFilters }) => {
  const segmentTypes = [...new Set(data.map(item => item.segmentType))].sort();
  const segmentDescriptions = filters.segmentType && filters.segmentType !== 'all'
    ? [...new Set(data.filter(item => item.segmentType === filters.segmentType).map(item => item.segmentDescription))].sort()
    : [];
  const answers = [...new Set(data.map(item => item.answer))].sort();

  const handleFilterChange = (filterType: string, value: string) => {
    // Convert "all" back to empty string for the parent component
    const actualValue = value === 'all' ? '' : value;
    onFilterChange(filterType, actualValue);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros de Dados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Tipo de Segmento</label>
            <Select 
              value={filters.segmentType || 'all'} 
              onValueChange={(value) => handleFilterChange('segmentType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar tipo..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                {segmentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Descrição do Segmento</label>
            <Select 
              value={filters.segmentDescription || 'all'} 
              onValueChange={(value) => handleFilterChange('segmentDescription', value)}
              disabled={!filters.segmentType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar descrição..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as descrições</SelectItem>
                {segmentDescriptions.map(desc => (
                  <SelectItem key={desc} value={desc}>{desc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Plataforma</label>
            <Select 
              value={filters.answer || 'all'} 
              onValueChange={(value) => handleFilterChange('answer', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar plataforma..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as plataformas</SelectItem>
                {answers.map(answer => (
                  <SelectItem key={answer} value={answer}>{answer}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button onClick={onClearFilters} variant="outline" className="w-full">
              Limpar Filtros
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
