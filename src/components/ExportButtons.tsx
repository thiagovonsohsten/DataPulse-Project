
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ExportButtonsProps {
  data: any[];
  filteredData: any[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ data, filteredData }) => {
  const exportToCSV = () => {
    const csvContent = [
      ['Tipo de Segmento', 'Descrição', 'Plataforma', 'Contagem', 'Percentual'],
      ...filteredData.map(row => [
        row.segmentType,
        row.segmentDescription,
        row.answer,
        row.count,
        `${row.percentage}%`
      ])
    ];

    const csvString = csvContent.map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `datapulse-dados-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(20);
    doc.text('DataPulse - Relatório de Dados', 20, 20);
    
    // Subtítulo com data
    doc.setFontSize(12);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, 30);
    doc.text(`Total de registros: ${filteredData.length}`, 20, 40);
    
    // Preparar dados para a tabela
    const tableData = filteredData.map(row => [
      row.segmentType,
      row.segmentDescription,
      row.answer,
      row.count.toString(),
      `${row.percentage.toFixed(1)}%`
    ]);

    // Adicionar tabela
    (doc as any).autoTable({
      head: [['Tipo de Segmento', 'Descrição', 'Plataforma', 'Contagem', 'Percentual']],
      body: tableData,
      startY: 50,
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [66, 139, 202],
        textColor: 255,
        fontSize: 10,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 50, left: 20, right: 20 },
    });
    
    // Adicionar rodapé
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Página ${i} de ${pageCount} - DataPulse © ${new Date().getFullYear()}`,
        20,
        doc.internal.pageSize.height - 10
      );
    }

    doc.save(`datapulse-relatorio-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Exportar Dados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={exportToCSV} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Exportar CSV
            <span className="text-xs opacity-70">({filteredData.length} registros)</span>
          </Button>
          <Button onClick={exportToPDF} variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Exportar PDF
            <span className="text-xs opacity-70">({filteredData.length} registros)</span>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Os arquivos incluirão apenas os dados filtrados atualmente exibidos.
        </p>
      </CardContent>
    </Card>
  );
};

export default ExportButtons;
