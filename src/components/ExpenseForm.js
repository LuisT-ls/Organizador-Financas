import React, { useState, useEffect } from 'react'

function ExpenseForm({ onExpenseSubmit, initialValue, initialCategory }) {
  const [expense, setExpense] = useState(initialValue || '')
  const [category, setCategory] = useState(initialCategory || '')

  useEffect(() => {
    setExpense(initialValue || '')
    setCategory(initialCategory || '')
  }, [initialValue, initialCategory])

  const categories = [
    'Moradia',
    'Alimentação',
    'Transporte',
    'Lazer',
    'Saúde',
    'Educação',
    'Outros'
  ]

  const handleSubmit = e => {
    e.preventDefault()
    const expenseValue = parseFloat(expense)
    if (!isNaN(expenseValue) && expenseValue > 0 && category) {
      onExpenseSubmit(expenseValue, category)
      setExpense('')
      setCategory('')
    } else {
      alert('Por favor, insira um valor válido e selecione uma categoria.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialValue ? 'Editar' : 'Adicionar'} Despesa</h3>
      <input
        type="number"
        value={expense}
        onChange={e => setExpense(e.target.value)}
        placeholder="Valor da despesa"
        step="0.01"
        min="0"
        required
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      >
        <option value="">Selecione uma categoria</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit">
        {initialValue ? 'Atualizar' : 'Adicionar'} Despesa
      </button>
    </form>
  )
}

export default ExpenseForm
