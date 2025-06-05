import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { getPlatformTotals, getSegmentData, getQuestionSummary } from '../utils/transformData';

interface DashboardProps {
  data: any[];
  filteredData: any[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

const Dashboard: React.FC<DashboardProps> = ({ data, filteredData }) => {
  const platformTotals = getPlatformTotals(filteredData);
  const genderData = getSegmentData(filteredData, 'Gender');
  const universityData = getSegmentData(filteredData, 'University');
  const question = getQuestionSummary(data);

  // Calcular estatísticas gerais
  const totalResponses = filteredData.length;
  const uniquePlatforms = new Set(filteredData.map(item => item.Answer)).size;
  const topPlatform = platformTotals[0]?.platform || 'N/A';
  const topPlatformCount = platformTotals[0]?.count || 0;

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

  return (
    <div className="space-y-6">
      {/* Título e Pergunta */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Análise de Dados</h2>
        <p className="text-gray-600 text-lg">{question}</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Respostas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResponses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Plataformas Únicas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniquePlatforms}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Plataforma Mais Popular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topPlatform}</div>
            <p className="text-xs text-gray-500">{topPlatformCount} respostas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((topPlatformCount / totalResponses) * 100).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Barras - Plataformas */}
      <Card>
        <CardHeader>
          <CardTitle>Plataformas Sociais Mais Influentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformTotals} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Número de Respostas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos de Pizza e Barras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Gênero</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(genderData).map(([gender, data]) => ({
                      name: gender,
                      value: Object.values(data).reduce((a, b) => a + b, 0)
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(genderData).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Barras - Universidades */}
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
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#00C49F" name="Total de Respostas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

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
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
