import React from 'react'
import ExpenseForm from './ExpenseForm'
import IncomeForm from './IncomeForm'
import ExpensesList from './ExpensesList'
import IncomeList from './IncomeList'
import ExpensesChart from './ExpensesChart'
import ExportData from './ExportData'
import BudgetAlert from './BudgetAlert' // Adicionar esta linha
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ExampleComponent from './ExampleComponent'
import { useGlobalState } from '../context/GlobalState'

function Dashboard() {
  const { expenses, setExpenses, income, setIncome } = useGlobalState()
  const budget = 500 // Defina o orçamento aqui

  return (
    <Container maxWidth="lg" style={{ marginTop: '80px' }}>
      <BudgetAlert expenses={expenses} budget={budget} />{' '}
      {/* Adicionar esta linha */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: '16px' }}>
            <Typography variant="h4">Dashboard</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '16px' }}>
            <ExpenseForm setExpenses={setExpenses} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '16px' }}>
            <IncomeForm setIncome={setIncome} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '16px' }}>
            <ExpensesList expenses={expenses} setExpenses={setExpenses} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '16px' }}>
            <IncomeList income={income} setIncome={setIncome} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: '16px' }}>
            <ExpensesChart />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ExampleComponent />
        </Grid>
        <Grid item xs={12}>
          <ExportData data={expenses} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
