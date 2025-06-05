import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
  LineChart, Line, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart,
  Scatter, ZAxis
} from 'recharts';
import { getPlatformTotals, getSegmentData, getQuestionSummary } from '../utils/transformData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Filter } from "lucide-react";

interface DashboardProps {
  data: any[];
  filteredData: any[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

const Dashboard: React.FC<DashboardProps> = ({ data, filteredData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const platformTotals = getPlatformTotals(filteredData);
  const genderData = getSegmentData(filteredData, 'Gender');
  const universityData = getSegmentData(filteredData, 'University');
  const question = getQuestionSummary(data);

  // Mapeamento de tradução para perguntas
  const questionTranslations: Record<string, string> = {
    'What social platform has influenced your online shopping most?': 'Qual plataforma social mais influenciou suas compras online?',
    // Adicione outras traduções aqui se necessário
  };

  // Função para traduzir a pergunta
  const translateQuestion = (originalQuestion: string) => {
    return questionTranslations[originalQuestion] || originalQuestion;
  };

  // Calcular estatísticas gerais
  const totalResponses = filteredData.length;
  const uniquePlatforms = new Set(filteredData.map(item => item.Answer)).size;
  const topPlatform = platformTotals[0]?.platform || 'N/A';
  const topPlatformCount = platformTotals[0]?.count || 0;
  const averageResponses = totalResponses / uniquePlatforms;

  // Mapeamento de tradução para gêneros
  const genderTranslations: Record<string, string> = {
    'Male': 'Masculino',
    'Female': 'Feminino',
    'Other': 'Outro',
    '0': 'Masculino',
    '1': 'Feminino'
  };

  // Processar dados de gênero
  const genderDistribution = Object.entries(genderData).map(([gender, data]) => ({
    gender: genderTranslations[gender] || gender,
    total: Object.values(data).reduce((a, b) => a + b, 0)
  }));

  // Dados para o gráfico de radar
  const radarData = platformTotals.map(item => ({
    platform: item.platform,
    A: item.count,
    fullMark: Math.max(...platformTotals.map(p => p.count))
  }));

  // Dados para o gráfico de dispersão
  const scatterData = platformTotals.map(item => ({
    x: item.count,
    y: Math.random() * 100, // Simulando engajamento
    z: item.count * 2 // Simulando alcance
  }));

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com Título e Ações */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Análise de Dados</h2>
            <p className="text-gray-600 text-lg">{translateQuestion(question)}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Respostas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResponses}</div>
            <p className="text-xs text-gray-500">Respostas totais</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Plataformas Únicas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniquePlatforms}</div>
            <p className="text-xs text-gray-500">Média: {averageResponses.toFixed(1)} por plataforma</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Plataforma Mais Popular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topPlatform}</div>
            <p className="text-xs text-gray-500">{topPlatformCount} respostas</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((topPlatformCount / totalResponses) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-gray-500">do total de respostas</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para diferentes visualizações */}
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="platforms">Plataformas</TabsTrigger>
          <TabsTrigger value="demographics">Demografia</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Gráfico de Barras - Plataformas */}
          <Card>
            <CardHeader>
              <CardTitle>Plataformas Sociais Mais Utilizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformTotals} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Número de Respostas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico de Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Popularidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="platform" />
                    <PolarRadiusAxis />
                    <Radar name="Popularidade" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          {/* Gráfico de Dispersão */}
          <Card>
            <CardHeader>
              <CardTitle>Análise de Engajamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="Respostas" />
                    <YAxis type="number" dataKey="y" name="Engajamento" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="Alcance" />
                    <Tooltip content={<CustomTooltip />} />
                    <Scatter name="Plataformas" data={scatterData} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          {/* Gráfico de Pizza - Gênero */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Gênero</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="total"
                      nameKey="gender"
                    >
                      {genderDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 5 Universidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Object.entries(universityData)
                      .map(([university, data]) => ({
                        name: university,
                        total: Object.values(data).reduce((a, b) => a + b, 0)
                      }))
                      .sort((a, b) => b.total - a.total)
                      .slice(0, 5)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="total" fill="#00C49F" name="Total de Respostas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          {/* Gráfico de Área - Tendências */}
          <Card>
            <CardHeader>
              <CardTitle>Tendências de Uso por Plataforma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={platformTotals}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico de Linha - Comparativo */}
          <Card>
            <CardHeader>
              <CardTitle>Comparativo de Crescimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={platformTotals}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
