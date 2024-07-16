import React from 'react'
import { CSVLink } from 'react-csv'
import Button from '@mui/material/Button'

function ImportExport({ expenses, income }) {
  const exportData = {
    expenses,
    income
  }

  return (
    <div>
      <Button variant="contained" color="primary">
        <CSVLink
          data={exportData}
          filename="financial_data.csv"
          style={{ textDecoration: 'none', color: 'white' }}
        >
          Exportar Dados
        </CSVLink>
      </Button>
      <input type="file" accept=".csv" />
      {/* Implementar a lógica de importação aqui */}
    </div>
  )
}

export default ImportExport
