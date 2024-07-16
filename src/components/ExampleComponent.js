import React from 'react'
import { motion } from 'framer-motion'

function ExampleComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Exemplo com Animação</h1>
    </motion.div>
  )
}

export default ExampleComponent
