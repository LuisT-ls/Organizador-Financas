import React, { useState, useEffect } from 'react'

function IncomeForm({ onIncomeSubmit, initialValue }) {
  const [income, setIncome] = useState(initialValue || '')

  useEffect(() => {
    setIncome(initialValue || '')
  }, [initialValue])

  const handleSubmit = e => {
    e.preventDefault()
    const incomeValue = parseFloat(income)
    if (!isNaN(incomeValue) && incomeValue > 0) {
      onIncomeSubmit(incomeValue)
      setIncome('')
    } else {
      alert('Por favor, insira um valor válido para a renda.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialValue ? 'Editar' : 'Inserir'} Renda</h3>
      <input
        type="number"
        value={income}
        onChange={e => setIncome(e.target.value)}
        placeholder="Insira sua renda"
        step="0.01"
        min="0"
        required
      />
      <button type="submit">
        {initialValue ? 'Atualizar' : 'Adicionar'} Renda
      </button>
    </form>
  )
}

export default IncomeForm
