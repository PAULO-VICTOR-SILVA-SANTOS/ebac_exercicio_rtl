describe('Agenda de Contatos - EBAC', () => {
  const gerarContato = () => {
    const sufixo = Date.now()

    return {
      nome: `Teste Cypress ${sufixo}`,
      email: `teste${sufixo}@mail.com`,
      telefone: `1199${Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0')}`
    }
  }

  const preencherFormulario = ({ nome, email, telefone }) => {
    cy.get('input').eq(0).clear().type(nome)
    cy.get('input').eq(1).clear().type(email)
    cy.get('input').eq(2).clear().type(telefone)
  }

  beforeEach(() => {
    cy.visit('/')
  })

  it('deve incluir um novo contato', () => {
    const contato = gerarContato()

    preencherFormulario(contato)
    cy.contains('button', /adicionar/i).click()

    cy.contains(contato.nome).should('exist')
    cy.contains(contato.email).should('exist')
    cy.contains(contato.telefone).should('exist')
  })

  it('deve alterar um contato existente', () => {
    const contato = gerarContato()
    const nomeAtualizado = `${contato.nome} Atualizado`

    preencherFormulario(contato)
    cy.contains('button', /adicionar/i).click()

    cy.contains('button', /editar/i).last().click()

    preencherFormulario({
      nome: nomeAtualizado,
      email: contato.email,
      telefone: contato.telefone
    })

    cy.contains('button', /salvar/i).click()

    cy.contains(nomeAtualizado).should('exist')
  })

  it('deve remover um contato (circunferência no enunciado)', () => {
    const contato = gerarContato()

    preencherFormulario(contato)
    cy.contains('button', /adicionar/i).click()

    cy.contains('button', /deletar/i).last().click()

    cy.contains(contato.nome).should('not.exist')
  })
})
