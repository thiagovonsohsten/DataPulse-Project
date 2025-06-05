interface DataRow {
  segmentType: string;
  segmentDescription: string;
  answer: string;
  count: number;
  percentage: number;
}

export const transformData = (data: any[]): DataRow[] => {
  // Agrupar dados por segmentType, segmentDescription e answer
  const groupedData = data.reduce((acc: { [key: string]: DataRow }, row: any) => {
    const key = `${row.segmentType}|${row.segmentDescription}|${row.answer}`;
    
    if (!acc[key]) {
      acc[key] = {
        segmentType: row.segmentType,
        segmentDescription: row.segmentDescription,
        answer: row.answer,
        count: 0,
        percentage: 0
      };
    }
    
    acc[key].count += parseInt(row.count) || 0;
    return acc;
  }, {});

  // Calcular percentuais
  const totalCount = (Object.values(groupedData) as DataRow[]).reduce((sum, row) => sum + row.count, 0);
  const transformedData = (Object.values(groupedData) as DataRow[]).map(row => ({
    ...row,
    percentage: row.count / totalCount
  }));

  return transformedData;
};

export const filterData = (data: DataRow[], filters: { segmentType: string; segmentDescription: string; answer: string }): DataRow[] => {
  return data.filter(row => {
    if (filters.segmentType && row.segmentType !== filters.segmentType) return false;
    if (filters.segmentDescription && row.segmentDescription !== filters.segmentDescription) return false;
    if (filters.answer && row.answer !== filters.answer) return false;
    return true;
  });
};

export const getPlatformTotals = (data: DataRow[]) => {
  const platformTotals = data.reduce((acc: { [key: string]: number }, row) => {
    acc[row.answer] = (acc[row.answer] || 0) + row.count;
    return acc;
  }, {});

  return Object.entries(platformTotals)
    .map(([platform, count]) => ({ platform, count }))
    .sort((a, b) => b.count - a.count);
};

export const getSegmentData = (data: DataRow[], segmentType: string) => {
  const segmentData = data.reduce((acc: { [key: string]: { [key: string]: number } }, row) => {
    if (row.segmentType === segmentType) {
      if (!acc[row.segmentDescription]) {
        acc[row.segmentDescription] = {};
      }
      acc[row.segmentDescription][row.answer] = (acc[row.segmentDescription][row.answer] || 0) + row.count;
    }
    return acc;
  }, {});

  return segmentData;
};

export const getQuestionSummary = (data: DataRow[]) => {
  if (data.length === 0) return '';
  
  // Tradução de perguntas conhecidas (chave normalizada)
  const questionMap: Record<string, string> = {
    'what social platform has influenced your online shopping most?': 'Qual plataforma social mais influenciou suas compras online?',
    // Adicione outros mapeamentos aqui conforme necessário
  };

  // Função para normalizar texto
  const normalize = (str: string) => str.trim().toLowerCase();

  // Tenta encontrar a pergunta original no CSV
  const firstRow = data[0];
  const possibleFields = [
    (firstRow as any).question,
    (firstRow as any).Question,
    (firstRow as any).segmentType,
    (firstRow as any).segmentDescription
  ];

  for (const field of possibleFields) {
    if (typeof field === 'string') {
      const norm = normalize(field);
      // Log para depuração
      if (field === data[0].segmentType) {
        // eslint-disable-next-line no-console
        console.log('Valor real de segmentType:', field, 'Normalizado:', norm);
      }
      if (questionMap[norm]) {
        return questionMap[norm];
      }
    }
  }

  // Fallback: frase padrão
  return `Análise de preferências de plataformas sociais por ${firstRow.segmentType ? firstRow.segmentType.toLowerCase() : ''}`;
}; 