import React, { useState } from 'react'
import './styles/App.css'
import IncomeForm from './components/IncomeForm'
import ExpenseForm from './components/ExpenseForm'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'

function App() {
  const [incomes, setIncomes] = useState([])
  const [expenses, setExpenses] = useState([])
  const [editingIncome, setEditingIncome] = useState(null)
  const [editingExpense, setEditingExpense] = useState(null)

  const handleIncomeSubmit = value => {
    if (editingIncome !== null) {
      setIncomes(
        incomes.map((income, index) =>
          index === editingIncome ? { ...income, value } : income
        )
      )
      setEditingIncome(null)
    } else {
      setIncomes([...incomes, { value, id: Date.now() }])
    }
  }

  const handleExpenseSubmit = (value, category) => {
    if (editingExpense !== null) {
      setExpenses(
        expenses.map((expense, index) =>
          index === editingExpense ? { ...expense, value, category } : expense
        )
      )
      setEditingExpense(null)
    } else {
      setExpenses([...expenses, { value, category, id: Date.now() }])
    }
  }

  const editIncome = index => {
    setEditingIncome(index)
  }

  const editExpense = index => {
    setEditingExpense(index)
  }

  const deleteIncome = id => {
    setIncomes(incomes.filter(income => income.id !== id))
  }

  const deleteExpense = id => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const calculateTotalIncome = () =>
    incomes.reduce((total, income) => total + income.value, 0)
  const calculateTotalExpenses = () =>
    expenses.reduce((total, expense) => total + expense.value, 0)
  const calculateSavings = () =>
    calculateTotalIncome() - calculateTotalExpenses()

  const getExpensesByCategory = () => {
    const expensesByCategory = {}
    expenses.forEach(expense => {
      if (expensesByCategory[expense.category]) {
        expensesByCategory[expense.category] += expense.value
      } else {
        expensesByCategory[expense.category] = expense.value
      }
    })
    return Object.entries(expensesByCategory).map(([name, value]) => ({
      name,
      value
    }))
  }

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884D8',
    '#82CA9D',
    '#FFA07A'
  ]

  return (
    <div className="App">
      <header className="App-header">
        <h1>Organizador de Finanças</h1>
      </header>
      <main>
        <section id="income">
          <h2>Renda</h2>
          <IncomeForm
            onIncomeSubmit={handleIncomeSubmit}
            initialValue={
              editingIncome !== null ? incomes[editingIncome].value : ''
            }
          />
          <ul>
            {incomes.map((income, index) => (
              <li key={income.id}>
                R$ {income.value.toFixed(2)}
                <button onClick={() => editIncome(index)}>Editar</button>
                <button onClick={() => deleteIncome(income.id)}>Excluir</button>
              </li>
            ))}
          </ul>
          <p>Renda Total: R$ {calculateTotalIncome().toFixed(2)}</p>
        </section>
        <section id="expenses">
          <h2>Despesas</h2>
          <ExpenseForm
            onExpenseSubmit={handleExpenseSubmit}
            initialValue={
              editingExpense !== null ? expenses[editingExpense].value : ''
            }
            initialCategory={
              editingExpense !== null ? expenses[editingExpense].category : ''
            }
          />
          <ul>
            {expenses.map((expense, index) => (
              <li key={expense.id}>
                {expense.category}: R$ {expense.value.toFixed(2)}
                <button onClick={() => editExpense(index)}>Editar</button>
                <button onClick={() => deleteExpense(expense.id)}>
                  Excluir
                </button>
              </li>
            ))}
          </ul>
          <p>Total de Despesas: R$ {calculateTotalExpenses().toFixed(2)}</p>
        </section>
        <section id="summary">
          <h2>Resumo</h2>
          <p>Saldo: R$ {calculateSavings().toFixed(2)}</p>
        </section>
        <section id="chart">
          <h2>Gráfico de Despesas</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={getExpensesByCategory()}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {getExpensesByCategory().map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </section>
      </main>
      <footer>
        <p>
          &copy; 2024 Organizador de Finanças. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  )
}

export default App
