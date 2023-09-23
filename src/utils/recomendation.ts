export const getRecomendationLabel = (recomendation: string) => {
  switch (true) {
    case recomendation === 'male':
      return 'Produtos masculinos'
    case recomendation === 'female':
      return 'Produtos femininos'
    case recomendation === 'winter':
      return 'Produtos para o inverno'
    case recomendation === 'spring':
      return 'Produtos para a primavera'
    case recomendation === 'fall':
      return 'Produtos para o outono'
    case recomendation === 'summer':
      return 'Produtos para o verão'
    case recomendation === 'day':
      return 'Produtos para o dia'
    case recomendation === 'night':
      return 'Produtos para a noite'
    case /^[0-9]/.test(recomendation):
      return 'Mais vendidos conforme sua faixa etária'
    default:
      return `Mais vendidos do estado ${recomendation}`
  }
}

export const getRecomendationCategory = (recomendation: string) => {
  const seasons = ['winter', 'spring', 'fall', 'summer']
  const timeOfDay = ['day', 'night']
  const gender = ['male', 'female']

  if (seasons.includes(recomendation) || timeOfDay.includes(recomendation)) {
    return 'seasonOrDayTime'
  } else if (gender.includes(recomendation)) {
    return 'gender'
  } else if (/^[0-9]/.test(recomendation)) {
    return 'age'
  } else {
    return 'region'
  }
}
