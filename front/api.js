import { API_URL } from './config.js'

export async function obterProdutos() {
    try {
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error('Erro ao buscar produtos')
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function criarProduto(produto) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        })

        if (!response.ok) {
            throw new Error('Erro ao criar produto')
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function atualizarProduto(produto) {
    try {
        const response = await fetch(`${API_URL}/${produto.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        })

        if (!response.ok) {
            throw new Error('Erro ao atualizar produto')
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function deletarProduto(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error('Erro ao deletar produto')
        }

        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}