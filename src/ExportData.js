import React from 'react'
import { CSVLink } from 'react-csv'

function ExportData({ data }) {
  const headers = [
    { label: 'Descrição', key: 'description' },
    { label: 'Valor', key: 'amount' },
    { label: 'Categoria', key: 'category' }
  ]

  return (
    <CSVLink data={data} headers={headers} filename={'dados-financeiros.csv'}>
      Exportar Dados
    </CSVLink>
  )
}

export default ExportData
