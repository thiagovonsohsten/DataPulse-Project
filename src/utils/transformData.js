export const transformData = (rawData) => {
  return rawData
    .filter(row => 
      row.Count && 
      parseInt(row.Count) > 0 && 
      row.Answer && 
      row.Answer.trim() !== ''
    )
    .map(row => ({
      question: row.Question,
      segmentType: row['Segment Type'],
      segmentDescription: row['Segment Description'],
      answer: capitalizeAnswer(row.Answer),
      count: parseInt(row.Count),
      percentage: parseFloat(row.Percentage),
      segmentKey: `${row['Segment Type']}: ${row['Segment Description']}`,
      isNone: row.Answer.toLowerCase() === 'none'
    }));
};

const capitalizeAnswer = (answer) => {
  if (!answer) return '';
  return answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase();
};

export const getUniqueValues = (data, field) => {
  return [...new Set(data.map(item => item[field]))].sort();
};

export const filterData = (data, filters) => {
  return data.filter(item => {
    if (filters.segmentType && item.segmentType !== filters.segmentType) {
      return false;
    }
    if (filters.segmentDescription && item.segmentDescription !== filters.segmentDescription) {
      return false;
    }
    if (filters.answer && item.answer !== filters.answer) {
      return false;
    }
    return true;
  });
};

export const getPlatformTotals = (data) => {
  const totals = {};
  data.forEach(item => {
    if (!item.isNone) {
      if (totals[item.answer]) {
        totals[item.answer] += item.count;
      } else {
        totals[item.answer] = item.count;
      }
    }
  });
  
  return Object.entries(totals)
    .map(([platform, count]) => ({ platform, count }))
    .sort((a, b) => b.count - a.count);
};

export const getSegmentData = (data, segmentType) => {
  const segments = {};
  data
    .filter(item => item.segmentType === segmentType && !item.isNone)
    .forEach(item => {
      if (!segments[item.segmentDescription]) {
        segments[item.segmentDescription] = {};
      }
      segments[item.segmentDescription][item.answer] = item.count;
    });
  
  return segments;
};

export const getQuestionSummary = (data) => {
  if (data.length === 0) return null;
  return data[0].question;
};
