export const getImageProxy = async (imageUrl: string) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_PROXY + '/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    })

    if (!response.ok) {
      throw new Error('Erro ao buscar a imagem')
    }

    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    return url
  } catch (error: any) {
    console.error('Erro ao buscar a imagem:', error.message)
  }
}
